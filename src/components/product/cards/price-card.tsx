import { Card, CardContent } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Asterisk, CircleHelp } from "lucide-react";
import {Control, FieldErrors, UseFormRegister, UseFormWatch} from "react-hook-form";
import {FormData} from "@/components/product/AddProduct"
import { useEffect, useState } from "react";

interface Props {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  watch: UseFormWatch<FormData>;
  errors: FieldErrors<FormData>;
}

export const PriceCard = ({ register, watch, errors }: Props) => {
  const [profit, setProfit] = useState<number | null>(null);
  const [margin, setMargin] = useState<number | null>(null);

  const watchAllFields = watch();

  const calculateProfitAndMargin = (data: FormData) => {
    const calculatedProfit = data.price - data.costPerItem;
    const calculatedMargin = (calculatedProfit / data.price) * 100;

    setProfit(calculatedProfit);
    setMargin(calculatedMargin);
  };

  useEffect(() => {
    if (!isNaN(watchAllFields.price) && !isNaN(watchAllFields.costPerItem)) {
      calculateProfitAndMargin(watchAllFields);
    } else {
      setProfit(null);
      setMargin(null);
    }
  }, [watchAllFields.price, watchAllFields.costPerItem]);

  return (
    <Card className="h-min">
      <CardContent className="mt-4">
        <div className="grid w-full items-center gap-6">
          <div className="flex w-full items-center gap-2">
            <div className="w-1/2 grid gap-2">
              <div className="flex items-center space-x-0.5">
                <Asterisk className="h-4 w-4 text-red-500" />
                <Label>Price</Label>
              </div>
              <Input
                {...register("price", { valueAsNumber: true })}
                type="number"
                inputMode="decimal"
                placeholder="₼ 0.00"
              />
              {errors.price && (
                <Label className="text-red-400">{errors.price.message}</Label>
              )}
            </div>
            <div className="w-1/2 grid gap-2">
              <div className="flex items-center space-x-0.5">
                <Asterisk className="h-4 w-4 text-red-500" />
                <Label>Cost Per Item</Label>
              </div>
              <div className="relative">
                <Input
                  {...register("costPerItem", { valueAsNumber: true })}
                  type="number"
                  inputMode="numeric"
                  placeholder="₼ 0.00"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <CircleHelp className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Enter the cost of this item for profit and margin
                          calculations.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              {errors.costPerItem && (
                <Label className="text-red-400">
                  {errors.costPerItem.message}
                </Label>
              )}
            </div>
          </div>
          <div className="flex w-full items-center gap-2">
            <div className="w-1/2 grid gap-2">
              <Label>Profit</Label>
              <div className="flex h-10 w-full rounded-md file:border-0 border file:bg-transparent px-3 py-2 text-sm file:text-sm file:font-medium border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {profit !== null ? profit : "--"}
              </div>
            </div>
            <div className="w-1/2 grid gap-2">
              <Label>Margin</Label>
              <div className="flex h-10 w-full rounded-md file:border-0 border file:bg-transparent px-3 py-2 text-sm file:text-sm file:font-medium border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {margin !== null ? `${margin.toFixed(2)}%` : "--"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};