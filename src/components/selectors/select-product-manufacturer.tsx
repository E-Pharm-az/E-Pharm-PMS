import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Asterisk, CircleHelp} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";

export interface Manufacturer {
    Id: number
    ManufacturerName: string
}

interface Props {
    onSelectedManufacturer: (manufacturers: Manufacturer) => void
    selectedManufacturer: Manufacturer | null
}

export const SelectProductManufacturer = ({onSelectedManufacturer, selectedManufacturer}: Props) => {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>(
        [
            {
                Id: 1,
                ManufacturerName: "Test Manufacturer"
            },
            {
                Id: 2,
                ManufacturerName: "Test Manufacturer 2"
            }
        ]
    );

    const handleSelectManufacturer = (selectedManufacturer: string) => {
        const manufacturer = manufacturers.find(manufacturer => manufacturer.ManufacturerName === selectedManufacturer);
        if (manufacturer) {
            onSelectedManufacturer(manufacturer);
        }
    }

    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-0.5">
                    <Asterisk className="w-4 h-4 text-red-500"/>
                    <Label>Manufacturer</Label>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="text-muted-foreground w-4 h-4"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Select the manufacturer for the product.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex items-center justify-between space-x-2">
                <div className="w-full">
                    <Select onValueChange={handleSelectManufacturer}>
                        {manufacturers.length === 0 ? (
                            <SelectTrigger disabled={true}>
                                No manufacturers available, add a new manufacturer first.
                            </SelectTrigger>
                        ) : (
                            <SelectTrigger>
                                <SelectValue placeholder="Select manufacturer"/>
                            </SelectTrigger>
                        )}
                        <SelectContent position="popper">
                            {manufacturers.map(manufacturer => (
                                <SelectItem
                                    key={manufacturer.Id}
                                    value={manufacturer.ManufacturerName}
                                >
                                    {manufacturer.ManufacturerName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button type="button" variant="outline">Add new manufacturer</Button>
                </div>
            </div>
        </div>);
};
