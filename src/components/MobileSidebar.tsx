import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Home, Menu } from "lucide-react";
import Logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" side="left">
        <nav className="grid gap-2 text-lg font-medium">
          <img src={Logo} alt="Logo" />
          <Link
            to={"/dashboard"}
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
              location.pathname === "/dashboard"
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
