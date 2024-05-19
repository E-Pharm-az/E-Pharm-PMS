import { Card, CardContent } from "@/components/ui/card.tsx";
import { Asterisk } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
  register: any;
  errors: any;
}

export const AddProductDetailsCard = ({ register, errors }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const { ref: registerRef, ...rest } = register("image");

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    const urlImage = URL.createObjectURL(files[0]);

    setPreview(urlImage);
  };

  const handleButtonClick = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  return (
    <Card>
      <CardContent className="mt-4">
        <div className="grid w-full items-center gap-6">
          <div className="grid w-full gap-2">
            <div className="flex items-center space-x-0.5">
              <Asterisk className="h-4 w-4 text-red-500" />
              <Label>Name</Label>
            </div>
            <Input {...register("name")} placeholder="Name of your product" />
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div className="grid w-full gap-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Enter your product description here."
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

          <div className="w-full gap-2 grid">
            <Label>Image</Label>
            <div className="flex items-center justify-center rounded border border-dashed border-gray-300 min-h-[160px] max-h-[300px] overflow-hidden relative">
              {preview ? (
                <>
                  <Button
                    variant="destructive"
                    className="absolute bottom-2 left-2"
                    onClick={() => setPreview(null)}
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
                <>
                  <Button variant="outline" onClick={handleButtonClick}>
                    Upload new
                  </Button>
                  <input
                    type="file"
                    {...rest}
                    className="hidden"
                    onChange={handleUploadedFile}
                    ref={(e) => {
                      registerRef(e);
                      hiddenInputRef.current = e;
                    }}
                  />
                </>
              )}
            </div>
            {errors.image && <span>{errors.image.message}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
