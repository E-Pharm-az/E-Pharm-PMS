import {Card, CardContent} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx"
import {ArrowLeft, Asterisk, CalendarIcon, CircleHelp} from "lucide-react";
import {SelectProductWarehouse, Warehouse} from "@/components/selectors/select-product-warehouse.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {format} from "date-fns";
import {cn} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";
import {ProductAttribute, SelectProductAttribute} from "@/components/select-product-attribute.tsx";


const AddProduct = () => {
    const navigate = useNavigate();

    const [selectedWarehouses, setSelectedWarehouses] = useState<Warehouse[]>([]);
    const [productExpiryDate, setProductExpiryDate] = useState<Date | undefined>(new Date())

    interface ActiveIngredient extends ProductAttribute {
        Id: number
        Name: string
    }

    interface Allergy extends ProductAttribute {
        Id: number;
        Name: string;
    }

    const [selectedActiveIngredients, setSelectedActiveIngredients] = useState<ActiveIngredient[]>([]);
    const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([]);

    return (
        <>
            <div className="flex items-center max-w-screen-lg space-x-2 justify-start mx-auto w-full">
                <Button size="icon" variant="ghost" onClick={() => navigate("/dashboard/products")}><ArrowLeft/></Button>
                <h1 className="text-lg font-semibold md:text-2xl">Add Product</h1>
            </div>
            <div className="lg:flex gap-6 lg:max-w-screen-lg lg:mx-auto">
                <Card className="lg:w-1/2 w-full">
                    <CardContent className="mt-4">
                        <form className="grid w-full items-center gap-6">
                            {/*Product Name*/}
                            <div className="grid w-full gap-2">
                                <div className="flex items-center space-x-0.5">
                                    <Asterisk className="h-4 w-4 text-red-500"/>
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

                            {/*Product Image*/}
                            <div className="w-full gap-2 gird">
                                <Label>Image</Label>
                                <div
                                    className="flex items-center justify-center rounded border border-dashed border-gray-300 h-[160px]">
                                    <Button type="button" variant="outline">
                                        Upload new
                                    </Button>
                                </div>
                            </div>

                            {/*Product strength*/}
                            <div className="grid w-full gap-2">
                                <div className="flex items-center space-x-0.5">
                                    <Asterisk className="h-4 w-4 text-red-500"/>
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

                            <SelectProductAttribute isRequired={false} route="/active-ingredient"
                                                    name="Active ingredient"
                                                    selectedAttributes={selectedActiveIngredients}
                                                    setSelectedAttributes={setSelectedActiveIngredients}/>

                            <SelectProductAttribute isRequired={false} route="/allergy" name="Allergy"
                                                    selectedAttributes={selectedAllergies}
                                                    setSelectedAttributes={setSelectedAllergies}/>

                            <SelectProductAttribute isRequired={false} route="/allergy" name="Dosage form"
                                                    selectedAttributes={selectedAllergies}
                                                    setSelectedAttributes={setSelectedAllergies}/>

                            <SelectProductAttribute isRequired={false} route="/allergy" name="Indication"
                                                    selectedAttributes={selectedAllergies}
                                                    setSelectedAttributes={setSelectedAllergies}/>

                            <SelectProductAttribute isRequired={false} route="/allergy" name="Route of administrationsIds"
                                                    selectedAttributes={selectedAllergies}
                                                    setSelectedAttributes={setSelectedAllergies}/>

                            <SelectProductAttribute isRequired={false} route="/allergy" name="Side effect"
                                                    selectedAttributes={selectedAllergies}
                                                    setSelectedAttributes={setSelectedAllergies}/>

                            <SelectProductAttribute isRequired={false} route="/allergy" name="Usage Warning"
                                                    selectedAttributes={selectedAllergies}
                                                    setSelectedAttributes={setSelectedAllergies}/>

                            <div className="grid w-full gap-2">
                                <div className="flex items-center space-x-0.5">
                                    <Asterisk className="h-4 w-4 text-red-500"/>
                                    <Label>Expiry Date</Label>
                                </div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !productExpiryDate && "text-muted-foreground"
                                            )}
                                        >
                                            {productExpiryDate ? (
                                                format(productExpiryDate, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={productExpiryDate}
                                            onSelect={setProductExpiryDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/*Product Spec*/}
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
                        </form>
                    </CardContent>
                </Card>
                <div className="lg:w-1/2 w-full space-y-6">
                    <Card className="h-min">
                        <CardContent className="mt-4">
                            <form className="grid w-full items-center gap-6">
                                <SelectProductWarehouse selectedWarehouses={selectedWarehouses}
                                                        onSelectedWarehouses={setSelectedWarehouses}/>

                            </form>
                        </CardContent>
                    </Card>

                    {selectedWarehouses.length > 0 && (
                        <Card className="h-min">
                            <CardContent className="mt-4">
                                <form className="grid w-full items-center gap-6">
                                    <div className="grid w-full gap-2">
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
                                                                    <CircleHelp className="h-4 w-4"/>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Enter the product's quantity
                                                                        for {warehouse.Name}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="h-min">
                        <CardContent className="mt-4">
                            <form className="grid w-full items-center gap-6">
                                {/*Product Price*/}
                                <div className="grid w-full items-center gap-2">
                                    <div className="flex w-full items-center gap-2">
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
                                                                <CircleHelp className="h-4 w-4"/>
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
                                    <div className="flex w-full items-center gap-2">
                                        <div className="w-1/2">
                                            <Label>Profit</Label>
                                            <div
                                                className="flex h-10 w-full rounded-md file:border-0 border file:bg-transparent px-3 py-2 text-sm file:text-sm file:font-medium border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                                --
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <Label>Margin</Label>
                                            <div
                                                className="flex h-10 w-full rounded-md file:border-0 border file:bg-transparent px-3 py-2 text-sm file:text-sm file:font-medium border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                --
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default AddProduct;