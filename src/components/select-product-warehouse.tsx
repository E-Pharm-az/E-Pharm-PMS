import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { Asterisk, CircleHelp, X } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";



interface Props {
  onSelectedWarehouses: (warehouses: Warehouse[]) => void;
  selectedWarehouses: Warehouse[];
}

export const SelectProductWarehouse = ({
  onSelectedWarehouses,
  selectedWarehouses,
}: Props) => {
  const columns: ColumnDef<Warehouse>[] = [
    {
      id: "warehouseName",
      header: "Name",
      cell: (cell) => cell.row.original.Name,
    },
    {
      id: "warehouseAddress",
      header: "Address",
      cell: (cell) => cell.row.original.Address,
    },
    {
      id: "actions",
      cell: (cell) => (
        <Button
          variant="ghost"
          className="-mr-8 h-8 w-8 p-0"
          onClick={() => handleRemoveWarehouse(cell.row.original)}
        >
          <X className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      Id: 1,
      Name: "Main warehouse",
      Address: "Baku, Azerbaijan",
      ProductInventory: 0,
    },
    {
      Id: 2,
      Name: "Test warehouse",
      Address: "Baku, Azerbaijan",
      ProductInventory: 0,
    },
  ]);

  const handleSelectWarehouse = (selectedWarehouse: string) => {
    const isAlreadySelected = selectedWarehouses.some(
      (warehouse) => warehouse.Name === selectedWarehouse,
    );

    if (!isAlreadySelected) {
      const warehouse = warehouses.find(
        (warehouse) => warehouse.Name === selectedWarehouse,
      );
      if (warehouse) {
        onSelectedWarehouses((prevSelected) => [...prevSelected, warehouse]);
      }
    }
  };

  const handleRemoveWarehouse = (warehouseToRemove: Warehouse) => {
    onSelectedWarehouses((prevSelected) =>
      prevSelected.filter((warehouse) => warehouse.Id !== warehouseToRemove.Id),
    );
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-0.5">
          <Asterisk className="h-4 w-4 text-red-500" />
          <Label>Warehouse</Label>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger type="button">
              <CircleHelp className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Select the warehouses or pharmacy where you store this product.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <div className="w-full">
          <Select onValueChange={handleSelectWarehouse}>
            {warehouses.filter(
              (warehouse) =>
                !selectedWarehouses.some(
                  (selected) => selected.Id === warehouse.Id,
                ),
            ).length === 0 ? (
              <SelectTrigger disabled={true}>
                No warehouses available, add a new warehouse first.
              </SelectTrigger>
            ) : (
              <SelectTrigger>Select warehouse</SelectTrigger>
            )}
            <SelectContent position="popper">
              {warehouses
                .filter(
                  (warehouse) =>
                    !selectedWarehouses.some(
                      (selected) => selected.Id === warehouse.Id,
                    ),
                )
                .map((warehouse) => (
                  <SelectItem key={warehouse.Id} value={warehouse.Name}>
                    {warehouse.Name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button type="button" variant="outline">
            Add new warehouse
          </Button>
        </div>
      </div>

    </div>
  );
};
