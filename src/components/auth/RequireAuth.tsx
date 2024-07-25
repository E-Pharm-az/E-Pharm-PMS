import {Outlet, useNavigate} from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";

const RequireAuth = () => {
  const { isAuthenticated, auth } = useContext(AuthContext);
  const {loading} = useContext(LoaderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [auth]);

  return <Outlet />;
};

export default RequireAuth;