import { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import SlidePage from "@/components/SlidePage.tsx";
import Logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import apiClient from "@/services/api-client.ts";
import ErrorContext from "@/context/ErrorContext.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";
import { AxiosError } from "axios";

interface FormData {
  emails: { email: string }[];
}

const InviteStaff = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);

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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const validEmails = data.emails.filter(
        (item) => item.email.trim() !== "",
      );
      await apiClient.post("/pharmacy/bulk-invite", { emails: validEmails });
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setError(error.message);
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
          <img src={Logo} alt="Logo" className="mx-auto" />
          <h1 className="text-3xl font-medium mt-4">Invite Your Staff</h1>
          <p className="mt-2">
            Add your staff members to help manage your E-Pharm account. You can
            always invite more team members later.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <div className="space-y-3 max-h-[260px] overflow-y-auto px-1 py-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <div className="w-full">
                  <Input
                    type="email"
                    label="Email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    disabled={loading}
                    {...register(`emails.${index}.email` as const, {
                      required: "Email is required",
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
                {fields.length > 3 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm font-medium">
            <button
              type="button"
              onClick={() => append({ email: "" })}
              className="flex items-center gap-1 p-2 text-black hover:text-muted-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add more
            </button>
            <button
              type="button"
              className="p-2 text-black hover:text-muted-foreground transition-colors cursor-not-allowed"
            >
              Bulk invite
            </button>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending Invites..." : "Send Invites"}
          </Button>
        </form>
      </div>
    </SlidePage>
  );
};

export default InviteStaff;
