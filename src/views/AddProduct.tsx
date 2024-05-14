import { Card, CardContent } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { ArrowLeft, Asterisk, CalendarIcon, CircleHelp } from "lucide-react";
import {
  SelectProductWarehouse,
  Warehouse,
} from "@/components/select-product-warehouse.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { format } from "date-fns";
import { cn } from "@/lib/utils.ts";
import { useNavigate } from "react-router-dom";
import {
  MultiSelectProductAttribute,
  ProductAttribute,
} from "@/components/multi-select-product-attribute.tsx";
import { SingleSelectProductAttribute } from "@/components/single-select-product-attribute.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Badge } from "@/components/ui/badge.tsx";

interface ActiveIngredient extends ProductAttribute {
  id: number;
  name: string;
}

interface Allergy extends ProductAttribute {
  id: number;
  name: string;
}

interface DosageForm extends ProductAttribute {
  id: number;
  name: string;
}

interface Indication extends ProductAttribute {
  id: number;
  name: string;
}

interface RouteOfAdministration extends ProductAttribute {
  id: number;
  name: string;
}

interface SideEffect extends ProductAttribute {
  id: number;
  name: string;
}

interface UsageWarning extends ProductAttribute {
  id: number;
  name: string;
}

export interface Manufacturer extends ProductAttribute {
  id: number;
  name: string;
}

const AddProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [selectedWarehouses, setSelectedWarehouses] = useState<Warehouse[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer | null>(null);
  const [productExpiryDate, setProductExpiryDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedActiveIngredients, setSelectedActiveIngredients] = useState<
    ActiveIngredient[]
  >([]);
  const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([]);
  const [selectedDosageForms, setSelectedDosageForms] = useState<DosageForm[]>(
    [],
  );
  const [selectedIndications, setSelectedIndications] = useState<Indication[]>(
    [],
  );
  const [selectedRouteOfAdministrations, setSelectedRouteOfAdministrations] =
    useState<RouteOfAdministration[]>([]);
  const [selectedSideEffects, setSelectedSideEffects] = useState<SideEffect[]>(
    [],
  );
  const [selectedUsageWarnings, setSelectedUsageWarnings] = useState<
    UsageWarning[]
  >([]);

  return (
    <div className="p-6 space-y-6">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-start space-x-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => navigate("/dashboard/products")}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-semibold md:text-2xl">Add Product</h1>
      </div>
      <div className="space-y-6 lg:space-y-0 lg:mx-auto lg:flex lg:max-w-screen-lg lg:gap-6">
        <div className="w-full space-y-6 lg:w-1/2">
          <Card>
            <CardContent className="mt-4">
              <div className="grid w-full items-center gap-6">
                <div className="grid w-full gap-2">
                  <div className="flex items-center space-x-0.5">
                    <Asterisk className="h-4 w-4 text-red-500" />
                    <Label>Name</Label>
                  </div>
                  <Input placeholder="Name of your product" />
                </div>

                <div className="grid w-full gap-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter your product description here." />
                </div>

                <div className="w-full gap-2 grid">
                  <Label>Image</Label>
                  <div className="flex items-center justify-center rounded border border-dashed border-gray-300 min-h-[160px] max-h-[300px] overflow-hidden relative">
                    {imageUrl ? (
                      <>
                        <Button
                          className="absolute bottom-2 left-2"
                          onClick={() => setImageUrl(null)}
                        >
                          Remove
                        </Button>
                        <img
                          src={imageUrl}
                          alt="Selected Image"
                          className="max-w-full max-h-full pointer-events-none"
                        />
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={handleButtonClick}>
                          Upload new
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="mt-4">
              <form className="grid w-full items-center gap-6">
                <div className="grid w-full gap-2">
                  <div className="flex items-center space-x-0.5">
                    <Asterisk className="h-4 w-4 text-red-500" />
                    <Label>Strength (mg)</Label>
                  </div>
                  <Input type="number" placeholder="Strength in milligrams" />
                </div>

                <div className="grid w-full gap-2">
                  <Label>Contraindications Description</Label>
                  <Textarea placeholder="Description of contraindications" />
                </div>

                <div className="grid w-full gap-2">
                  <Label>Storage Condition Description</Label>
                  <Textarea placeholder="Description of storage conditions" />
                </div>

                <MultiSelectProductAttribute
                  isRequired={true}
                  route={`/active-ingredient/pharma-company/${3}/active-ingredients`}
                  name="Active ingredient"
                  isCreatable={true}
                  selectedAttributes={selectedActiveIngredients}
                  setSelectedAttributes={setSelectedActiveIngredients}
                />

                <MultiSelectProductAttribute
                  isRequired={false}
                  route="/allergy"
                  name="Allergy"
                  selectedAttributes={selectedAllergies}
                  setSelectedAttributes={setSelectedAllergies}
                />

                <MultiSelectProductAttribute
                  isRequired={true}
                  route="/dosageform"
                  name="Dosage form"
                  selectedAttributes={selectedDosageForms}
                  setSelectedAttributes={setSelectedDosageForms}
                />

                <MultiSelectProductAttribute
                  isRequired={false}
                  route="/indication"
                  name="Indication"
                  selectedAttributes={selectedIndications}
                  setSelectedAttributes={setSelectedIndications}
                />

                <MultiSelectProductAttribute
                  isRequired={false}
                  route="/routeofadministration"
                  name="Route of administrations"
                  selectedAttributes={selectedRouteOfAdministrations}
                  setSelectedAttributes={setSelectedRouteOfAdministrations}
                />

                <MultiSelectProductAttribute
                  isRequired={false}
                  route="/sideeffect"
                  name="Side effect"
                  selectedAttributes={selectedSideEffects}
                  setSelectedAttributes={setSelectedSideEffects}
                />

                <MultiSelectProductAttribute
                  isRequired={false}
                  route="/usagewarning"
                  name="Usage Warning"
                  selectedAttributes={selectedUsageWarnings}
                  setSelectedAttributes={setSelectedUsageWarnings}
                />

                <SingleSelectProductAttribute
                  isRequired={true}
                  isCreatable={true}
                  route={`/manufacturer/${3}/manufacturer`}
                  name="Manufacturer"
                  selectedAttribute={selectedManufacturer}
                  setSelectedAttribute={setSelectedManufacturer}
                />

                <div className="grid w-full gap-2">
                  <div className="flex items-center space-x-0.5">
                    <Asterisk className="h-4 w-4 text-red-500" />
                    <Label>Expiry Date</Label>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !productExpiryDate && "text-muted-foreground",
                        )}
                      >
                        {productExpiryDate ? (
                          format(productExpiryDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="w-full space-y-6 lg:w-1/2">
          <Card className="h-min">
            <CardContent className="mt-4">
              <form className="grid w-full items-center gap-6">
                <SelectProductWarehouse
                  selectedWarehouses={selectedWarehouses}
                  onSelectedWarehouses={setSelectedWarehouses}
                />
              </form>
            </CardContent>
          </Card>

          {selectedWarehouses.length > 0 && (
            <Card className="h-min">
              <CardContent className="mt-4">
                <form className="grid w-full items-center gap-6">
                  <div className="grid w-full gap-2">
                    <Label>Inventory</Label>
                    {selectedWarehouses.map((warehouse) => (
                      <div className="flex items-center justify-between">
                        <Label>{warehouse.Name} Quantity</Label>
                        <div className="relative 1/3">
                          <Input
                            type="number"
                            inputMode="numeric"
                            placeholder="0"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger type="button">
                                  <CircleHelp className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    Enter the product's quantity for{" "}
                                    {warehouse.Name}
                                  </p>
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
                <div className="grid w-full items-center gap-2">
                  <div className="flex w-full items-center gap-2">
                    <div className="w-1/2">
                      <Label>Price</Label>
                      <Input type="number" placeholder="₼ 0.00" />
                    </div>
                    <div className="w-1/2">
                      <Label>Cost Per Item</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          inputMode="numeric"
                          placeholder="₼ 0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger type="button">
                                <CircleHelp className="h-4 w-4" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Enter the cost of this item for profit and
                                  margin calculations.
                                </p>
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
                      <div className="flex h-10 w-full rounded-md file:border-0 border file:bg-transparent px-3 py-2 text-sm file:text-sm file:font-medium border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        --
                      </div>
                    </div>
                    <div className="w-1/2">
                      <Label>Margin</Label>
                      <div className="flex h-10 w-full rounded-md file:border-0 border file:bg-transparent px-3 py-2 text-sm file:text-sm file:font-medium border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        --
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="h-min">
            <CardContent className="mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox disabled={true} />
                <Label>Allow subscription ordering</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        When enabled, customers can subscribe to this product
                        for regular, automatic deliveries.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex flex-grow justify-end">
                  <Badge className="text-nowrap">Coming soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="mt-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="grid w-full gap-2">
                    <Label>Batch Number</Label>
                    <Input placeholder="#ABC12345" />
                  </div>
                  <div className="grid w-full gap-2">
                    <Label>Barcode</Label>
                    <Input placeholder="012345678901" />
                  </div>
                  <div className="grid w-full gap-2">
                    <Label>Weight</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
