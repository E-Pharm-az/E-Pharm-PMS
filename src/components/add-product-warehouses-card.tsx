import { Card, CardContent } from "@/components/ui/card.tsx";
import { SelectProductWarehouse } from "@/components/select-product-warehouse.tsx";

export const AddProductWarehousesCard = () => {
  return (
    <Card className="h-min">
      <CardContent className="mt-4">
        <form className="grid w-full items-center gap-6">
          <SelectProductWarehouse
            selectedWarehouses={selectedWarehouses}
            onSelectedWarehouses={setSelectedWarehouses}
          />
        </form>
      </CardContent>
    </Card>
  );
};
