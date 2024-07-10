import { createContext, useState, ReactNode, FC } from "react";
import { produce } from "immer";

interface FormData {
  email: string;
  code: number;
  isAccountConfirmed: boolean
  firstName: string;
  lastName: string;
  password: string;
  accountCreated: boolean;
  pharmacyCreated: boolean;
}

const defaultFormData: FormData = {
  email: "",
  code: 0,
  isAccountConfirmed: false,
  firstName: "",
  lastName: "",
  password: "",
  accountCreated: false,
  pharmacyCreated: false,
};

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const OnboardingContext = createContext<FormContextType>({
  formData: defaultFormData,
  updateFormData: () => {},
});

export const OnboardingProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prevData) =>
      produce(prevData, (draft) => {
        Object.assign(draft, data);
      }),
    );
  };

  return (
    <OnboardingContext.Provider value={{ formData, updateFormData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContext;
