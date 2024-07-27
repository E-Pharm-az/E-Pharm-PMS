import { Card, CardContent } from "@/components/ui/card.tsx";
import { Asterisk } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { FormData } from "@/components/product/NewProduct.tsx";
import { AttributeSelector } from "@/components/product/attribute-selector.tsx";
import {
  ActiveIngredient,
  Allergy,
  DosageForm,
  Indication, Manufacturer,
  RouteOfAdministration, SideEffect, UsageWarning
} from "@/types/product-attribute-types.ts";
import { FormInput } from "@/components/ui/form-input.tsx";
import { ActiveIngredientForm } from "@/components/product/attribute-forms/ActiveIngredientForm.tsx";

interface Props {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export const AttributesForm = ({ register, control, errors }: Props) => {

  return (
    <Card>
      <CardContent className="mt-4 grid gap-6">
        <div className="grid w-full gap-2">
          <div className="flex items-center space-x-0.5">
            <Asterisk className="h-4 w-4 text-red-500" />
            <Label>Strength (mg)</Label>
          </div>
          <FormInput
            type="number"
            {...register("strengthMg", { valueAsNumber: true })}
            placeholder="Strength in milligrams"
          />
          {errors.strengthMg && (
            <p className="text-red-400 text-xs">{errors.strengthMg.message}</p>
          )}
        </div>

        <div className="grid w-full gap-2">
          <Label>Contraindications Description</Label>
          <Textarea
            {...register("contraindicationsDescription")}
            placeholder="Description of contraindications"
          />
        </div>

        <div className="grid w-full gap-2">
          <Label>Storage Condition Description</Label>
          <Textarea
            {...register("storageConditionDescription")}
            placeholder="Description of storage conditions"
          />
        </div>

        <Controller
          name="activeIngredientsIds"
          control={control}
          render={({ field }) => (
            <AttributeSelector<ActiveIngredient>
              isRequired={true}
              route={`/active-ingredient`}
              name="Active ingredient"
              selectedAttributeIds={field.value}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
              createForm={ActiveIngredientForm}
            />
          )}
        />

        <Controller
          name="allergiesIds"
          control={control}
          render={({ field }) => (
            <AttributeSelector<Allergy>
              isRequired={false}
              route="/allergy"
              name="Allergy"
              selectedAttributeIds={field.value}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
            />
          )}
        />

        <Controller
          name="dosageFormsIds"
          control={control}
          render={({ field }) => (
            <AttributeSelector<DosageForm>
              isRequired={true}
              route="/dosageform"
              name="Dosage form"
              selectedAttributeIds={field.value}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
            />
          )}
        />

        <Controller
          name="indicationsIds"
          control={control}
          render={({ field }) => (
            <AttributeSelector<Indication>
              isRequired={false}
              route="/indication"
              name="Indication"
              selectedAttributeIds={field.value}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
            />
          )}
        />

        <Controller
          name="routeOfAdministrationsIds"
          control={control}
          render={({ field }) => (
            <AttributeSelector<RouteOfAdministration>
              isRequired={false}
              route="/routeofadministration"
              name="Route of administrations"
              selectedAttributeIds={field.value}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
            />
          )}
        />

        <Controller
          name="sideEffectsIds"
          control={control}
          render={({ field }) => (
            <AttributeSelector<SideEffect>
              isRequired={false}
              route="/sideeffect"
              name="Side effect"
              selectedAttributeIds={field.value}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
            />
          )}
        />

        <Controller
          name="usageWarningsIds"
          control={control}
          render={({ field }) => (
            <AttributeSelector<UsageWarning>
              isRequired={false}
              route="/usagewarning"
              name="Usage Warning"
              selectedAttributeIds={field.value}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
            />
          )}
        />

        <Controller
          name="manufacturerId"
          control={control}
          render={({ field }) => (
            <AttributeSelector<Manufacturer>
              isRequired={true}
              selectLimit={1}
              route="manufacturer"
              name="Manufacturer"
              selectedAttributeIds={field.value}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
            />
          )}
        />
      </CardContent>
    </Card>
  );
};
