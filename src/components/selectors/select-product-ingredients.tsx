import {useState} from "react";
import {Asterisk, CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";

export interface ActiveIngredient{
    Id: number
    IngredientName: string
}

interface Props {
    onSelectedActiveIngredients: (activeIngredients: ActiveIngredient[]) => void
    selectedActiveIngredients: ActiveIngredient[]
}

export const SelectProductIngredients = ({onSelectedActiveIngredients, selectedActiveIngredients}: Props) => {
    const [activeIngredients, setActiveIngredients] = useState<ActiveIngredient[]>([
        {
            Id: 1,
            IngredientName: "Ibuprofen"
        },
        {
            Id: 2,
            IngredientName: "Paracetamol"
        },
        {
            Id: 3,
            IngredientName: "Aspirin"
        },
        {
            Id: 4,
            IngredientName: "Loratadine"
        }
    ]);

    const handleSelectIngredient = (selectedIngredient: string) => {
        const isAlreadySelected = selectedActiveIngredients.some(ingredient => ingredient.IngredientName === selectedIngredient);

        if (!isAlreadySelected) {
            const ingredients = activeIngredients.find(ingredients => ingredients.IngredientName === selectedIngredient);
            if (ingredients) {
                onSelectedActiveIngredients(prevSelected => [...prevSelected, ingredients]);
            }
        }
    };

    const handleRemoveIngredient = (ingredientToRemove: ActiveIngredient) => {
        onSelectedActiveIngredients(prevSelected => prevSelected.filter(ingredient => ingredient.Id !== ingredientToRemove.Id));
    }

    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-0.5">
                    <Asterisk className="w-4 h-4 text-red-500"/>
                    <Label>Active Ingredients</Label>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="text-muted-foreground w-4 h-4"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Select the active ingredients for the product</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex items-center justify-between space-x-2">
                <div className="w-full">
                    <Select onValueChange={handleSelectIngredient}>
                        {activeIngredients.filter(ingredients => !selectedActiveIngredients.some(selected => selected.Id === ingredients.Id)).length === 0 ? (
                            <SelectTrigger disabled={true}>
                                No active ingredients available, add a new active ingredient first.
                            </SelectTrigger>
                        ) : (
                            <SelectTrigger>
                                Select active ingredient
                            </SelectTrigger>
                        )}
                        <SelectContent position="popper">
                            {activeIngredients
                                .filter(ingredients => !selectedActiveIngredients.some(selected => selected.Id === ingredients.Id))
                                .map(warehouse => (
                                    <SelectItem
                                        key={warehouse.Id}
                                        value={warehouse.IngredientName}
                                    >
                                        {warehouse.IngredientName}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button type="button" variant="outline">Add new ingredient</Button>
                </div>
            </div>
            {selectedActiveIngredients.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedActiveIngredients.map(ingredient => (
                        <div className="flex items-center space-x-0.5 bg-muted border rounded-full p-1 border-neutral-200">
                            <X className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => handleRemoveIngredient(ingredient)}/>
                            <div className="text-xs ">{ingredient.IngredientName}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
