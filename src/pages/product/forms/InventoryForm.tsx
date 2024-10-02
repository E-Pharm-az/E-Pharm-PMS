import { Card, CardContent } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { CircleHelp } from "lucide-react";
import { AttributeSelector } from "@/pages/product/ui/attribute-selector.tsx";
import { Warehouse } from "@/types/product-attribute-types.ts";
import { FC, useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { FormData } from "@/pages/product/NewProduct.tsx";
import { FormInput } from "@/components/ui/form-input.tsx";
import { WarehouseForm } from "@/pages/product/attribute-forms/WarehouseForm.tsx";

type SingleOrArray<T> = T | T[] | null;

// Fixed issue

interface Props {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export const InventoryForm: FC<Props> = ({ register, errors, control }) => {
  const [warehouses, setWarehouses] = useState<Warehouse[] | null>(null);
  const [selectedWarehousesIds, setSelectedWarehousesIds] =
    useState<SingleOrArray<number>>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stocks",
  });

  const handleWarehouseChange = (warehouses: Warehouse[] | null) => {
    setWarehouses(warehouses);
  };

  useEffect(() => {
    const ids = Array.isArray(selectedWarehousesIds)
      ? selectedWarehousesIds
      : selectedWarehousesIds
        ? [selectedWarehousesIds]
        : [];

    ids.forEach((warehouseId) => {
      if (!fields.some((field) => field.warehouseId === warehouseId)) {
        append({ warehouseId, quantity: 0 });
      }
    });

    fields.forEach((field, index) => {
      if (!ids.includes(field.warehouseId)) {
        remove(index);
      }
    });
  }, [selectedWarehousesIds, append, remove, fields]);

  return (
    <>
      <Card className="h-min">
        <CardContent className="mt-4">
          <AttributeSelector<Warehouse>
            route="/warehouses"
            name="Warehouse"
            isRequired
            info="Select a warehouse or pharmacy where this product is stored."
            error={errors.stocks ? errors.stocks.message : undefined}
            selectedAttributeIds={selectedWarehousesIds}
            setSelectedAttributeIds={setSelectedWarehousesIds}
            onChange={setSelectedWarehousesIds}
            createForm={WarehouseForm}
            onAttributesChange={handleWarehouseChange}
          />
        </CardContent>
      </Card>

      {selectedWarehousesIds && (
        <Card className="h-min">
          <CardContent className="mt-4">
            <div className="grid w-full gap-2">
              <Label>Inventory</Label>
              {fields.map((field, index) => (
                <div
                  className="flex items-center justify-between"
                  key={field.id}
                >
                  <Label>
                    {
                      warehouses?.find(
                        (warehouse) => warehouse.id === field.warehouseId
                      )?.name
                    }{" "}
                    Quantity
                  </Label>
                  <div className="relative w-1/3">
                    <FormInput
                      type="number"
                      inputMode="numeric"
                      placeholder="0"
                      {...register(`stocks.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                    />
                    <input
                      type="hidden"
                      {...register(`stocks.${index}.warehouseId`, {
                        valueAsNumber: true,
                      })}
                      value={field.warehouseId}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger type="button">
                            <CircleHelp className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Enter the product's quantity for{" "}
                              {
                                warehouses?.find(
                                  (warehouse) =>
                                    warehouse.id === field.warehouseId
                                )?.name
                              }
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
