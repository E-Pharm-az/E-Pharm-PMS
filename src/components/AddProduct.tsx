import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {Asterisk, CalendarIcon, CircleHelp} from "lucide-react";
import {SelectProductRequirement} from "@/components/selectors/select-product-requirement.tsx";
import {SelectProductWarehouse, Warehouse} from "@/components/selectors/select-product-warehouse.tsx";
import {Manufacturer, SelectProductManufacturer} from "@/components/selectors/select-product-manufacturer.tsx";
import {ActiveIngredient, SelectProductIngredients} from "@/components/selectors/select-product-ingredients.tsx";
import {Allergy, SelectProductAllergies} from "@/components/selectors/select-product-allergies.tsx";
import {DosageForm, SelectProductDosageForms} from "@/components/selectors/select-product-dosage-form.tsx";
import {Indication, SelectProductIndications} from "@/components/selectors/select-product-indications.tsx";
import {
    RouteOfAdministration,
    SelectProductRouteOfAdministration
} from "@/components/selectors/select-product-route-of-administration.tsx";
import {SelectProductSideEffects, SideEffect} from "@/components/selectors/select-product-side-effect.tsx";
import {SelectProductUsageWarnings, UsageWarning} from "@/components/selectors/select-product-usage-warning.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {format} from "date-fns";
import {cn} from "@/lib/utils.ts";


