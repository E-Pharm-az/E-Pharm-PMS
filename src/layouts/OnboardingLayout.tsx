import { Outlet, useLocation } from "react-router-dom";
import Logo from "@/assets/logo.png";

const steps = ["confirm-email", "account", "pharmacy", "invite-staff"];

const OnboardingLayout = () => {
  const location = useLocation();

  const getStepStatus = (stepIndex: number) => {
    const currentStep = location.pathname.split("/").pop();
    const currentStepIndex = steps.indexOf(currentStep || "");
    return stepIndex <= currentStepIndex ? "bg-brand" : "bg-accent";
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-shrink-0 items-center gap-1 fixed top-4 left-4">
        <img src={Logo} alt="logo" className="h-10 pointer-events-none" />
        <h1 className="text-2xl font-medium mb-1">PMS</h1>
      </div>
      <div className="h-full w-full flex justify-center">
        <div className="max-w-md w-full flex flex-col justify-between my-20">
          <Outlet />
          <div className="flex gap-4 w-full">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`${getStepStatus(index)} w-full h-2 rounded-md`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
