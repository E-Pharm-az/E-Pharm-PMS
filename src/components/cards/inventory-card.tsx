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

export const InventoryCard = () => {
  return (
    <Card className="h-min">
      <CardContent className="mt-4">
        <form className="grid w-full items-center gap-6">
          <div className="grid w-full gap-2">
            <Label>Inventory</Label>
            {selectedWarehouses.map((warehouse) => (
              <div className="flex items-center justify-between">
                <Label>{warehouse.Name} Quantity</Label>
                <div className="relative 1/3">
                  <Input type="number" inputMode="numeric" placeholder="0" />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger type="button">
                          <CircleHelp className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Enter the product's quantity for {warehouse.Name}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
