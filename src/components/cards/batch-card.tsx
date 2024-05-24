import { Card, CardContent } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";

interface Props {
  register: any;
  errors: any;
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
            </div>
            <div className="grid w-full gap-2">
              <Label>Barcode</Label>
              <Input {...register("barcode")} placeholder="012345678901" />
            </div>
            <div className="grid w-full gap-2">
              <Label>Weight</Label>
              <Input
                {...register("packagingWeight")}
                type="number"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
