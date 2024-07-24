import SlidePage from "@/components/SlidePage.tsx";
import Logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import ErrorContext from "@/context/ErrorContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";
import { AxiosError } from "axios";
import OnboardingContext from "@/context/OnboardingContext.tsx";
import useOnboardingNavigation from "@/hooks/useOnboardingNavigation.ts";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";

interface FormData {
  name: string;
  tin: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

const Pharmacy = () => {
  const { goToStep, goBack } = useOnboardingNavigation();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const { formData, updateFormData } = useContext(OnboardingContext);
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (!formData.accountCreated) {
      goBack();
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    updateFormData({
      pharmacyCreated: true,
    });
    try {
      await axiosPrivate.post("/pharmacy", {
        Name: data.name,
        Tin: data.tin,
        Email: data.email,
        Phone: data.phone,
        Website: data.website,
        Address: data.address,
      });

      goToStep("invite-staff");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response?.data);
        }
        else {
          setError(error.message);
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
          <h1 className="text-3xl font-medium">Setup your pharmacy</h1>
          <p>
            Now, let's create your pharmacy's profile. This information will be
            visible to customers on the E-Pharm platform.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <div className="w-full">
            <Input
              type="text"
              label="Pharmacy name"
              autoCorrect="off"
              autoCapitalize="on"
              disabled={loading}
              {...register("name", { required: "Required" })}
              className={`${errors.name && "border-red-500 "}`}
            />
            <p className="w-full h-3 text-xs text-red-500">
              {errors.name?.message}
            </p>
          </div>
          <div className="w-full">
            <Input
              type="text"
              label="Tin"
              autoCorrect="off"
              autoCapitalize="on"
              disabled={loading}
              {...register("tin", { required: "Required" })}
              className={`${errors.tin && "border-red-500 "}`}
            />
            <p className="w-full h-3 text-xs text-red-500">
              {errors.tin?.message}
            </p>
          </div>
          <div className="w-full">
            <Input
              type="email"
              label="Email"
              autoCorrect="off"
              autoCapitalize="on"
              disabled={loading}
              {...register("email", { required: "Required" })}
              className={`${errors.email && "border-red-500 "}`}
            />
            <p className="w-full h-3 text-xs text-red-500">
              {errors.email?.message}
            </p>
          </div>
          <div className="w-full">
            <Input
              type="text"
              label="Phone"
              autoCorrect="off"
              autoCapitalize="on"
              disabled={loading}
              {...register("phone", { required: "Required" })}
              className={`${errors.phone && "border-red-500 "}`}
            />
            <p className="w-full h-3 text-xs text-red-500">
              {errors.phone?.message}
            </p>
          </div>
          <div className="w-full">
            <Input
              type="text"
              label="Website"
              autoCorrect="off"
              autoCapitalize="on"
              disabled={loading}
              {...register("website", { required: "Required" })}
              className={`${errors.name && "border-red-500 "}`}
            />
            <p className="w-full h-3 text-xs text-red-500">
              {errors.website?.message}
            </p>
          </div>
          <div className="w-full">
            <Input
              type="text"
              label="Address"
              autoCorrect="off"
              autoCapitalize="on"
              disabled={loading}
              {...register("address", { required: "Required" })}
              className={`${errors.address && "border-red-500 "}`}
            />
            <p className="w-full h-3 text-xs text-red-500">
              {errors.address?.message}
            </p>
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </SlidePage>
  );
};
export default Pharmacy;
