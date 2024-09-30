import { FC, FormEvent } from "react";
import { Warehouse } from "@/types/product-attribute-types.ts";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/form-input.tsx";
import { Button } from "@/components/ui/button.tsx";

export const WarehouseForm: FC<{
    onSubmit: (data: Partial<Warehouse>) => Promise<void>;
}> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Warehouse>();

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
        <div className="grid gap-1">
          <FormInput
            type="text"
            {...register("address", { required: "Required" })}
            placeholder="Address*"
          />
          {errors.address && (
            <p className="text-red-400 text-xs">{errors.address.message}</p>
          )}
        </div>

        <Button type="submit">Create</Button>
      </form>
    );
};
