import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InitialSlidePage from "@/components/InitialSlidePage.tsx";
import { useContext, useEffect } from "react";
import apiClient from "@/services/api-client.ts";
import { AxiosError } from "axios";
import ErrorContext from "@/context/ErrorContext.tsx";
import OnboardingContext from "@/context/OnboardingContext.tsx";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const userId = search.get("userId");
  const token = search.get("token");
  const from = location.state?.from?.pathname || "/";

  const { setError } = useContext(ErrorContext);
  const { updateFormData } = useContext(OnboardingContext);

  useEffect(() => {
    if (
      (token === null || userId === null) &&
      (token !== "" || userId !== "")
    ) {
      setError("Invalid token");
      navigate(from);
    } else {
      (async () => {
        try {
          const response = await apiClient.post(
            `/pharmacy/verify?userId=${userId}`,
          );
          updateFormData({
            email: response.data.email,
            token: token,
            userId: userId,
          });
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
              setError(error.message);
            } else {
              setError("No server response");
            }
          } else {
            setError("Unexpected error");
          }
        }
      })();
    }
  }, []);

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
        <Button className="w-full" asChild>
          <Link to="account">Lets go</Link>
        </Button>
      </div>
    </InitialSlidePage>
  );
};
export default Welcome;
