import { Card, CardContent } from "@/components/ui/card.tsx";
import { Asterisk, CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { FormData } from "@/views/AddProduct.tsx";
import { AttributeSelector } from "@/components/attribute-selector.tsx";
import {
  ActiveIngredient,
  Allergy,
  DosageForm,
  Indication,
  Manufacturer,
  RouteOfAdministration,
  SideEffect,
  UsageWarning,
} from "@/types/product-attribute-types.ts";

interface Props {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export const AttributesCard = ({ register, control, errors }: Props) => {
  return (
    <Card>
      <CardContent className="mt-4 grid gap-6">
        <div className="grid w-full gap-2">
          <div className="flex items-center space-x-0.5">
            <Asterisk className="h-4 w-4 text-red-500" />
            <Label>Strength (mg)</Label>
          </div>
          <Input type="number" {...register("strengthMg", {valueAsNumber: true})} placeholder="Strength in milligrams" />
        </div>

        <div className="grid w-full gap-2">
          <Label>Contraindications Description</Label>
          <Textarea {...register("contraindicationsDescription")}  placeholder="Description of contraindications" />
        </div>

        <div className="grid w-full gap-2">
          <Label>Storage Condition Description</Label>
          <Textarea {...register("storageConditionDescription")} placeholder="Description of storage conditions" />
        </div>

        {/*<Controller*/}
        {/*  name="activeIngredientsIds"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <AttributeSelector<ActiveIngredient>*/}
        {/*      isRequired={true}*/}
        {/*      route={`/active-ingredient/pharma-company/${1}/active-ingredients`}*/}
        {/*      name="Active ingredient"*/}
        {/*      isCreatable={true}*/}
        {/*      selectedAttributeIds={field.value}*/}
        {/*      setSelectedAttributeIds={field.onChange}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<Controller*/}
        {/*  name="allergiesIds"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <AttributeSelector<Allergy>*/}
        {/*      isRequired={false}*/}
        {/*      route="/allergy"*/}
        {/*      name="Allergy"*/}
        {/*      selectedAttributeIds={field.value}*/}
        {/*      setSelectedAttributeIds={field.onChange}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<Controller*/}
        {/*  name="dosageFormsIds"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <AttributeSelector<DosageForm>*/}
        {/*      isRequired={true}*/}
        {/*      route="/dosageform"*/}
        {/*      name="Dosage form"*/}
        {/*      selectedAttributeIds={field.value}*/}
        {/*      setSelectedAttributeIds={field.onChange}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<Controller*/}
        {/*  name="indicationsIds"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <AttributeSelector<Indication>*/}
        {/*      isRequired={false}*/}
        {/*      route="/indication"*/}
        {/*      name="Indication"*/}
        {/*      selectedAttributeIds={field.value}*/}
        {/*      setSelectedAttributeIds={field.onChange}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<Controller*/}
        {/*  name="routeOfAdministrationsIds"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <AttributeSelector<RouteOfAdministration>*/}
        {/*      isRequired={false}*/}
        {/*      route="/routeofadministration"*/}
        {/*      name="Route of administrations"*/}
        {/*      selectedAttributeIds={field.value}*/}
        {/*      setSelectedAttributeIds={field.onChange}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<Controller*/}
        {/*  name="sideEffectsIds"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <AttributeSelector<SideEffect>*/}
        {/*      isRequired={false}*/}
        {/*      route="/sideeffect"*/}
        {/*      name="Side effect"*/}
        {/*      selectedAttributeIds={field.value}*/}
        {/*      setSelectedAttributeIds={field.onChange}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<Controller*/}
        {/*  name="usageWarningsIds"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <AttributeSelector<UsageWarning>*/}
        {/*      isRequired={false}*/}
        {/*      route="/usagewarning"*/}
        {/*      name="Usage Warning"*/}
        {/*      selectedAttributeIds={field.value}*/}
        {/*      setSelectedAttributeIds={field.onChange}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<Controller*/}
        {/*  name="manufacturerId"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <AttributeSelector<Manufacturer>*/}
        {/*      isRequired={true}*/}
        {/*      isCreatable={true}*/}
        {/*      selectLimit={1}*/}
        {/*      route={`/manufacturer/${1}/manufacturer`}*/}
        {/*      name="Manufacturer"*/}
        {/*      selectedAttributeIds={field.value}*/}
        {/*      setSelectedAttributeIds={field.onChange}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<div className="grid w-full gap-2">*/}
        {/*  <div className="flex items-center space-x-0.5">*/}
        {/*    <Asterisk className="h-4 w-4 text-red-500" />*/}
        {/*    <Label>Expiry Date</Label>*/}
        {/*  </div>*/}
        {/*  <Popover>*/}
        {/*    <PopoverTrigger asChild>*/}
        {/*      <Button*/}
        {/*        variant={"outline"}*/}
        {/*        className={cn(*/}
        {/*          "w-full pl-3 text-left font-normal",*/}
        {/*          !productExpiryDate && "text-muted-foreground",*/}
        {/*        )}*/}
        {/*      >*/}
        {/*        {productExpiryDate ? (*/}
        {/*          format(productExpiryDate, "PPP")*/}
        {/*        ) : (*/}
        {/*          <span>Pick a date</span>*/}
        {/*        )}*/}
        {/*        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />*/}
        {/*      </Button>*/}
        {/*    </PopoverTrigger>*/}
        {/*    <PopoverContent className="w-full p-0" align="start">*/}
        {/*      <Calendar*/}
        {/*        mode="single"*/}
        {/*        selected={productExpiryDate}*/}
        {/*        onSelect={setProductExpiryDate}*/}
        {/*        initialFocus*/}
        {/*      />*/}
        {/*    </PopoverContent>*/}
        {/*  </Popover>*/}
        {/*</div>*/}
      </CardContent>
    </Card>
  );
};
