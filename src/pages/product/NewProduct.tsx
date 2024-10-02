import { useNavigate } from "react-router-dom";
import {
  FieldErrors,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { DetailsForm } from "@/pages/product/forms/DetailsForm.tsx";
import { AttributesForm } from "@/pages/product/forms/AttributesForm.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import { useContext } from "react";
import { InventoryForm } from "@/pages/product/forms/InventoryForm.tsx";
import { PriceForm } from "@/pages/product/forms/PriceForm.tsx";
import { SubscriptionCard } from "@/pages/product/forms/subscription-card.tsx";
import { BatchForm } from "@/pages/product/forms/BatchForm.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { AxiosError } from "axios";
import LoaderContext from "@/context/LoaderContext.tsx";

const StockTypeSchema = z.object({
  warehouseId: z.number(),
  quantity: z.number(),
});

type StockType = z.infer<typeof StockTypeSchema>;

const schema = z.object({
  name: z.string().min(3, "Product name should be at least (3) characters"),
  description: z
    .string()
    .min(3, "Product description should be at least (3) characters")
    .max(250, "Product description should be max (250) characters"),
  image: z.instanceof(File).optional(),
  strengthMg: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "Required")
  ),
  contraindicationsDescription: z.string().optional(),
  storageConditionDescription: z.string().optional(),
  specialRequirementsId: z.number().optional(),
  regulatoryInformationId: z.number(),
  activeIngredientsIds: z.array(z.number()).min(1, "Required"),
  allergiesIds: z.array(z.number()).optional(),
  dosageFormsIds: z.array(z.number()).min(1, "Required"),
  indicationsIds: z.array(z.number()).optional(),
  routeOfAdministrationsIds: z.array(z.number()).min(1, "Required"),
  sideEffectsIds: z.array(z.number()).optional(),
  usageWarningsIds: z.array(z.number()).optional(),
  manufacturerId: z.number(),
  manufacturingDate: z
    .union([z.date(), z.string().datetime()])
    .transform((val) => new Date(val)),
  expiryDate: z
    .union([z.date(), z.string().datetime()])
    .transform((val) => new Date(val)),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, "Required")
  ),
  costPerItem: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, "Required")
  ),
  stocks: z
    .array(StockTypeSchema)
    .min(1, "At least (1) warehouse should be selected."),
  batchNumber: z.string(),
  barcode: z.string(),
  packagingWeight: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, "Required")
  ),
});

export type FormData = z.infer<typeof schema>;

const NewProduct = () => {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { setLoading } = useContext(LoaderContext);
  const privateAxios = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
      stocks: [],
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FieldValues) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("strengthMg", data.strengthMg.toString());
      formData.append(
        "contraindicationsDescription",
        data.contraindicationsDescription || ""
      );
      formData.append(
        "storageConditionDescription",
        data.storageConditionDescription || ""
      );
      if (data.specialRequirementsId !== undefined) {
        formData.append(
          "specialRequirementsId",
          data.specialRequirementsId.toString()
        );
      }
      formData.append("manufacturerId", data.manufacturerId.toString());
      formData.append(
        "regulatoryInformationId",
        data.regulatoryInformationId.toString()
      );

      data.activeIngredientsIds.forEach((id: number, index: number) => {
        formData.append(`activeIngredientsIds[${index}]`, id.toString());
      });

      if (data.allergiesIds) {
        data.allergiesIds.forEach((id: number, index: number) => {
          formData.append(`allergiesIds[${index}]`, id.toString());
        });
      }

      data.dosageFormsIds.forEach((id: number, index: number) => {
        formData.append(`dosageFormsIds[${index}]`, id.toString());
      });

      if (data.indicationsIds) {
        data.indicationsIds.forEach((id: number, index: number) => {
          formData.append(`indicationsIds[${index}]`, id.toString());
        });
      }

      data.routeOfAdministrationsIds.forEach((id: number, index: number) => {
        formData.append(`routeOfAdministrationsIds[${index}]`, id.toString());
      });

      if (data.sideEffectsIds) {
        data.sideEffectsIds.forEach((id: number, index: number) => {
          formData.append(`sideEffectsIds[${index}]`, id.toString());
        });
      }

      if (data.usageWarningsIds) {
        data.usageWarningsIds.forEach((id: number, index: number) => {
          formData.append(`usageWarningsIds[${index}]`, id.toString());
        });
      }

      formData.append(
        "manufacturingDate",
        data.manufacturingDate.toISOString()
      );
      formData.append("expiryDate", data.expiryDate.toISOString());
      formData.append("price", data.price.toString());
      formData.append("costPerItem", data.costPerItem.toString());

      data.stocks.forEach((stock: StockType, index: number) => {
        formData.append(
          `stocks[${index}].warehouseId`,
          stock.warehouseId.toString()
        );
        formData.append(`stocks[${index}].quantity`, stock.quantity.toString());
      });

      formData.append("batchNumber", data.batchNumber);
      formData.append("barcode", data.barcode || "");
      formData.append("packagingWeight", data.packagingWeight.toString());

      await privateAxios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/dashboard/products");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const apiError = error.response.data;
          let errorMessage = "An error occurred";

          if (typeof apiError === "object" && apiError !== null) {
            errorMessage =
              apiError.message || apiError.title || JSON.stringify(apiError);
          } else if (typeof apiError === "string") {
            errorMessage = apiError;
          }
          setError(errorMessage);
        } else {
          setError(error.message);
        }
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  const onError: SubmitErrorHandler<FormData> = (errors: FieldErrors) => {
    const errorCount = Object.keys(errors).length;
    setError(
      `Form submission failed. ${errorCount} field(s) are invalidly filled in.`
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="p-6 space-y-6 mx-auto w-full max-w-screen-lg"
    >
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
          <Button
            onClick={() => navigate("/dashboard/products")}
            variant="destructive"
          >
            Discard
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>

      <div className="space-y-6 lg:space-y-0 lg:mx-auto lg:flex lg:max-w-screen-lg lg:gap-6">
        <div className="w-full space-y-6 lg:w-1/2">
          <DetailsForm
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <AttributesForm
            register={register}
            control={control}
            errors={errors}
          />
        </div>

        <div className="w-full space-y-6 lg:w-1/2">
          <InventoryForm
            register={register}
            control={control}
            errors={errors}
          />
          <PriceForm register={register} watch={watch} errors={errors} />
          <SubscriptionCard />
          <BatchForm register={register} errors={errors} />
        </div>
      </div>
    </form>
  );
};

export default NewProduct;
