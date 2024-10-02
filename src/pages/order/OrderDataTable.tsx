import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import { AxiosError } from "axios";
import { Order } from "@/types/order.ts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const columns: ColumnDef<Order>[] = [
  {
    id: "id",
    header: "Order ID",
    cell: ({ row }) => row.original.id,
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "total",
    header: "Total",
    cell: ({ row }) =>
      `$${row.original.orderProducts.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0).toFixed(2)}`,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => row.original.orderStatus,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button asChild size="sm" variant="link" className="p-0">
        <Link to={`/orders/${row.original.id}`}>View Details</Link>
      </Button>
    ),
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
