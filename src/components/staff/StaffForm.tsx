import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Asterisk } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

interface Props {
  onSubmit: (data: FormData) => void;
}

const schema = z.object({
  firstName: z
    .string()
    .min(1, "First name should be at least (1) character long."),
  lastName: z
    .string()
    .min(1, "Last name should be at least (1) character long."),
  email: z.string().email({ message: "Invalid email address." }),
  fin: z.string().min(1).max(11), // Add proper validation here
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
  password: z.string(), // TODO: Change this to magic link through email
});

export type FormData = z.infer<typeof schema>;

export const StaffForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:mx-auto lg:max-w-screen-lg grid gap-6"
    >
      <Card>
        <CardContent className="mt-4 grid gap-6">
          <div className="flex w-full items-center gap-6">
            <div className="grid w-1/2 gap-2">
              <div className="flex items-center space-x-0.5">
                <Asterisk className="h-4 w-4 text-red-500" />
                <Label>First Name</Label>
              </div>
              <Input {...register("firstName")} placeholder="John" />
              {errors.firstName && (
                <Label className="text-red-400">
                  {errors.firstName.message}
                </Label>
              )}
            </div>
            <div className="grid w-1/2 gap-2">
              <div className="flex items-center space-x-0.5">
                <Asterisk className="h-4 w-4 text-red-500" />
                <Label>Last Name</Label>
              </div>
              <Input {...register("lastName")} placeholder="Doe" />
              {errors.lastName && (
                <Label className="text-red-400">
                  {errors.lastName.message}
                </Label>
              )}
            </div>
          </div>

          <div className="w-full grid gap-2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label>Email</Label>
            </div>
            <Input {...register("email")} placeholder="john.doe@company.com" />
            {errors.email && (
              <Label className="text-red-400">{errors.email.message}</Label>
            )}
          </div>

          <div className="w-full grid gap-2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label>Phone number</Label>
            </div>
            <Input
              {...register("phoneNumber")}
              placeholder="+994 123-123-12-12"
            />
            {errors.phoneNumber && (
              <Label className="text-red-400">
                {errors.phoneNumber.message}
              </Label>
            )}
          </div>

          <div className="w-full grid gap-2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label>Fin</Label>
            </div>
            <Input {...register("fin")} placeholder="ABC123" />
            {errors.fin && (
              <Label className="text-red-400">{errors.fin.message}</Label>
            )}
          </div>

          <div className="w-full grid gap-2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label>Password</Label>
            </div>
            <Input {...register("password")} placeholder="*******" />
            {errors.password && (
              <Label className="text-red-400">{errors.password.message}</Label>
            )}
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" type="submit">
        save
      </Button>
    </form>
  );
};
