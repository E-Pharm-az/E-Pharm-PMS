import { useNavigate } from "react-router-dom";
import {FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { DetailsForm } from "@/components/product/forms/DetailsForm.tsx";
import { AttributesForm } from "@/components/product/forms/AttributesForm.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import {useContext} from "react";
import {InventoryForm} from "@/components/product/forms/InventoryForm.tsx";
import {PriceForm} from "@/components/product/forms/PriceForm.tsx";
import {SubscriptionCard} from "@/components/product/forms/subscription-card.tsx";
import {BatchForm} from "@/components/product/forms/BatchForm.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import {AxiosError} from "axios";
import LoaderContext from "@/context/LoaderContext.tsx";

const StockTypeSchema = z.object({
  warehouseId: z.number(),
  quantity: z.number(),
});

const schema = z.object({
  name: z.string().min(3, "Product name should be at least (3) characters"),
  description: z
    .string()
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
    z.number().min(0, "Rkkequired")
  ),
  stocks: z
    .array(StockTypeSchema)
    .min(1, "At least (1) warehouse should be selected."),
  batchNumber: z.string(),
  barcode: z.string(),
  packagingWeight: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0).optional(),
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

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      Object.keys(data).forEach((key) => {
        if (key !== "image") {
          const value = data[key as keyof FormData];
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              // Handle array fields
              value.forEach((item, index) => {
                if (typeof item === "object" && item !== null) {
                  // Handle nested objects (like stocks)
                  Object.keys(item).forEach((nestedKey) => {
                    formData.append(`${key}[${index}].${nestedKey}`, item[nestedKey]);
                  });
                } else {
                  formData.append(`${key}[]`, item.toString());
                }
              });
            } else if (value instanceof Date) {
              formData.append(key, value.toISOString());
            } else {
              formData.append(key, value.toString());
            }
          }
        }
      });

      await privateAxios.post("/product", formData);
      navigate("/dashboard/products");
    }
    catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response?.data);
        }
        else {
          setError(error.message);
        }
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  }

  const onError: SubmitErrorHandler<FormData> = (errors: FieldErrors) => {
    const errorCount = Object.keys(errors).length;
    setError(`Form submission failed. ${errorCount} field(s) are invalidly filled in.`);
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
          <DetailsForm register={register} errors={errors}  setValue={setValue}/>
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
          <PriceForm
            register={register}
            control={control}
            watch={watch}
            errors={errors}
          />
          <SubscriptionCard />
          <BatchForm register={register} errors={errors} />
        </div>
      </div>
    </form>
  );
};

export default NewProduct;
