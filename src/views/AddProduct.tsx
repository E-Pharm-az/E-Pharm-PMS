import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, CircleHelp } from "lucide-react";
import { DetailsCard } from "@/components/cards/details-card.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { AttributeSelector } from "@/components/attribute-selector.tsx";
import { Allergy, Warehouse } from "@/types/product-attribute-types.ts";
import { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {PriceCard} from "@/components/cards/price-card.tsx";

const StockTypeSchema = z.object({
  warehouseId: z.number(),
  quantity: z.number().min(1, "Quantity must be at least 0"), // Should we require customers to have more than 1?
});

const schema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.any(),
  strengthMg: z.number(),
  maxDayFrequency: z.number(),
  maxSupplyInDaysDays: z.number(),
  contraindicationsDescription: z.string(),
  storageConditionDescription: z.string(),
  specialRequirementsId: z.number(),
  manufacturerId: z.number(),
  regulatoryInformationId: z.number(),
  activeIngredientsIds: z.array(z.number()),
  allergiesIds: z.array(z.number()),
  dosageFormsIds: z.array(z.number()),
  indicationsIds: z.array(z.number()),
  routeOfAdministrationsIds: z.array(z.number()),
  sideEffectsIds: z.array(z.number()),
  usageWarningsIds: z.array(z.number()),
  manufacturingDate: z.date(),
  expiryDate: z.date(),
  price: z.number(),
  costPerItem: z.number(),
  stocks: z.array(StockTypeSchema),
  batchNumber: z.string(),
  barcode: z.string(),
  packagingWeight: z.number(),
});

type FormData = z.infer<typeof schema>;

const AddProduct = () => {
  const navigate = useNavigate();
  const [selectedWarehousesIds, setSelectedWarehousesIds] = useState<number[]>(
    [],
  );

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      allergiesIds: [],
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 lg:space-y-0 lg:mx-auto lg:flex lg:max-w-screen-lg lg:gap-6"
      >
        <div className="w-full space-y-6 lg:w-1/2">
          <DetailsCard register={register} errors={errors} />
          <Button className="w-full" type="submit">
            save
          </Button>
        </div>

        <div className="w-full space-y-6 lg:w-1/2">
          <Card className="h-min">
            <CardContent className="mt-4">
              <AttributeSelector<Allergy>
                route={`/warehouse/${1}/warehouse`}
                name="Warehouse"
                selectedAttributeIds={selectedWarehousesIds}
                setSelectedAttributeIds={setSelectedWarehousesIds}
              />
            </CardContent>
          </Card>

          <PriceCard register={register} errors={errors}/>

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
      </form>
    </div>
  );
};

export default AddProduct;
