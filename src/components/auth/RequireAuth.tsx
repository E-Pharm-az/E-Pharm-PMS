import {Outlet, useNavigate} from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext.tsx";

const RequireAuth = () => {
  const { isAuthenticated, isRefreshing } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRefreshing && !isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [isRefreshing, isAuthenticated, navigate]);

  if (isRefreshing) {
    return <></>;
  }

  return isAuthenticated() ? <Outlet /> : null;
};

export default RequireAuth;