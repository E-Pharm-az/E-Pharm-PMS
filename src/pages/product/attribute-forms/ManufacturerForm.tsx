import { FC, FormEvent } from "react";
import { Manufacturer} from "@/types/product-attribute-types.ts";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/form-input.tsx";
import { Button } from "@/components/ui/button.tsx";

export const ManufacturerForm: FC<{
  onSubmit: (data: Partial<Manufacturer>) => Promise<void>;
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Manufacturer>();

  const onSubmitWrapper = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  return (
    <form onSubmit={onSubmitWrapper} className="grid gap-4">
      <div className="grid gap-1">
        <FormInput
          type="text"
          {...register("name", { required: "Required" })}
          placeholder="Name*"
        />
        {errors.name && (
          <p className="text-red-400 text-xs">{errors.name.message}</p>
        )}
      </div>
      <FormInput
        type="text"
        {...register("country")}
        placeholder="Country*"
      />
      <FormInput
        type="text"
        {...register("website")}
        placeholder="Website*"
      />
      <FormInput
        type="email"
        {...register("email")}
        placeholder="Email*"
      />
      <Button type="submit">Create</Button>
    </form>
  );
};
