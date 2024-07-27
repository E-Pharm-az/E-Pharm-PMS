import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar.tsx";
import MobileSidebar from "@/components/MobileSidebar.tsx";

const DashboardLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="hidden bg-white md:block min-w-[80px] h-full">
        <div className="flex-1">
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-neutral-100 rounded-md">
        <header className="md:hidden">
          <MobileSidebar />`
        </header>
        <main className="flex-1 flex flex-col overflow-y-scroll p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
