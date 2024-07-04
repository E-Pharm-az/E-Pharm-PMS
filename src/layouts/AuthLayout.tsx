import { Link, Outlet } from "react-router-dom";
import Logo from "@/assets/logo.png";

const AuthLayout = () => {
  return (
    <main>
      <nav className="fixed z-10 left-0 top-0 right-0 bg-white border p-2 flex px-2 sm:px-10 items-center">
        <Link to="/">
          <div className="flex flex-shrink-0 items-center gap-1">
            <img src={Logo} alt="logo" className="h-10 pointer-events-none" />
            <h1 className="text-2xl font-normal mb-1">PMS</h1>
          </div>
        </Link>
      </nav>
      <div className="sm:flex sm:h-screen sm:items-center mt-12 sm:mt-0 sm:justify-center">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
