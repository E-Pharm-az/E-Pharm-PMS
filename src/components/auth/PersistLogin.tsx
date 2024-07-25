import { useContext, useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken.ts";
import { Outlet } from "react-router-dom";
import AuthContext from "@/context/AuthContext.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";

const PersistLogin = () => {
  const { auth, setIsRefreshing } = useContext(AuthContext);
  const { setLoading } = useContext(LoaderContext);
  const {setError} = useContext(ErrorContext);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      setLoading(true);
      try {
        await refreshToken();
      } catch (error) {
        setError("Error authenticating. Please try again.");
      } finally {
        isMounted && setIsRefreshing(false);
        setLoading(false);
      }
    };

    !auth ? verifyRefreshToken() : setIsRefreshing(false);

    return () => {
      isMounted = false;
    };
  }, [auth, refreshToken, setError, setIsRefreshing]);

  return <Outlet />;
};

export default PersistLogin;