import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button.tsx";
import InitialSlidePage from "@/components/InitialSlidePage.tsx";
import ErrorPage from "@/components/onboarding/ErrorPage.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import OnboardingContext from "@/context/OnboardingContext.tsx";
import apiClient from "@/services/api-client.ts";
import LoaderContext from "@/context/LoaderContext.tsx";

const Welcome: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const userId = search.get("userId");
  const token = search.get("token");
  const from = location.state?.from?.pathname || "/";

  const { setError } = useContext(ErrorContext);
  const { loading, setLoading } = useContext(LoaderContext);
  const { updateFormData } = useContext(OnboardingContext);

  const [errorState, setErrorState] = useState<{
    title: string;
    subtitle: string;
  } | null>(null);

  useEffect(() => {
    if (
      (token === null || userId === null) &&
      (token !== "" || userId !== "")
    ) {
      setError("Invalid token");
      navigate(from);
    } else {
      (async () => {
        setLoading(true);
        try {
          const response = await apiClient.post(
            `/pharmacy/verify?userId=${userId}&token=${token}`,
          );
          updateFormData({
            email: response.data.email,
            token: token,
            userId: userId,
          });
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
              setErrorState({
                title: "Invalid Invitation",
                subtitle:
                  "The invitation link you've used is either invalid or has expired. Please contact your pharmacy administrator for a new invitation.",
              });
            } else {
              setErrorState({
                title: "Server Unavailable",
                subtitle:
                  "We're unable to reach our servers at the moment. Please try again later or contact support if the problem persists.",
              });
            }
          } else {
            setErrorState({
              title: "Unexpected Error",
              subtitle:
                "An unexpected error occurred. Please try again or contact support for assistance.",
            });
          }
        }
        finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  if (errorState) {
    return (
      <ErrorPage title={errorState.title} subtitle={errorState.subtitle} />
    );
  }

  return (
    <InitialSlidePage>
      <div className="grid gap-12 text-center">
        <div>
          <img src={Logo} alt="Logo" className="mx-auto" />
          <h1 className="text-3xl font-medium">Welcome to E-Pharm PMS</h1>
          <p>
            Join the future of pharmacy management and online sales. We help you
            expand your reach, streamline operations, and boost your revenue.
          </p>
        </div>
        <Button disabled={loading} className="w-full" asChild>
          <Link to="account">Let's go</Link>
        </Button>
      </div>
    </InitialSlidePage>
  );
};

export default Welcome;
