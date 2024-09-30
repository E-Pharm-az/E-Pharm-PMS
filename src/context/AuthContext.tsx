import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import apiClient, { axiosPrivate } from "@/services/api-client.ts";

export interface User {
  id: string;
  email: string;
  firstname: string;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isRefreshing: boolean;
  setIsRefreshing: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: () => false,
  login: () => Promise.resolve(),
  logout: () => {},
  isRefreshing: true,
  setIsRefreshing: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const isAuthenticated = (): boolean => {
    return !!user;
  };

  const login = async (email: string, password: string) => {
    const response = await axiosPrivate.post("/auth/pharmacy/login", {
      email,
      password,
    });

    setUser(response.data);
  };

  const logout = async () => {
    setUser(null);
    await apiClient.get("/auth/logout", { withCredentials: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
        isRefreshing,
        setIsRefreshing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
