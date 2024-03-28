import {useState} from "react";
import {CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

export interface SideEffect {
    Id: number;
    EffectName: string;
}

interface SideEffectProps {
    onSelectedSideEffects: (sideEffects: SideEffect[]) => void;
    selectedSideEffects: SideEffect[];
}

export const SelectProductSideEffects = ({onSelectedSideEffects, selectedSideEffects}: SideEffectProps) => {
    const [sideEffects, setSideEffects] = useState<SideEffect[]>([
        {Id: 1, EffectName: "Headache"},
        {Id: 2, EffectName: "Nausea"},
        {Id: 3, EffectName: "Dizziness"},
        {Id: 4, EffectName: "Fatigue"},
    ]);

    const handleSelectSideEffect = (selectedEffect: string) => {
        const isAlreadySelected = selectedSideEffects.some(effect => effect.EffectName === selectedEffect);

        if (!isAlreadySelected) {
            const effect = sideEffects.find(effect => effect.EffectName === selectedEffect);
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
                            <CircleHelp className="text-muted-foreground w-4 h-4"/>
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
                                    value={effect.EffectName}
                                >
                                    {effect.EffectName}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {selectedSideEffects.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedSideEffects.map(effect => (
                        <div
                            className="flex items-center space-x-0.5 bg-muted border rounded-full p-1 border-neutral-200">
                            <X className="w-4 h-4 text-red-500 cursor-pointer"
                               onClick={() => handleRemoveSideEffect(effect)}/>
                            <div className="text-xs ">{effect.EffectName}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