const AddProduct = () => {
    const [selectedWarehouses, setSelectedWarehouses] = useState<Warehouse[]>([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null);
    const [selectedActiveIngredients, setSelectedActiveIngredients] = useState<ActiveIngredient[]>([]);
    const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([]);
    const [selectedDosageForms, setSelectedDosageForms] = useState<DosageForm[]>([]);
    const [selectedIndication, setSelectedIndication] = useState<Indication[]>([]);
    const [selectedRouteOfAdministration, setSelectedRouteOfAdministration] = useState<RouteOfAdministration[]>([]);
    const [selectedSideEffects, setSelectedSideEffects] = useState<SideEffect[]>([]);
    const [selectedUsageWarnings, setSelectedUsageWarnings] = useState<UsageWarning[]>([]);
    const [productExpiaryDate, setProductExpiaryDate] = useState<Date | undefined>(new Date())

    return (
        <div className=" md:flex md:justify-center my-0 md:my-4">
            <Card className="md:w-[700px]">
                <CardHeader>
                    <CardTitle>Add Product</CardTitle>
                    <CardDescription>Add your new product in few simple steps.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-6">
                            {/*Product Name*/}
                            <div className="grid w-full gap-2">
                                <div className="flex items-center space-x-0.5">
                                    <Asterisk className="w-4 h-4 text-red-500"/>
                                    <Label>Name</Label>
                                </div>
                                <Input placeholder="Name of your product"/>
                            </div>

                            {/*Product Description*/}
                            <div className="grid w-full gap-2">
                                <Label>Description</Label>
                                <Textarea placeholder="Enter your product description here."/>
                            </div>

                            {/*Warehouse*/}
                            <SelectProductWarehouse selectedWarehouses={selectedWarehouses}
                                                    onSelectedWarehouses={setSelectedWarehouses}/>

                            {/*Product Image*/}
                            <div className="gird w-full gap-2">
                                <Label>Image</Label>
                                <div
                                    className="border-dashed border rounded border-gray-300 h-[160px] justify-center items-center flex">
                                    <Button type="button" variant="outline">Upload
                                        new</Button>
                                </div>
                            </div>

                            {/*Product strength*/}
                            <div className="grid w-full gap-2">
                                <div className="flex items-center space-x-0.5">
                                    <Asterisk className="w-4 h-4 text-red-500"/>
                                    <Label>Strength (mg)</Label>
                                </div>
                                <Input type="number" placeholder="Strength in milligrams"/>
                            </div>

                            {/*Product consumption frequency*/}
                            <div className="flex w-full gap-2">
                                <div className="w-full">
                                    <Label>Maximum Daily Frequency</Label>
                                    <Input type="number" placeholder="0"/>
                                </div>
                                <div className="w-full">
                                    <Label>Maximum Supply in Days</Label>
                                    <Input type="number" placeholder="0"/>
                                </div>
                            </div>

                            {/*Product Contraindications*/}
                            <div className="grid w-full gap-2">
                                <Label>Contraindications Description</Label>
                                <Textarea placeholder="Description of contraindications"/>
                            </div>

                            {/*Product Storage Conditions*/}
                            <div className="grid w-full gap-2">
                                <Label>Storage Condition Description</Label>
                                <Textarea placeholder="Description of storage conditions"/>
                            </div>

                            <SelectProductRequirement/>

                            <SelectProductManufacturer onSelectedManufacturer={setSelectedManufacturer}
                                                       selectedManufacturer={selectedManufacturer}/>

                            <SelectProductIngredients onSelectedActiveIngredients={setSelectedActiveIngredients}
                                                      selectedActiveIngredients={selectedActiveIngredients}/>

                            <SelectProductAllergies onSelectedAllergies={setSelectedAllergies}
                                                    selectedAllergies={selectedAllergies}/>

                            <SelectProductDosageForms onSelectedDosageForms={setSelectedDosageForms}
                                                      selectedDosageForms={selectedDosageForms}/>

                            <SelectProductIndications onSelectedIndications={setSelectedIndication}
                                                      selectedIndications={selectedIndication}/>

                            <SelectProductRouteOfAdministration
                                onSelectedRoutesOfAdministration={setSelectedRouteOfAdministration}
                                selectedRoutesOfAdministration={selectedRouteOfAdministration}/>

                            <SelectProductSideEffects onSelectedSideEffects={setSelectedSideEffects}
                                                      selectedSideEffects={selectedSideEffects}/>

                            <SelectProductUsageWarnings onSelectedUsageWarnings={setSelectedUsageWarnings}
                                                        selectedUsageWarnings={selectedUsageWarnings}/>

                            {/*Product Expiry Date*/}
                            <div className="grid w-full gap-2">
                                <div className="flex items-center space-x-0.5">
                                    <Asterisk className="w-4 h-4 text-red-500"/>
                                    <Label>Expiry Date</Label>
                                </div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !productExpiaryDate && "text-muted-foreground"
                                            )}
                                        >
                                            {productExpiaryDate ? (
                                                format(productExpiaryDate, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={productExpiaryDate}
                                            onSelect={setProductExpiaryDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/*Product Price*/}
                            <div className="grid w-full items-center gap-2">
                                <div className="w-full gap-2 flex items-center">
                                    <div className="w-1/2">
                                        <Label>Price</Label>
                                        <Input type="number" placeholder="₼ 0.00"/>
                                    </div>
                                    <div className="w-1/2">
                                        <Label>Cost Per Item</Label>
                                        <div className="relative">
                                            <Input type="number" inputMode="numeric" placeholder="₼ 0.00"/>
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger type="button">
                                                            <CircleHelp className="w-4 h-4"/>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Enter the cost of this item for profit and margin
                                                                calculations.</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full gap-2 flex items-center">
                                    <div className="w-1/2">
                                        <Label>Profit</Label>
                                        <div
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                            --
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <Label>Margin</Label>
                                        <div
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            --
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Product Inventory*/}
                            {selectedWarehouses.length > 0 && (
                                <div className="w-full gap-2 grid">
                                    <Label>Inventory</Label>
                                    {selectedWarehouses.map(warehouse => (
                                        <div className="flex items-center justify-between">
                                            <Label>{warehouse.Name} Quantity</Label>
                                            <div className="relative 1/3">
                                                <Input type="number" inputMode="numeric" placeholder="0"/>
                                                <div
                                                    className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger type="button">
                                                                <CircleHelp className="w-4 h-4"/>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Enter the product's quantity for {warehouse.Name}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center space-x-2">
                                <div className="grid w-full gap-2">
                                    <Label>Batch Number</Label>
                                    <Input placeholder="#ABC12345"/>
                                </div>
                                <div className="grid w-full gap-2">
                                    <Label>Barcode</Label>
                                    <Input placeholder="012345678901"/>
                                </div>
                                <div className="grid w-full gap-2">
                                    <Label>Weight</Label>
                                    <Input type="number" placeholder="0.00"/>
                                </div>
                            </div>

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Add product</Button>
                </CardFooter>
            </Card>

        </div>
    );
};

export default AddProduct;