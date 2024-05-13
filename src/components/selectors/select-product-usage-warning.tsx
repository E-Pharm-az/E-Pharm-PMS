import {useState} from "react";
import {CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

export interface UsageWarning {
    Id: number;
    WarningText: string;
}

interface UsageWarningProps {
    onSelectedUsageWarnings: (usageWarnings: UsageWarning[]) => void;
    selectedUsageWarnings: UsageWarning[];
}

export const SelectProductUsageWarnings = ({onSelectedUsageWarnings, selectedUsageWarnings}: UsageWarningProps) => {
    const [usageWarnings, setUsageWarnings] = useState<UsageWarning[]>([
        {Id: 1, WarningText: "Do not exceed the recommended dosage"},
        {Id: 2, WarningText: "Consult a doctor before use if pregnant or breastfeeding"},
        {Id: 3, WarningText: "Keep out of reach of children"},
    ]);

    const handleSelectUsageWarning = (selectedWarning: string) => {
        const isAlreadySelected = selectedUsageWarnings.some(warning => warning.WarningText === selectedWarning);

        if (!isAlreadySelected) {
            const warning = usageWarnings.find(warning => warning.WarningText === selectedWarning);
            if (warning) {
                onSelectedUsageWarnings(prevSelected => [...prevSelected, warning]);
            }
        }
    };

    const handleRemoveUsageWarning = (warningToRemove: UsageWarning) => {
        onSelectedUsageWarnings(prevSelected => prevSelected.filter(warning => warning.Id !== warningToRemove.Id));
    };

    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-1">
                <Label>Usage Warnings</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="h-4 w-4 text-muted-foreground"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Select the usage warnings for the product</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="w-full">
                <Select onValueChange={handleSelectUsageWarning}>
                    {usageWarnings.filter(warning => !selectedUsageWarnings.some(selected => selected.Id === warning.Id)).length === 0 ? (
                        <SelectTrigger disabled={true}>
                            No usage warnings available, add a new usage warning first.
                        </SelectTrigger>
                    ) : (
                        <SelectTrigger>
                            Select usage warning
                        </SelectTrigger>
                    )}
                    <SelectContent position="popper">
                        {usageWarnings
                            .filter(warning => !selectedUsageWarnings.some(selected => selected.Id === warning.Id))
                            .map(warning => (
                                <SelectItem
                                    key={warning.Id}
                                    value={warning.WarningText}
                                >
                                    {warning.WarningText}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {selectedUsageWarnings.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedUsageWarnings.map(warning => (
                        <div
                            className="flex items-center rounded-full border border-neutral-200 p-1 space-x-0.5 bg-muted">
                            <X className="h-4 w-4 cursor-pointer text-red-500"
                               onClick={() => handleRemoveUsageWarning(warning)}/>
                            <div className="text-xs">{warning.WarningText}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
