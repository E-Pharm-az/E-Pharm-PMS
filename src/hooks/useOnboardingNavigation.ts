import { useNavigate, useParams } from "react-router-dom";

export default function useOnboardingNavigation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const goToStep = (step: string) => {
    navigate(`/onboarding/${id}/${step}`);
  };

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(`/onboarding/${id}`);
    }
  };
  return { goToStep, goBack };
}
