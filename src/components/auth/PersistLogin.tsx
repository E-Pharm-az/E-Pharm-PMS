import { useContext, useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken.ts";
import { Outlet } from "react-router-dom";
import AuthContext from "@/context/AuthContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";

const PersistLogin = () => {
  const { isAuthenticated, setIsRefreshing } = useContext(AuthContext);
  const { setLoading } = useContext(LoaderContext);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      setLoading(true);
      try {
        await refreshToken();
      } catch (error) {
        /* empty */
      } finally {
        isMounted && setIsRefreshing(false);
        setLoading(false);
      }
    };

    !isAuthenticated() ? verifyRefreshToken() : setIsRefreshing(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <Outlet />;
};

export default PersistLogin;