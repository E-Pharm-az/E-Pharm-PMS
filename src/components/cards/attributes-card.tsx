import { Card, CardContent } from "@/components/ui/card.tsx";
import { Asterisk, CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { MultiSelectProductAttribute } from "@/components/multi-select-product-attribute.tsx";
import { SingleSelectProductAttribute } from "@/components/single-select-product-attribute.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";

export const AttributesCard = () => {
  return (
    <Card>
      <CardContent className="mt-4">
        <form className="grid w-full items-center gap-6">
          <div className="grid w-full gap-2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label>Strength (mg)</Label>
            </div>
            <Input type="number" placeholder="Strength in milligrams" />
          </div>

          <div className="grid w-full gap-2">
            <Label>Contraindications Description</Label>
            <Textarea placeholder="Description of contraindications" />
          </div>

          <div className="grid w-full gap-2">
            <Label>Storage Condition Description</Label>
            <Textarea placeholder="Description of storage conditions" />
          </div>

          <MultiSelectProductAttribute
            isRequired={true}
            route={`/active-ingredient/pharma-company/${3}/active-ingredients`}
            name="Active ingredient"
            isCreatable={true}
            selectedAttributes={selectedActiveIngredients}
            setSelectedAttributes={setSelectedActiveIngredients}
          />

          <MultiSelectProductAttribute
            isRequired={false}
            route="/allergy"
            name="Allergy"
            selectedAttributes={selectedAllergies}
            setSelectedAttributes={setSelectedAllergies}
          />

          <MultiSelectProductAttribute
            isRequired={true}
            route="/dosageform"
            name="Dosage form"
            selectedAttributes={selectedDosageForms}
            setSelectedAttributes={setSelectedDosageForms}
          />

          <MultiSelectProductAttribute
            isRequired={false}
            route="/indication"
            name="Indication"
            selectedAttributes={selectedIndications}
            setSelectedAttributes={setSelectedIndications}
          />

          <MultiSelectProductAttribute
            isRequired={false}
            route="/routeofadministration"
            name="Route of administrations"
            selectedAttributes={selectedRouteOfAdministrations}
            setSelectedAttributes={setSelectedRouteOfAdministrations}
          />

          <MultiSelectProductAttribute
            isRequired={false}
            route="/sideeffect"
            name="Side effect"
            selectedAttributes={selectedSideEffects}
            setSelectedAttributes={setSelectedSideEffects}
          />

          <MultiSelectProductAttribute
            isRequired={false}
            route="/usagewarning"
            name="Usage Warning"
            selectedAttributes={selectedUsageWarnings}
            setSelectedAttributes={setSelectedUsageWarnings}
          />

          <SingleSelectProductAttribute
            isRequired={true}
            isCreatable={true}
            route={`/manufacturer/${3}/manufacturer`}
            name="Manufacturer"
            selectedAttribute={selectedManufacturer}
            setSelectedAttribute={setSelectedManufacturer}
          />

          <div className="grid w-full gap-2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label>Expiry Date</Label>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !productExpiryDate && "text-muted-foreground",
                  )}
                >
                  {productExpiryDate ? (
                    format(productExpiryDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Calendar
                  mode="single"
                  selected={productExpiryDate}
                  onSelect={setProductExpiryDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
