import {FC, FormEvent} from "react";
import { SpecialRequirement } from "@/types/product-attribute-types.ts";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/form-input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

export const SpecialRequirementForm: FC<{
    onSubmit: (data: Partial<SpecialRequirement>) => Promise<void>;
}> = ({ onSubmit }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SpecialRequirement>();

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
        <div className="grid w-full gap-2">
          <FormInput
            type="number"
            {...register("minimumAgeInMonthsRequirement", {
              required: "Required",
              valueAsNumber: true,
            })}
            placeholder="Minumum age in months*"
          />
          {errors.minimumAgeInMonthsRequirement && (
            <p className="text-red-500 text-xs">
              {errors.minimumAgeInMonthsRequirement.message}
            </p>
          )}
        </div>
        <div className="grid w-full gap-2">
          <FormInput
            type="number"
            {...register("maximumAgeInMonthsRequirement", {
              required: "Required",
              valueAsNumber: true,
            })}
            placeholder="Maximum age in months*"
          />
          {errors.maximumAgeInMonthsRequirement && (
            <p className="text-red-500 text-xs">
              {errors.maximumAgeInMonthsRequirement.message}
            </p>
          )}
        </div>
        <div className="grid w-full gap-2">
          <FormInput
            type="number"
            {...register("minimumWeighInKgRequirement", {
              required: "Required",
              valueAsNumber: true,
            })}
            placeholder="Minimum weight in kilograms*"
          />
          {errors.minimumWeighInKgRequirement && (
            <p className="text-red-500 text-xs">
              {errors.minimumWeighInKgRequirement.message}
            </p>
          )}
        </div>

        <div className="grid w-full gap-2">
          <FormInput
            type="number"
            {...register("maximumWeighInKgRequirement", {
              required: "Required",
              valueAsNumber: true,
            })}
            placeholder="Maximum weight in kilograms*"
          />
          {errors.maximumWeighInKgRequirement && (
            <p className="text-red-500 text-xs">
              {errors.maximumWeighInKgRequirement.message}
            </p>
          )}
        </div>

        <div className="grid w-full gap-2">
          <Textarea
            {...register("medicalConditionsDescription", {
              required: "Required",
            })}
            placeholder="Medical conditions description*"
          />
          {errors.medicalConditionsDescription && (
            <p className="text-red-500 text-xs">
              {errors.medicalConditionsDescription.message}
            </p>
          )}
        </div>

        <div className="grid w-full gap-2">
          <Textarea
            {...register("otherRequirementsDescription", {
              required: "Required",
            })}
            placeholder="Other requirements description*"
          />
          {errors.otherRequirementsDescription && (
            <p className="text-red-500 text-xs">
              {errors.otherRequirementsDescription.message}
            </p>
          )}
        </div>

        <Button type="submit">Create</Button>
      </form>
    );
};