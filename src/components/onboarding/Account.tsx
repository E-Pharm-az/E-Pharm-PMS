import SlidePage from "@/components/SlidePage.tsx";
import Logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import apiClient from "@/services/api-client.ts";
import AuthContext, { TokenPayload } from "@/context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import {useContext, useEffect, useState} from "react";
import ErrorContext from "@/context/ErrorContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";
import axios from "axios";
import { Eye, EyeOff, X } from "lucide-react";
import OnboardingContext from "@/context/OnboardingContext.tsx";
import { useLocation, useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
}

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const { setAuth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { formData, updateFormData } = useContext(OnboardingContext);
  const from = location.state?.from?.pathname || "/onboarding";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (formData.email === "") {
      navigate(from);
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await apiClient.post("/user/initialize-user", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: formData.email,
        password: data.password,
      });

      if (response.status === 200) {
        const loginResponse = await apiClient.post(
          "auth/login/store",
          {
            email: formData.email,
            password: data.password,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        );

        const decodedToken = jwtDecode<TokenPayload>(loginResponse.data.token);

        setAuth({
          tokenResponse: loginResponse.data,
          id: decodedToken.jti,
          companyId: decodedToken.companyId,
          email: decodedToken.email,
          firstname: decodedToken.sub,
        });

        updateFormData({ accountConfirmed: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setError("Invalid email or password");
          } else {
            setError("No server response");
          }
        } else {
          setError("Login failed");
        }
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SlidePage>
      <div className="grid gap-4">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="mx-auto" />
          <h1 className="text-3xl font-medium">Create your account</h1>
          <p>
            Let's start by setting up your personal account. This will be used
            to manage your pharmacy on E-Pharm.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="w-full px-3 py-2.5 text-sm text-muted-foreground bg-muted  rounded-lg border border-neutral-300 cursor-not-allowed mb-3">
            <p>{formData.email}</p>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Input
                type="text"
                label="First name"
                autoComplete="given-name"
                autoCorrect="off"
                autoCapitalize="on"
                disabled={loading}
                {...register("firstName", { required: "Required" })}
                className={`${errors.firstName && "border-red-500 "}`}
              />
              <p className="w-full h-3 text-xs text-red-500">
                {errors.firstName?.message}
              </p>
            </div>
            <div className="w-full">
              <Input
                type="text"
                label="Last name"
                autoComplete="family-name"
                autoCorrect="off"
                autoCapitalize="on"
                disabled={loading}
                {...register("lastName", { required: "Required" })}
                className={`${errors.lastName && "border-red-500 "}`}
              />
              <p className="w-full h-3 text-xs text-red-500">
                {errors.lastName?.message}
              </p>
            </div>
          </div>
          <div className="grid gap-1">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                autoCorrect="off"
                autoComplete="new-password"
                disabled={loading}
                {...register("password", {
                  required: true,
                  validate: {
                    minLength: (value: string) => value.length >= 8,
                    complex: (value: string) =>
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(value),
                  },
                })}
                className={`${errors.password && "border-red-500"}`}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <div
              className={`ml-2 flex gap-1 ${errors.password?.type === "required" || errors.password?.type === "minLength" ? "text-red-500" : "text-muted-foreground"}`}
            >
              <X className="h-4 w-4" />
              <label className="text-xs">Minimum 8 characters</label>
            </div>
            <div
              className={`ml-2 flex gap-1 ${errors.password?.type === "required" || errors.password?.type === "complex" ? "text-red-500" : "text-muted-foreground"}`}
            >
              <X className="h-4 w-4" />
              <label className="text-xs">
                Uppercase, lowercase letters, and one number
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </SlidePage>
  );
};
export default Account;
