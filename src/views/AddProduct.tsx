import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { AddProductDetailsCard } from "@/components/add-product-details-card.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { AttributeSelector } from "@/components/attribute-selector.tsx";
import { Allergy } from "@/types/product-attribute-types.ts";

const StockTypeSchema = z.object({
  warehouseId: z.number(),
  quantity: z.number().min(1, "Quantity must be at least 0"), // Should we require customers to have more than 1?
});

const schema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.any(),
  // strengthMg: z.number(),
  // maxDayFrequency: z.number(),
  // maxSupplyInDaysDays: z.number(),
  // contraindicationsDescription: z.string(),
  // storageConditionDescription: z.string(),
  // specialRequirementsId: z.number(),
  // manufacturerId: z.number(),
  // regulatoryInformationId: z.number(),
  // activeIngredientsIds: z.array(z.number()),
  allergiesIds: z.array(z.number()),
  // dosageFormsIds: z.array(z.number()),
  // indicationsIds: z.array(z.number()),
  // routeOfAdministrationsIds: z.array(z.number()),
  // sideEffectsIds: z.array(z.number()),
  // usageWarningsIds: z.array(z.number()),
  // manufacturingDate: z.date(),
  // expiryDate: z.date(),
  // price: z.number(),
  // costPerItem: z.number(),
  // stocks: z.array(StockTypeSchema),
  // batchNumber: z.string(),
  // barcode: z.string(),
  // packagingWeight: z.number(),
});

type FormData = z.infer<typeof schema>;

const AddProduct = () => {
  const navigate = useNavigate();

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
          <AddProductDetailsCard register={register} errors={errors} />
          <Button className="w-full" type="submit">
            save
          </Button>
        </div>

        <div className="w-full space-y-6 lg:w-1/2">
          <Card className="h-min">
            <CardContent className="mt-4">
              <Controller
                name="allergiesIds"
                control={control}
                render={({ field }) => (
                  <AttributeSelector<Allergy>
                    route="/allergy"
                    name="Allerges"
                    selectedAttributeIds={field.value}
                    setSelectedAttributeIds={field.onChange}
                  />
                )}
              />
            </CardContent>
          </Card>
          {/*{getValues().stocks?.length > 0 && <AddProductInventoryCard />}*/}
          {/*<AddProductPriceCard />*/}
          {/*<AddProductSubscriptionCard />*/}
          {/*<AddProductBatchDetailsCard />*/}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
