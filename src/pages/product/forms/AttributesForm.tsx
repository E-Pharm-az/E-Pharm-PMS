import { Card, CardContent } from "@/components/ui/card.tsx";
import {Asterisk, CalendarIcon} from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { FormData } from "@/pages/product/NewProduct.tsx";
import { AttributeSelector } from "@/pages/product/ui/attribute-selector.tsx";
import {
  ActiveIngredient,
  Allergy,
  DosageForm,
  Indication, Manufacturer, RegulatoryInformation,
  RouteOfAdministration, SideEffect, SpecialRequirement, UsageWarning
} from "@/types/product-attribute-types.ts";
import { FormInput } from "@/components/ui/form-input.tsx";
import { ActiveIngredientForm } from "@/pages/product/attribute-forms/ActiveIngredientForm.tsx";
import {ManufacturerForm} from "@/pages/product/attribute-forms/ManufacturerForm.tsx";
import {RegulatoryInformationForm} from "@/pages/product/attribute-forms/RegulatoryInformationForm.tsx";
import {SpecialRequirementForm} from "@/pages/product/attribute-forms/SpecialRequirementForm.tsx";
import {format, isAfter, isBefore} from "date-fns";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Calendar} from "@/components/ui/calendar.tsx";

interface Props {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export const AttributesForm = ({ register, control, errors }: Props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card>
      <CardContent className="mt-4 grid gap-6">
        <div className="grid w-full gap-2">
          <div className="flex items-center space-x-0.5">
            <Asterisk className="h-4 w-4 text-red-500" />
            <Label>Strength (mg)</Label>
          </div>
          <FormInput
            {...register("strengthMg", {
              setValueAs: (v: string) => (v === "" ? undefined : parseFloat(v)),
            })}
            type="number"
            step="0.01"
            placeholder="Strength in milligrams"
          />
          {errors.strengthMg && (
            <p className="text-red-500 text-xs">{errors.strengthMg.message}</p>
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
              isRequired
              error={errors.activeIngredientsIds?.message}
              route="/active-ingredients"
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
              error={errors.allergiesIds?.message}
              route="/allergies"
              name="Allergy"
              selectedAttributeIds={field.value ?? null}
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
              isRequired
              error={errors.dosageFormsIds?.message}
              route="/dosage-forms"
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
              error={errors.indicationsIds?.message}
              route="/indications"
              name="Indication"
              selectedAttributeIds={field.value ?? null}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
            />
          )}
        />

        <Controller
          name="specialRequirementsId"
          control={control}
          render={({ field }) => (
            <AttributeSelector<SpecialRequirement>
              selectLimit={1}
              error={errors.specialRequirementsId?.message}
              route="/special-requirements"
              name="Special Requirement"
              selectedAttributeIds={field.value ?? null}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
              createForm={SpecialRequirementForm}
            />
          )}
        />

        <Controller
          name="regulatoryInformationId"
          control={control}
          render={({ field }) => (
            <AttributeSelector<RegulatoryInformation>
              isRequired
              selectLimit={1}
              error={errors.specialRequirementsId?.message}
              route="/regulatory-info"
              name="Regulatory Information"
              selectedAttributeIds={field.value}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
              createForm={RegulatoryInformationForm}
            />
          )}
        />

        <Controller
          name="routeOfAdministrationsIds"
          control={control}
          render={({ field }) => (
            <AttributeSelector<RouteOfAdministration>
              isRequired
              error={errors.routeOfAdministrationsIds?.message}
              route="/roa"
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
              error={errors.sideEffectsIds?.message}
              route="/side-effects"
              name="Side effect"
              selectedAttributeIds={field.value ?? null}
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
              error={errors.usageWarningsIds?.message}
              route="/usage-warnings"
              name="Usage Warning"
              selectedAttributeIds={field.value ?? null}
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
              isRequired
              error={errors.manufacturerId?.message}
              selectLimit={1}
              route="/manufacturers"
              name="Manufacturer"
              selectedAttributeIds={field.value ?? null}
              onChange={field.onChange}
              setSelectedAttributeIds={field.onChange}
              createForm={ManufacturerForm}
            />
          )}
        />

        <div className="flex items-center gap-2 w-full justify-between">
          <div className="grid gap-1 w-1/2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label>Manufacturing date</Label>
            </div>
            <Controller
              name="manufacturingDate"
              control={control}
              rules={{
                required: "Required",
                validate: (value) =>
                  !isBefore(new Date(value), today) ||
                  "Manufacturing date cannot be in the future",
              }}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) => isAfter(date, today)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.manufacturingDate && (
              <p className="text-red-400 text-xs">
                {errors.manufacturingDate.message}
              </p>
            )}
          </div>

          <div className="grid gap-1 w-1/2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label>Expiry date</Label>
            </div>

            <Controller
              name="expiryDate"
              control={control}
              rules={{
                required: "Required",
                validate: (value) =>
                  isAfter(new Date(value), today) ||
                  "Expiry date must be in the future",
              }}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) => isBefore(date, today)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.manufacturingDate && (
              <p className="text-red-400 text-xs">
                {errors.manufacturingDate.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
