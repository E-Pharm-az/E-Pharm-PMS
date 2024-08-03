import { Separator } from "@/components/ui/separator.tsx";
import { Link, useLocation } from "react-router-dom";
import { Home, LogOut, Package } from "lucide-react";
import Logo from "@/assets/logo.png";
import AuthContext from "@/context/AuthContext.tsx";
import { useContext } from "react";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-white text-sm font-medium m-4 flex flex-col h-[calc(100vh-2rem)] justify-between">
      <div className="grid gap-5">
        <div className="items-center flex justify-center">
          <img
            src={Logo}
            alt="logo"
            className="h-10 w-10 pointer-events-none"
          />
        </div>
        <Separator />
        <Link
          to="/dashboard"
          className={`flex justify-center items-center p-3 rounded-lg transition-colors hover:text-primary ${
            location.pathname === "/dashboard"
              ? "bg-brand-secondary text-white text-primary hover:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Home className="h-7 w-6" />
        </Link>
        <Link
          to="products"
          className={`flex justify-center items-center p-3 rounded-lg transition-colors hover:text-primary ${
            location.pathname === "/dashboard/products"
              ? "bg-brand-secondary text-white text-primary hover:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Package className="h-6 w-6" />
        </Link>
      </div>
      <div className="mt-auto">
        <button
          onClick={logout}
          className="p-3 rounded-lg transition-colors hover:text-primary hover:bg-brand-secondary text-muted-foreground hover:text-white"
        >
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
