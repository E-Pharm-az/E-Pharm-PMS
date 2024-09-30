import OrderDataTable from "@/pages/order/OrderDataTable.tsx";

const Order = () => {
  return (
    <div className="p-6 space-y-6 h-full">
      <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      <OrderDataTable />
    </div>
  );
};

export default Order;
