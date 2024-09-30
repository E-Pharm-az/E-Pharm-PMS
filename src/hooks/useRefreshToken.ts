import { useContext } from "react";
import { axiosPrivate } from "../services/api-client.ts";
import AuthContext, { User } from "@/context/AuthContext.tsx";

const useRefreshToken = () => {
  const { setUser } = useContext(AuthContext);

  return async () => {
    const response = await axiosPrivate.get<User>(
      "/auth/pharmacy/refresh-token"
    );

    setUser(response.data);
  };
};

export default useRefreshToken;
