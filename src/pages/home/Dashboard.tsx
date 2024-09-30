import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import SalesChart from "@/pages/home/SalesChart.tsx";
import {Order} from "@/types/order.ts";
import {useContext, useEffect, useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import ErrorContext from "@/context/ErrorContext.tsx";
import {AxiosError} from "axios";


const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setError } = useContext(ErrorContext);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get<Order[]>("/orders/pharmacy");
        setOrders(response.data);
        console.log(response.data);
      }
      catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            if (error.response.status !== 404) {
              setError(error.response?.data)
            }
          }
        } else {
          setError("Unexpected error");
        }
      }
    })();
  }, []);

  return (
    <div className="p-6 space-y-6 h-full w-full max-w-[976px] mx-auto">
      <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      <SalesChart />
      <div className="grid gap-4 w-full bg-white rounded-md p-2 md:p-4">
        <p className="text-md font-semibold md:text-xl">Recent orders</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order #</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 2 ? (
              <TableRow>
                <TableCell colSpan={4}>No orders found</TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell className="text-right">
                    {order.orderProducts.reduce(
                      (acc, curr) => acc + curr.product.price * curr.quantity,
                      0,
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
