import {useState} from "react";
import {Asterisk, CircleHelp, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

export interface RouteOfAdministration {
    Id: number;
    RouteName: string;
}

interface RouteOfAdminProps {
    onSelectedRoutesOfAdministration: (routes: RouteOfAdministration[]) => void;
    selectedRoutesOfAdministration: RouteOfAdministration[];
}

export const SelectProductRouteOfAdministration = ({
                                                       onSelectedRoutesOfAdministration,
                                                       selectedRoutesOfAdministration
                                                   }: RouteOfAdminProps) => {
    const [routesOfAdministration, setRoutesOfAdministration] = useState<RouteOfAdministration[]>([
        {Id: 1, RouteName: "Oral"},
        {Id: 2, RouteName: "Topical"},
        {Id: 3, RouteName: "Intravenous"},
        {Id: 4, RouteName: "Subcutaneous"},
    ]);

    const handleSelectRouteOfAdministration = (selectedRoute: string) => {
        const isAlreadySelected = selectedRoutesOfAdministration.some(route => route.RouteName === selectedRoute);

        if (!isAlreadySelected) {
            const route = routesOfAdministration.find(route => route.RouteName === selectedRoute);
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
                    <Asterisk className="w-4 h-4 text-red-500"/>
                    <Label>Route of Administration</Label>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <CircleHelp className="text-muted-foreground w-4 h-4"/>
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
                                    value={route.RouteName}
                                >
                                    {route.RouteName}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {selectedRoutesOfAdministration.length > 0 && (
                <div className="flex items-center space-x-2">
                    {selectedRoutesOfAdministration.map(route => (
                        <div key={route.Id}
                             className="flex items-center space-x-0.5 bg-muted border rounded-full p-1 border-neutral-200">
                            <X className="w-4 h-4 text-red-500 cursor-pointer"
                               onClick={() => handleRemoveRouteOfAdministration(route)}/>
                            <div className="text-xs ">{route.RouteName}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
