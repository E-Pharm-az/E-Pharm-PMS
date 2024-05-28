import { Card, CardContent } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { CircleHelp } from "lucide-react";
import { AttributeSelector } from "@/components/product/attribute-selector.tsx";
import { Warehouse } from "@/types/product-attribute-types.ts";
import {FC, useEffect, useState} from "react";
import {Control, FieldErrors, useFieldArray, UseFormRegister} from "react-hook-form";
import {FormData} from "@/components/product/AddProduct"

interface Props {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export const InventoryCard: FC<Props> = ({
  register,
  errors,
  control,
}) => {
  const [warehouses, setWarehouses] = useState<Warehouse[] | null>(null);
  const [selectedWarehousesIds, setSelectedWarehousesIds] = useState<number[]>(
    [],
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stocks",
  });

  const handleWarehouseChange = (warehouses: Warehouse[] | null) => {
    setWarehouses(warehouses);
  };

  useEffect(() => {
    selectedWarehousesIds.forEach((warehouseId) => {
      if (!fields.some((field) => field.warehouseId === warehouseId)) {
        append({ warehouseId, quantity: 0 });
      }
    });

    fields.forEach((field, index) => {
      if (!selectedWarehousesIds.includes(field.warehouseId)) {
        remove(index);
      }
    });
  }, [selectedWarehousesIds, append, remove, fields]);

  return (
    <>
      <Card className="h-min">
        <CardContent className="mt-4">
          <AttributeSelector<Warehouse>
            route={`/warehouse/${1}/warehouse`}
            name="Warehouse"
            isRequired={true}
            info={"Select a warehouse or pharmacy where this product is stored."}
            error={errors.stocks ? errors.stocks.message : undefined}
            selectedAttributeIds={selectedWarehousesIds}
            setSelectedAttributeIds={setSelectedWarehousesIds}
            onAttributesChange={handleWarehouseChange}
          />
        </CardContent>
      </Card>

      {selectedWarehousesIds.length > 0 && (
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
                        (warehouse) => warehouse.id === field.warehouseId,
                      )?.name
                    }{" "}
                    Quantity
                  </Label>
                  <div className="relative w-1/3">
                    <Input
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
                                    warehouse.id === field.warehouseId,
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
