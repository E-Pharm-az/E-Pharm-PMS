import { useContext, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import SlidePage from "@/components/SlidePage.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";
import { AxiosError } from "axios";
import OnboardingContext from "@/context/OnboardingContext.tsx";
import useOnboardingNavigation from "@/hooks/useOnboardingNavigation.ts";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  emails: { email: string }[];
}

const InviteStaff = () => {
  const navigate = useNavigate();
  const { goBack } = useOnboardingNavigation();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const { formData } = useContext(OnboardingContext);
  const axiosPrivate = useAxiosPrivate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      emails: [{ email: "" }, { email: "" }, { email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });

  // useEffect(() => {
  //   if (!formData.pharmacyCreated) {
  //     goBack();
  //   }
  // }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const validEmails = data.emails.filter(
        (item) => item.email.trim() !== "",
      );
      if (validEmails.length > 0) {
        await axiosPrivate.post("/pharmacy-staff/invite", {
          emails: validEmails,
        });
      }
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setError(error.response?.data);
        } else {
          setError("No server response");
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
      <div className="grid gap-4 max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-medium mt-4">Invite Your Staff</h1>
          <p className="mt-2">
            Add your staff members to help manage your E-Pharm account. You can
            always invite more team members later.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3"
          autoComplete="off"
        >
          <motion.div className="space-y-3 max-h-[260px] overflow-y-auto px-1 py-2">
            <input className="hidden" autoComplete="email" name="email" />
            <AnimatePresence initial={false}>
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-full">
                    <Input
                      type="email"
                      label="Email"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      disabled={loading}
                      {...register(`emails.${index}.email` as const, {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full ${
                        errors.emails?.[index]?.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.emails?.[index]?.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.emails[index]?.email?.message}
                      </p>
                    )}
                  </div>
                  <AnimatePresence>
                    {fields.length > 3 && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <button
            type="button"
            onClick={() => append({ email: "" })}
            className="flex items-center gap-1 p-2 text-black hover:text-muted-foreground transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add more
          </button>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending Invites..." : "Send Invites"}
          </Button>
        </form>
      </div>
    </SlidePage>
  );
};

export default InviteStaff;
