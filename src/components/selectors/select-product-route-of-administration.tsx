import {useState} from "react";
import {Asterisk, CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

export interface RouteOfAdministration {
    Id: number;
    Description: string;
}

interface RouteOfAdminProps {
    onSelectedRoutesOfAdministration: (routes: RouteOfAdministration[]) => void;
    selectedRoutesOfAdministration: RouteOfAdministration[];
}

export const SelectProductRouteOfAdministration = ({onSelectedRoutesOfAdministration, selectedRoutesOfAdministration}: RouteOfAdminProps) => {
    const [routesOfAdministration, setRoutesOfAdministration] = useState<RouteOfAdministration[]>([
        {Id: 1, Description: "Oral"},
        {Id: 2, Description: "Topical"},
        {Id: 3, Description: "Intravenous"},
        {Id: 4, Description: "Subcutaneous"},
    ]);

    const handleSelectRouteOfAdministration = (selectedRoute: string) => {
        const isAlreadySelected = selectedRoutesOfAdministration.some(route => route.Description === selectedRoute);

        if (!isAlreadySelected) {
            const route = routesOfAdministration.find(route => route.Description === selectedRoute);
            if (route) {
                onSelectedRoutesOfAdministration(prevSelected => [...prevSelected, route]);
            }
        }
    };

    const handleRemoveRouteOfAdministration = (routeToRemove: RouteOfAdministration) => {
        onSelectedRoutesOfAdministration(prevSelected => prevSelected.filter(route => route.Id !== routeToRemove.Id));
    };

    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-0.5">
                    <Asterisk className="h-4 w-4 text-red-500"/>
                    <Label>Route of Administration</Label>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="h-4 w-4 text-muted-foreground"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Select the route of administration for the product</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="w-full">
                <Select onValueChange={handleSelectRouteOfAdministration}>
                    {routesOfAdministration.filter(route => !selectedRoutesOfAdministration.some(selected => selected.Id === route.Id)).length === 0 ? (
                        <SelectTrigger disabled={true}>
                            No routes of administration available, add a new route first.
                        </SelectTrigger>
                    ) : (
                        <SelectTrigger>
                            Select route of administration
                        </SelectTrigger>
                    )}
                    <SelectContent position="popper">
                        {routesOfAdministration
                            .filter(route => !selectedRoutesOfAdministration.some(selected => selected.Id === route.Id))
                            .map(route => (
                                <SelectItem
                                    key={route.Id}
                                    value={route.Description}
                                >
                                    {route.Description}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {selectedRoutesOfAdministration.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedRoutesOfAdministration.map(route => (
                        <div key={route.Id}
                             className="flex items-center rounded-full border border-neutral-200 p-1 space-x-0.5 bg-muted">
                            <X className="h-4 w-4 cursor-pointer text-red-500"
                               onClick={() => handleRemoveRouteOfAdministration(route)}/>
                            <div className="text-xs">{route.Description}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
