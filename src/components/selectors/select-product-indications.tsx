import {useState} from "react";
import {Asterisk, CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

export interface Indication {
    Id: number;
    IndicationName: string;
}

interface IndicationsProps {
    onSelectedIndications: (indications: Indication[]) => void;
    selectedIndications: Indication[];
}

export const SelectProductIndications = ({onSelectedIndications, selectedIndications}: IndicationsProps) => {
    const [indications, setIndications] = useState<Indication[]>([
        {Id: 1, IndicationName: "Fever"},
        {Id: 2, IndicationName: "Pain Relief"},
        {Id: 3, IndicationName: "Allergy Relief"},
        {Id: 4, IndicationName: "Cough Suppressant"},
    ]);

    const handleSelectIndication = (selectedIndication: string) => {
        const isAlreadySelected = selectedIndications.some(indication => indication.IndicationName === selectedIndication);

        if (!isAlreadySelected) {
            const indication = indications.find(indication => indication.IndicationName === selectedIndication);
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
                    <Asterisk className="w-4 h-4 text-red-500"/>
                    <Label>Indications</Label>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="text-muted-foreground w-4 h-4"/>
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
                                    value={indication.IndicationName}
                                >
                                    {indication.IndicationName}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {selectedIndications.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedIndications.map(indication => (
                        <div key={indication.Id}
                             className="flex items-center space-x-0.5 bg-muted border rounded-full p-1 border-neutral-200">
                            <X className="w-4 h-4 text-red-500 cursor-pointer"
                               onClick={() => handleRemoveIndication(indication)}/>
                            <div className="text-xs ">{indication.IndicationName}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
