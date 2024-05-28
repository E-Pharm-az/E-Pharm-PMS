import { useNavigate } from "react-router-dom";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { DetailsCard } from "@/views/product/cards/details-card.tsx";
import { PriceCard } from "@/views/product/cards/price-card.tsx";
import { SubscriptionCard } from "@/views/product/cards/subscription-card.tsx";
import { BatchCard } from "@/views/product/cards/batch-card.tsx";
import { InventoryCard } from "@/views/product/cards/inventory-card.tsx";
import {AttributesCard} from "@/views/product/cards/attributes-card.tsx";

const StockTypeSchema = z.object({
  warehouseId: z.number(),
  quantity: z.number(),
});

const schema = z.object({
  name: z.string().min(3, "Product name should be at least (3) characters"),
  description: z.string().max(250, "Product description should be max (250) characters"),
  image: z.instanceof(FileList),
  strengthMg: z.number(),
  // maxDayFrequency: z.number(),
  // maxSupplyInDaysDays: z.number(),
  contraindicationsDescription: z.string(),
  storageConditionDescription: z.string(),
  // specialRequirementsId: z.number(),
  // manufacturerId: z.number(),
  // regulatoryInformationId: z.number(),
  // activeIngredientsIds: z.array(z.number()),
  // allergiesIds: z.array(z.number()),
  // dosageFormsIds: z.array(z.number()),
  // indicationsIds: z.array(z.number()),
  // routeOfAdministrationsIds: z.array(z.number()),
  // sideEffectsIds: z.array(z.number()),
  // usageWarningsIds: z.array(z.number()),
  // manufacturingDate: z.date(),
  // expiryDate: z.date(),
  price: z.number({invalid_type_error: "Price field is required."}).positive(),
  costPerItem: z.number({invalid_type_error: "Cost per Item field is required."}).positive(),
  stocks: z
    .array(StockTypeSchema)
    .min(1, "At least (1) warehouse should be selected."),
  batchNumber: z.string(),
  barcode: z.string(),
  packagingWeight: z.preprocess((val) => {
    if (val === '') {
      return undefined;
    }
    return val;
  }, z.number().optional()),
});

export type FormData = z.infer<typeof schema>;

const AddProduct = () => {
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
      // activeIngredientsIds: [],
      // allergiesIds: [],
      // dosageFormsIds: [],
      // indicationsIds: [],
      // routeOfAdministrationsIds: [],
      // sideEffectsIds: [],
      // usageWarningsIds: [],
      stocks: [],
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data: FieldValues) => {
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
          <AttributesCard register={register} control={control} errors={errors} />
          <Button className="w-full" type="submit">
            save
          </Button>
        </div>

        <div className="w-full space-y-6 lg:w-1/2">
          <InventoryCard
            register={register}
            control={control}
            errors={errors}
          />
          <PriceCard register={register} control={control} watch={watch} errors={errors} />
          <SubscriptionCard />
          <BatchCard register={register} errors={errors} />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
