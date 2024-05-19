import { Card, CardContent } from "@/components/ui/card.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { CircleHelp } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";

export const AddProductSubscriptionCard = () => {
  return (
    <Card className="h-min">
      <CardContent className="mt-4">
        <div className="flex items-center space-x-2">
          <Checkbox disabled={true} />
          <Label>Allow subscription ordering</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button">
                <CircleHelp className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  When enabled, customers can subscribe to this product for
                  regular, automatic deliveries.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex flex-grow justify-end">
            <Badge className="text-nowrap">Coming soon</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
