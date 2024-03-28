import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {CircleHelp, X} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {useState} from "react";

interface SpecialRequirement {
    Id: number
    Name: string
    MinimumAgeInMonthsRequirement: number,
    MaximumAgeInMonthsRequirement: number,
    MinimumWeighInKgRequirement: number,
    MaximumWeighInKgRequirement: number,
    MedicalConditionsDescription: string
    OtherRequirementsDescription: string
}

export const SelectProductRequirement = () => {

    const [selectedSpecialRequirement, setSelectedSpecialRequirement] = useState<SpecialRequirement | null>(null);
    const [specialRequirements, setSpecialRequirements] = useState<SpecialRequirement[]>(
        [
            {
                Id: 1,
                Name: "Pediatric",
                MinimumAgeInMonthsRequirement: 0,
                MaximumAgeInMonthsRequirement: 216,
                MinimumWeighInKgRequirement: 0,
                MaximumWeighInKgRequirement: 25,
                MedicalConditionsDescription: "No specific medical conditions required.",
                OtherRequirementsDescription: "Accessible to children of all ages and weights."
            },
            {
                Id: 2,
                Name: "Elderly",
                MinimumAgeInMonthsRequirement: 720,
                MaximumAgeInMonthsRequirement: Infinity,
                MinimumWeighInKgRequirement: 60,
                MaximumWeighInKgRequirement: Infinity,
                MedicalConditionsDescription: "May have pre-existing medical conditions. Consultation recommended.",
                OtherRequirementsDescription: "Accessible to elderly individuals above 60 kg."
            }
        ]
    );

    const handleSelectSpecialRequirement = (selectedSpecialRequirement: string) => {
        const specialRequirement = specialRequirements.find(specialRequirement => specialRequirement.Name === selectedSpecialRequirement);
        if (specialRequirement) {
            setSelectedSpecialRequirement(specialRequirement);
        }
    }

    const handleClearSelection = () => {
        setSelectedSpecialRequirement(null);
    };

    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-1">
                <Label>Special Requirements</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="text-muted-foreground w-4 h-4"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-md">Select any Medical Considerations for this
                                product, such as age restrictions, weight limitations, or specific
                                medical conditions. Leave this field blank if there are no specific
                                medical considerations applicable.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex items-center justify-between space-x-2">
                {selectedSpecialRequirement && (
                    <div>
                        <Button type="button" size="icon" variant="destructive"
                                onClick={handleClearSelection}>
                            <X className="w-4 h-4"/>
                        </Button>
                    </div>
                )}
                <div className="w-full">
                    <Select value={selectedSpecialRequirement?.Name}
                            onValueChange={handleSelectSpecialRequirement}>
                        {specialRequirements.length === 0 ? (
                            <SelectTrigger disabled={true}>
                                No special requirements available, add a new special requirement
                                first.
                            </SelectTrigger>
                        ) : (
                            <SelectTrigger>
                                {selectedSpecialRequirement ? selectedSpecialRequirement.Name : "Select special requirement"}
                            </SelectTrigger>
                        )}
                        <SelectContent position="popper">
                            {specialRequirements.map(requirement => (
                                <SelectItem
                                    onClick={() => setSelectedSpecialRequirement(requirement)}
                                    key={requirement.Id}
                                    value={requirement.Name}
                                >
                                    {requirement.Name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button type="button" variant="outline">Add new requirement</Button>
                </div>
            </div>
        </div>);
};
