import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import apiClient from "@/services/api-client.ts";
import { AxiosError } from "axios";
import SlidePage from "@/components/SlidePage.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";
import OnboardingContext from "@/context/OnboardingContext.tsx";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input.tsx";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

const TIMEOUT_SECONDS = 15;
export const CODE_LENGTH = 6;

interface FormData {
  code: string;
}

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { loading, setLoading } = useContext(LoaderContext);
  const { formData, updateFormData } = useContext(OnboardingContext);
  const [timeoutSeconds, setTimeoutSeconds] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const disabledButton = () => {
    setTimeoutSeconds(TIMEOUT_SECONDS);
  };

  useEffect(() => {
    if (timeoutSeconds <= 0) return;

    const secondsInterval = setInterval(() => {
      setTimeoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(secondsInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(secondsInterval); // Cleanup on component unmount
  }, [timeoutSeconds]);

  useEffect(() => {
    // require email to be on this page
    if (!formData.email) {
      navigate("/email-lookup");
    } else {
      (async () => {
        try {
          await apiClient.post("/auth/resend-confirmation-email", {
            Email: formData.email,
          });
        } catch (error) {
          if (error instanceof AxiosError) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred.");
          }
        }
      })();
    }
  }, []);

  const resendOTP = useCallback(async () => {
    setLoading(true);
    try {
      await apiClient.post("/auth/resend-confirmation-email", {
        email: formData.email,
      });
      disabledButton();
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [formData.email, setError]);

  const onSubmit = async (data: FormData) => {
    try {
      await apiClient.post("/auth/confirm-email", {
        email: formData.email,
        code: data.code,
      });
      updateFormData({ code: parseInt(data.code), isAccountConfirmed: true });
      navigate("account");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SlidePage>
      <div className="grid gap-4 w-full">
        <div>
          <h1 className="text-3xl font-medium text-center">
            Lets verify your email
          </h1>
          <p>
            We've sent you a code to your email address. Please enter it below
            to continue.
          </p>
        </div>
        <div className="w-full px-3 py-2.5 text-sm text-muted-foreground bg-muted rounded-lg border border-neutral-300 cursor-not-allowed mb-3">
          <p>muhammed@gmail.com{formData.email}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="relative">
            <Input
              type="text"
              label="Code"
              autoCorrect="off"
              autoComplete="off"
              disabled={loading}
              {...register("code", {
                required: "Required",
                validate: {
                  minLength: (value: string) => value.length === CODE_LENGTH,
                },
              })}
              className={`${errors.code && "border-red-500"}`}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 felx flex gap-2 focus:outline-none text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={timeoutSeconds > 0}
              onClick={resendOTP}
            >
              {timeoutSeconds > 0 && <label>{timeoutSeconds}</label>}
              <RotateCcw />
            </button>
          </div>
          <Button type="submit">Continue</Button>
        </form>
      </div>
    </SlidePage>
  );
};

export default VerifyEmail;
