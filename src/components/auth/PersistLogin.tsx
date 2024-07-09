import { useContext, useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken.ts";
import AuthContext from "@/context/AuthContext.tsx";
import { Outlet } from "react-router-dom";
import LoaderContext from "@/context/LoaderContext.tsx";

const PersistLogin = () => {
  const { setLoading } = useContext(LoaderContext);
  const refreshToken = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log("Error refreshing token", error);
      } finally {
        setLoading(false);
      }
    };

    !auth?.tokenResponse.token && isMounted
      ? verifyRefreshToken()
      : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <Outlet />;
};

export default PersistLogin;
