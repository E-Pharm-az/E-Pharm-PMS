import {useState} from "react";
import {CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

export interface Allergy {
    Id: number;
    AllergyName: string;
}

interface AllergiesProps {
    onSelectedAllergies: (allergies: Allergy[]) => void;
    selectedAllergies: Allergy[];
}

export const SelectProductAllergies = ({ onSelectedAllergies, selectedAllergies }: AllergiesProps) => {
    const [allergies, setAllergies] = useState<Allergy[]>([
        { Id: 1, AllergyName: "Peanuts" },
        { Id: 2, AllergyName: "Shellfish" },
        { Id: 3, AllergyName: "Gluten" },
        { Id: 4, AllergyName: "Dairy" },
    ]);

    const handleSelectAllergy = (selectedAllergy: string) => {
        const isAlreadySelected = selectedAllergies.some(allergy => allergy.AllergyName === selectedAllergy);

        if (!isAlreadySelected) {
            const allergy = allergies.find(allergy => allergy.AllergyName === selectedAllergy);
            if (allergy) {
                onSelectedAllergies(prevSelected => [...prevSelected, allergy]);
            }
        }
    };

    const handleRemoveAllergy = (allergyToRemove: Allergy) => {
        onSelectedAllergies(prevSelected => prevSelected.filter(allergy => allergy.Id !== allergyToRemove.Id));
    };

    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-1">
                <Label>Allergies</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="text-muted-foreground w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Select the allergies for the product</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="w-full">
                <Select onValueChange={handleSelectAllergy}>
                    {allergies.filter(allergy => !selectedAllergies.some(selected => selected.Id === allergy.Id)).length === 0 ? (
                        <SelectTrigger disabled={true}>
                            No allergies available
                        </SelectTrigger>
                    ) : (
                        <SelectTrigger>
                            Select allergy
                        </SelectTrigger>
                    )}
                    <SelectContent position="popper">
                        {allergies
                            .filter(allergy => !selectedAllergies.some(selected => selected.Id === allergy.Id))
                            .map(allergy => (
                                <SelectItem
                                    key={allergy.Id}
                                    value={allergy.AllergyName}
                                >
                                    {allergy.AllergyName}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {selectedAllergies.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedAllergies.map(allergy => (
                        <div key={allergy.Id} className="flex items-center space-x-0.5 bg-muted border rounded-full p-1 border-neutral-200">
                            <X className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => handleRemoveAllergy(allergy)} />
                            <div className="text-xs ">{allergy.AllergyName}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
