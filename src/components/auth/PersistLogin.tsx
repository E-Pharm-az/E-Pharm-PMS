import { useContext, useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken.ts";
import { Outlet } from "react-router-dom";
import AuthContext from "@/context/AuthContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";

const PersistLogin = () => {
  const { auth } = useContext(AuthContext);
  const {setLoading} = useContext(LoaderContext);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log("Error refreshing token", error);
      } finally {
        isMounted && setLoading(false);
      }
    };

    !auth ? verifyRefreshToken() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <Outlet />;
};

export default PersistLogin;