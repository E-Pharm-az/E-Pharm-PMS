import { useContext, useEffect, useState } from "react";
import useRefreshToken from "@/hooks/useRefreshToken.ts";
import AuthContext from "@/context/AuthContext.tsx";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log("Error refreshing token", error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.tokenResponse.token && isMounted
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
          <></>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
