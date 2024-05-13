import {useState} from "react";
import {Asterisk, CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

export interface Indication {
    Id: number;
    Name: string;
}

interface IndicationsProps {
    onSelectedIndications: (indications: Indication[]) => void;
    selectedIndications: Indication[];
}

export const SelectProductIndications = ({onSelectedIndications, selectedIndications}: IndicationsProps) => {
    const [indications, setIndications] = useState<Indication[]>([
        {Id: 1, Name: "Fever"},
        {Id: 2, Name: "Pain Relief"},
        {Id: 3, Name: "Allergy Relief"},
        {Id: 4, Name: "Cough Suppressant"},
    ]);

    const handleSelectIndication = (selectedIndication: string) => {
        const isAlreadySelected = selectedIndications.some(indication => indication.Name === selectedIndication);

        if (!isAlreadySelected) {
            const indication = indications.find(indication => indication.Name === selectedIndication);
            if (indication) {
                onSelectedIndications(prevSelected => [...prevSelected, indication]);
            }
        }
    };

    const handleRemoveIndication = (indicationToRemove: Indication) => {
        onSelectedIndications(prevSelected => prevSelected.filter(indication => indication.Id !== indicationToRemove.Id));
    };

    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-0.5">
                    <Asterisk className="h-4 w-4 text-red-500"/>
                    <Label>Indications</Label>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="h-4 w-4 text-muted-foreground"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Select the indications for the product</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="w-full">
                <Select onValueChange={handleSelectIndication}>
                    {indications.filter(indication => !selectedIndications.some(selected => selected.Id === indication.Id)).length === 0 ? (
                        <SelectTrigger disabled={true}>
                            No indications available
                        </SelectTrigger>
                    ) : (
                        <SelectTrigger>
                            Select indication
                        </SelectTrigger>
                    )}
                    <SelectContent position="popper">
                        {indications
                            .filter(indication => !selectedIndications.some(selected => selected.Id === indication.Id))
                            .map(indication => (
                                <SelectItem
                                    key={indication.Id}
                                    value={indication.Name}
                                >
                                    {indication.Name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {selectedIndications.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedIndications.map(indication => (
                        <div key={indication.Id}
                             className="flex items-center rounded-full border border-neutral-200 p-1 space-x-0.5 bg-muted">
                            <X className="h-4 w-4 cursor-pointer text-red-500"
                               onClick={() => handleRemoveIndication(indication)}/>
                            <div className="text-xs">{indication.Name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
