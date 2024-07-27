import { Card, CardContent } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {FormData} from "@/components/product/NewProduct.tsx"

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const BatchCard = ({ register, errors }: Props) => {
  return (
    <Card>
      <CardContent className="mt-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="grid w-full gap-2">
              <Label>Batch Number</Label>
              <Input {...register("batchNumber")} placeholder="#ABC12345" />
              {errors.batchNumber && (
                  <Label className="text-red-400">{errors.batchNumber.message}</Label>
              )}
            </div>
            <div className="grid w-full gap-2">
              <Label>Barcode</Label>
              <Input {...register("barcode")} placeholder="012345678901" />
              {errors.barcode && (
                  <Label className="text-red-400">{errors.barcode.message}</Label>
              )}
            </div>
            <div className="grid w-full gap-2">
              <Label>Weight</Label>
              <Input
                {...register("packagingWeight", {valueAsNumber: true})}
                type="number"
                placeholder="0.00"
              />
              {errors.packagingWeight && (
                  <Label className="text-red-400">{errors.packagingWeight.message}</Label>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
