import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { DetailsForm } from "@/components/product/forms/DetailsForm.tsx";
import { AttributesForm } from "@/components/product/forms/AttributesForm.tsx";
import { InventoryCard } from "@/components/product/forms/inventory-card.tsx";
import { PriceCard } from "@/components/product/forms/price-card.tsx";
import { SubscriptionCard } from "@/components/product/forms/subscription-card.tsx";
import { BatchCard } from "@/components/product/forms/batch-card.tsx";

const StockTypeSchema = z.object({
  warehouseId: z.number(),
  quantity: z.number(),
});

const schema = z.object({
  name: z.string().min(3, "Product name should be at least (3) characters"),
  description: z
    .string()
    .max(250, "Product description should be max (250) characters"),
  image: z.instanceof(FileList),
  strengthMg: z.number(),
  // maxDayFrequency: z.number(),
  // maxSupplyInDaysDays: z.number(),
  contraindicationsDescription: z.string(),
  storageConditionDescription: z.string(),
  // specialRequirementsId: z.number(),
  // regulatoryInformationId: z.number(),
  activeIngredientsIds: z.array(z.number()),
  allergiesIds: z.array(z.number()),
  dosageFormsIds: z.array(z.number()),
  indicationsIds: z.array(z.number()),
  routeOfAdministrationsIds: z.array(z.number()),
  sideEffectsIds: z.array(z.number()),
  usageWarningsIds: z.array(z.number()),
  manufacturerId: z.number(),
  // manufacturingDate: z.date(),
  // expiryDate: z.date(),
  // price: z
  //   .number({ invalid_type_error: "Price field is required." })
  //   .positive(),
  // costPerItem: z
  //   .number({ invalid_type_error: "Cost per Item field is required." })
  //   .positive(),
  // stocks: z
  //   .array(StockTypeSchema)
  //   .min(1, "At least (1) warehouse should be selected."),
  // batchNumber: z.string(),
  // barcode: z.string(),
  // packagingWeight: z.preprocess((val) => {
  //   if (val === "") {
  //     return undefined;
  //   }
  //   return val;
  // }, z.number().optional()),
});

export type FormData = z.infer<typeof schema>;

const NewProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      activeIngredientsIds: [],
      allergiesIds: [],
      dosageFormsIds: [],
      indicationsIds: [],
      routeOfAdministrationsIds: [],
      sideEffectsIds: [],
      usageWarningsIds: [],
      // stocks: [],
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 mx-auto w-full max-w-screen-lg">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/dashboard/products")}
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-lg font-semibold md:text-2xl">Add Product</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/dashboard/products")} variant="destructive">Discard</Button>
          <Button type="submit">Save</Button>
        </div>
      </div>

      <div className="space-y-6 lg:space-y-0 lg:mx-auto lg:flex lg:max-w-screen-lg lg:gap-6">
        <div className="w-full space-y-6 lg:w-1/2">
          <DetailsForm register={register} errors={errors} />
          <AttributesForm
            register={register}
            control={control}
            errors={errors}
          />
        </div>

        {/*<div className="w-full space-y-6 lg:w-1/2">*/}
        {/*  <InventoryCard*/}
        {/*    register={register}*/}
        {/*    control={control}*/}
        {/*    errors={errors}*/}
        {/*  />*/}
        {/*  <PriceCard*/}
        {/*    register={register}*/}
        {/*    control={control}*/}
        {/*    watch={watch}*/}
        {/*    errors={errors}*/}
        {/*  />*/}
        {/*  <SubscriptionCard />*/}
        {/*  <BatchCard register={register} errors={errors} />*/}
        {/*</div>*/}
      </div>
    </form>
  );
};

export default NewProduct;
