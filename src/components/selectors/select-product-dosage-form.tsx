import {useState} from "react";
import {Asterisk, CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

export interface DosageForm {
    Id: number;
    Name: string;
}

interface DosageFormsProps {
    onSelectedDosageForms: (dosageForms: DosageForm[]) => void;
    selectedDosageForms: DosageForm[];
}

export const SelectProductDosageForms = ({ onSelectedDosageForms, selectedDosageForms }: DosageFormsProps) => {
    const [dosageForms, setDosageForms] = useState<DosageForm[]>([
        { Id: 1, Name: "Tablet" },
        { Id: 2, Name: "Capsule" },
        { Id: 3, Name: "Liquid" },
        { Id: 4, Name: "Injection" },
    ]);

    const handleSelectDosageForm = (selectedForm: string) => {
        const isAlreadySelected = selectedDosageForms.some(form => form.Name === selectedForm);

        if (!isAlreadySelected) {
            const form = dosageForms.find(form => form.Name === selectedForm);
            if (form) {
                onSelectedDosageForms(prevSelected => [...prevSelected, form]);
            }
        }
    };

    const handleRemoveDosageForm = (formToRemove: DosageForm) => {
        onSelectedDosageForms(prevSelected => prevSelected.filter(form => form.Id !== formToRemove.Id));
    };

    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-0.5">
                    <Asterisk className="h-4 w-4 text-red-500" />
                    <Label>Dosage Forms</Label>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Select the dosage forms for the product</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="w-full">
                <Select onValueChange={handleSelectDosageForm}>
                    {dosageForms.filter(form => !selectedDosageForms.some(selected => selected.Id === form.Id)).length === 0 ? (
                        <SelectTrigger disabled={true}>
                            No dosage forms available
                        </SelectTrigger>
                    ) : (
                        <SelectTrigger>
                            Select dosage form
                        </SelectTrigger>
                    )}
                    <SelectContent position="popper">
                        {dosageForms
                            .filter(form => !selectedDosageForms.some(selected => selected.Id === form.Id))
                            .map(form => (
                                <SelectItem
                                    key={form.Id}
                                    value={form.Name}
                                >
                                    {form.Name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {selectedDosageForms.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedDosageForms.map(form => (
                        <div key={form.Id} className="flex items-center rounded-full border border-neutral-200 p-1 space-x-0.5 bg-muted">
                            <X className="h-4 w-4 cursor-pointer text-red-500" onClick={() => handleRemoveDosageForm(form)} />
                            <div className="text-xs">{form.Name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
