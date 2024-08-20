import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import { AxiosError } from "axios";
import {Order} from "@/types/order.ts";

const columns: ColumnDef<Order>[] = [
  {
    id: "id",
    header: "Id",
    cell: ({ row }) => (row.original.id ),
  },
];

const OrderDataTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState<Order[]>([]);
  const { setLoading, loading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get<Order[]>("/orders/pharmacy");
        setOrders(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            if (error.response.status !== 404) {
              setError(error.response?.data);
            }
          }
        } else {
          setError("Unexpected error");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <DataTable
      name="orders"
      columns={columns}
      data={orders}
      isLoading={loading}
    />
  );
};
export default OrderDataTable;
