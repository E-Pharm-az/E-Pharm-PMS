import {useState} from "react";
import {CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

export interface SideEffect {
    Id: number;
    Name: string;
}

interface SideEffectProps {
    onSelectedSideEffects: (sideEffects: SideEffect[]) => void;
    selectedSideEffects: SideEffect[];
}

export const SelectProductSideEffects = ({onSelectedSideEffects, selectedSideEffects}: SideEffectProps) => {
    const [sideEffects, setSideEffects] = useState<SideEffect[]>([
        {Id: 1, Name: "Headache"},
        {Id: 2, Name: "Nausea"},
        {Id: 3, Name: "Dizziness"},
        {Id: 4, Name: "Fatigue"},
    ]);

    const handleSelectSideEffect = (selectedEffect: string) => {
        const isAlreadySelected = selectedSideEffects.some(effect => effect.Name === selectedEffect);

        if (!isAlreadySelected) {
            const effect = sideEffects.find(effect => effect.Name === selectedEffect);
            if (effect) {
                onSelectedSideEffects(prevSelected => [...prevSelected, effect]);
            }
        }
    };

    const handleRemoveSideEffect = (effectToRemove: SideEffect) => {
        onSelectedSideEffects(prevSelected => prevSelected.filter(effect => effect.Id !== effectToRemove.Id));
    };

    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-1">
                <Label>Side Effects</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="h-4 w-4 text-muted-foreground"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Select the side effects associated with the product</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="w-full">
                <Select onValueChange={handleSelectSideEffect}>
                    {sideEffects.filter(effect => !selectedSideEffects.some(selected => selected.Id === effect.Id)).length === 0 ? (
                        <SelectTrigger disabled={true}>
                            No side effects available, add a new side effect first.
                        </SelectTrigger>
                    ) : (
                        <SelectTrigger>
                            Select side effect
                        </SelectTrigger>
                    )}
                    <SelectContent position="popper">
                        {sideEffects
                            .filter(effect => !selectedSideEffects.some(selected => selected.Id === effect.Id))
                            .map(effect => (
                                <SelectItem
                                    key={effect.Id}
                                    value={effect.Name}
                                >
                                    {effect.Name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {selectedSideEffects.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedSideEffects.map(effect => (
                        <div
                            className="flex items-center rounded-full border border-neutral-200 p-1 space-x-0.5 bg-muted">
                            <X className="h-4 w-4 cursor-pointer text-red-500"
                               onClick={() => handleRemoveSideEffect(effect)}/>
                            <div className="text-xs">{effect.Name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
