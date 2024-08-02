const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 max-h-screen">
      <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>

      <div className="h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">No data to show</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
