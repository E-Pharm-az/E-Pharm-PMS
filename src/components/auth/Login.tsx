import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import AuthContext from "@/context/AuthContext.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";

interface PasswordFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { login, isAuthenticated, isRefreshing } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const { setError } = useContext(ErrorContext);
  const { loading, setLoading } = useContext(LoaderContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<PasswordFormData>();

  useEffect(() => {
    if (!isRefreshing && isAuthenticated()) {
      navigate(from, { replace: true });
    }
  }, [isRefreshing, isAuthenticated, navigate, from]);

  useEffect(() => {
    setFocus("email");
  }, []);

  const onSubmit = async (data: PasswordFormData) => {
    setLoading(true);

    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status >= 400) {
            setError(error.response.data);
          } else {
            setError("We're having some technical difficulties. Please try again later or contact support if the problem persists.");
          }
        } else if (error.request) {
          setError("We couldn't reach our servers. Please check your internet connection and try again.");
        } else {
          setError("An error occurred while setting up the request");
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto py-8 sm:py-0 w-full grid gap-6 p-6 sm:p-0 sm:w-[400px]">
      <div className="grid gap-2">
        <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
          Login to PMS
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <div className="grid gap-1">
          <Input
            type="email"
            label="Email"
            autoCorrect="off"
            autoComplete="email"
            disabled={loading}
            className={errors.email && "border-red-500 focus:border-red-500"}
            {...register("email", { required: true })}
          />
          <label className="w-full h-3 text-xs text-red-500">
            {errors.email?.type === "required" && "Required"}
          </label>
        </div>
        <div className="grid gap-1">
          <Input
            label="Password"
            type="password"
            autoCorrect="off"
            autoComplete="new-password"
            disabled={loading}
            className={errors.password && "border-red-500 focus:border-red-500"}
            {...register("password", { required: true })}
          />
          <label className="w-full h-3 text-xs text-red-500">
            {errors.password?.type === "required" && "Required"}
          </label>
        </div>
        <Button type="submit" disabled={loading}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default Login;
