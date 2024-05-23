import {Card, CardContent} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {CircleHelp} from "lucide-react";

interface Props {
    register: any;
    errors: any;
}

export const PriceCard = ({register, errors}: Props) => {
    return (
        <Card className="h-min">
            <CardContent className="mt-4">
                <div className="grid w-full items-center gap-2">
                    <div className="flex w-full items-center gap-2">
                        <div className="w-1/2">
                            <Label>Price</Label>
                            <Input
                                {...register("price")}
                                type="number"
                                inputMode="numeric"
                                placeholder="₼ 0.00"
                            />
                        </div>
                        <div className="w-1/2">
                            <Label>Cost Per Item</Label>
                            <div className="relative">
                                <Input
                                    {...register("costPerItem")}
                                    type="number"
                                    inputMode="numeric"
                                    placeholder="₼ 0.00"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger type="button">
                                                <CircleHelp className="h-4 w-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    Enter the cost of this item for profit and
                                                    margin calculations.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full items-center gap-2">
                        <div className="w-1/2">
                            <Label>Profit</Label>
                            <div className="flex h-10 w-full rounded-md file:border-0 border file:bg-transparent px-3 py-2 text-sm file:text-sm file:font-medium border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                --
                            </div>
                        </div>
                        <div className="w-1/2">
                            <Label>Margin</Label>
                            <div className="flex h-10 w-full rounded-md file:border-0 border file:bg-transparent px-3 py-2 text-sm file:text-sm file:font-medium border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                --
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
