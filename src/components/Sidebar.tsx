import { Separator } from "@/components/ui/separator.tsx";
import { Link, useLocation } from "react-router-dom";
import { Home, LogOut, LucideIcon, Package, Truck } from "lucide-react";
import Logo from "@/assets/logo.png";
import AuthContext from "@/context/AuthContext.tsx";
import { useContext } from "react";

interface SidebarLinkProps {
  pathname: string;
  icon: LucideIcon;
}

const SidebarLink = ({ pathname, icon: Icon }: SidebarLinkProps) => {
  const location = useLocation();

  return (
    <Link
      to={pathname}
      className={`flex justify-center items-center p-3 rounded-lg transition-colors hover:text-primary ${
        location.pathname === pathname
          ? "bg-brand-secondary text-white text-primary hover:text-white"
          : "text-muted-foreground"
      }`}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-white text-sm font-medium m-4 flex flex-col h-[calc(100vh-2rem)] justify-between">
      <div className="grid gap-5">
        <img src={Logo} alt="logo" className="mx-auto h-10 w-10 pointer-events-none" />
        <Separator />
        <SidebarLink pathname="/dashboard" icon={Home} />
        <SidebarLink pathname="/dashboard/products" icon={Package} />
        <SidebarLink pathname="/dashboard/orders" icon={Truck} />
      </div>
      <div className="mt-auto">
        <button
          onClick={logout}
          className="p-3 rounded-lg transition-colors hover:text-primary hover:bg-destructive text-muted-foreground hover:text-white"
        >
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
