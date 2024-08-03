import { ChangeEvent, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Asterisk } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormData } from "@/components/product/NewProduct";
import { FormInput } from "@/components/ui/form-input";

interface Props {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
}

export const DetailsForm = ({ register, setValue, errors }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const handleButtonClick = () => hiddenInputRef.current?.click();

  const handleRemoveImage = () => {
    setPreview(null);
    setValue("image", undefined);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = "";
    }
  };

  const renderImageUpload = () => (
    <div className="w-full gap-2 grid">
      <Label>Image</Label>
      <div className="flex items-center justify-center rounded border border-dashed border-gray-300 min-h-[160px] max-h-[300px] overflow-hidden relative">
        {preview ? (
          <>
            <Button
              variant="destructive"
              className="absolute bottom-2 left-2"
              onClick={handleRemoveImage}
            >
              Remove
            </Button>
            <img
              src={preview}
              alt="Selected Image"
              className="max-w-full max-h-full pointer-events-none"
            />
          </>
        ) : (
          <Button disabled={true} variant="outline" onClick={handleButtonClick}>
            Upload new (coming soon)
          </Button>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUploadedFile}
          ref={hiddenInputRef}
        />
      </div>
      {errors.image && (
        <p className="text-red-500 text-xs">{errors.image.message}</p>
      )}
    </div>
  );

  return (
    <Card>
      <CardContent className="mt-4">
        <div className="grid w-full items-center gap-6">
          <div className="grid w-full gap-2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label htmlFor="name">Name</Label>
            </div>
            <FormInput
              id="name"
              {...register("name")}
              placeholder="Name of your product"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="grid w-full gap-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Enter your product description here."
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>
          {renderImageUpload()}
        </div>
      </CardContent>
    </Card>
  );
};