import { Card, CardContent } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "@/pages/product/NewProduct.tsx";
import { FormInput } from "@/components/ui/form-input.tsx";
import { Asterisk } from "lucide-react";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const BatchForm = ({ register, errors }: Props) => {
  return (
    <Card>
      <CardContent className="mt-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="grid w-full gap-2">
              <Label>Batch Number</Label>
              <FormInput {...register("batchNumber")} placeholder="#ABC12345" />
              {errors.batchNumber && (
                <Label className="text-red-400">
                  {errors.batchNumber.message}
                </Label>
              )}
            </div>
            <div className="grid w-full gap-2">
              <Label>Barcode</Label>
              <FormInput {...register("barcode")} placeholder="012345678901" />
              {errors.barcode && (
                <Label className="text-red-400">{errors.barcode.message}</Label>
              )}
            </div>
            <div className="grid w-full gap-2">
              <div className="flex items-center space-x-0.5">
                <Asterisk className="h-4 w-4 text-red-500" />
                <Label>Weight (g)</Label>
              </div>
              <FormInput
                {...register("packagingWeight")}
                type="number"
                placeholder="0.00"
              />
              {errors.packagingWeight && (
                <Label className="text-red-400">
                  {errors.packagingWeight.message}
                </Label>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
