import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { useContext, useEffect, useMemo, useState } from "react";
import LoaderContext from "@/context/LoaderContext.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import { AxiosError } from "axios";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface Sales {
  date: string;
  sales: number;
  orders: number;
}

interface SalesSummary {
  totalSales: number;
  totalOrders: number;
  sales: Sales[];
}

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const SalesChart = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const [timeRange, setTimeRange] = useState("30d");

  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("sales");

  const [salesSummary, setSalesSummary] = useState<SalesSummary>({
    totalSales: 0,
    totalOrders: 0,
    sales: [],
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { start, end } = getDateRange(timeRange);
      const frequency = getFrequency(timeRange);

      try {
        const response = await axiosPrivate.get<SalesSummary>("sales", {
          params: {
            startDate: start.toISOString(),
            endDate: end.toISOString(),
            frequency: frequency,
          },
        });

        const filledData = fillMissingDates(response.data.sales, start, end);
        setSalesSummary({
          ...response.data,
          sales: filledData,
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status !== 404) {
            setError(error.response?.data);
          }
        } else {
          setError("Unexpected error");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [timeRange, axiosPrivate, setError, setLoading]);

  const fillMissingDates = (data: Sales[], start: Date, end: Date): Sales[] => {
    const filledData: Sales[] = [];
    const currentDate = new Date(start);
    const dataMap = new Map(data.map((item) => [item.date, item]));

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (dataMap.has(dateString)) {
        filledData.push(dataMap.get(dateString)!);
      } else {
        filledData.push({
          date: dateString,
          sales: 0,
          orders: 0,
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDateRange = (range: string) => {
    const end = new Date();
    const start = new Date();
    switch (range) {
      case "7d":
        start.setDate(end.getDate() - 7);
        break;
      case "30d":
        start.setDate(end.getDate() - 30);
        break;
      case "90d":
      default:
        start.setDate(end.getDate() - 90);
    }
    return { start, end };
  };

  const getFrequency = (range: string): number => {
    switch (range) {
      case "7d":
        return 1;
      case "30d":
        return 1;
      case "90d":
        return 3;
      default:
        return 1;
    }
  };

  const total = useMemo(
    () => ({
      sales: salesSummary.totalSales,
      orders: salesSummary.totalOrders,
    }),
    [salesSummary]
  );

  return (
    <>
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger
          className="w-[160px] rounded-lg"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="90d" className="rounded-lg">
            Last 3 months
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            Last 30 days
          </SelectItem>
          <SelectItem value="7d" className="rounded-lg">
            Last 7 days
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="grid gap-8 w-full bg-white rounded-md p-2 md:p-4">
        <div className="flex">
          {["sales", "orders"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  Total {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {chartConfig[chart].label === "Sales"
                    ? `${total[key as keyof typeof total].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₼`
                    : total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
        <ChartContainer
          config={chartConfig}
          className="h-[180px] w-full aspect-auto"
        >
          <LineChart data={salesSummary.sales}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDate}
              interval={"preserveStartEnd"}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={28} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey={activeChart}
              stroke={chartConfig[activeChart].color}
              strokeWidth={2}
              dot={false}
              connectNulls={true}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </>
  );
};
export default SalesChart;
