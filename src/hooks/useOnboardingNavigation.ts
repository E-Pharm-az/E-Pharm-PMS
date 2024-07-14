import { useNavigate, useParams } from "react-router-dom";

export default function useOnboardingNavigation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const goToStep = (step: string) => {
    navigate(`/onboarding/${id}/${step}`);
  };

  const goBack = () => {
      navigate(-1);
  };

  return { goToStep, goBack };
}
