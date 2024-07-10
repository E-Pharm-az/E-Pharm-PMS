import { useContext, useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { AxiosError } from "axios";
import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button.tsx";
import InitialSlidePage from "@/components/InitialSlidePage.tsx";
import ErrorPage from "@/components/onboarding/ErrorPage.tsx";
import OnboardingContext from "@/context/OnboardingContext.tsx";
import apiClient from "@/services/api-client.ts";
import LoaderContext from "@/context/LoaderContext.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

const Welcome = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoaderContext);
  const { updateFormData } = useContext(OnboardingContext);
  const { id } = useParams();

  const [errorState, setErrorState] = useState<{
    title: string;
    subtitle: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await apiClient.post(`/pharmacy/verify?userId=${id}`);
        updateFormData({ email: response.data.email });
        navigate("/confirm-email");
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status !== 409) {
            if (error.response.status === 404) {
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
          }
        } else {
          setErrorState({
            title: "Unexpected Error",
            subtitle:
              "An unexpected error occurred. Please try again or contact support for assistance.",
          });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (errorState) {
    return (
      <ErrorPage title={errorState.title} subtitle={errorState.subtitle} />
    );
  }

  if (loading) {
    return (
      <div className="grid gap-12 text-center w-full">
        <div className="w-full">
          <Skeleton className="h-20 w-20 mx-auto mb-4" />
          <Skeleton className="h-8 w-[400px] mx-auto mb-2" />
          <Skeleton className="h-4 w-[200px] mx-auto mb-1" />
          <Skeleton className="h-4 w-[300px] mx-auto" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
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
