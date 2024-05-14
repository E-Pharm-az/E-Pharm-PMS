import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Asterisk, CircleHelp, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { ProductAttribute } from "@/components/multi-select-product-attribute.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";

interface SelectProductAttributeProps<T extends ProductAttribute> {
  isRequired: boolean;
  isCreatable?: boolean; // Can a user create this attribute
  route: string;
  name: string;
  info?: string;
  selectedAttribute: T | null;
  setSelectedAttribute: Dispatch<SetStateAction<T | null>>;
}

export const SingleSelectProductAttribute = <T extends ProductAttribute>({
  isRequired = false,
  isCreatable,
  route,
  name,
  info,
  selectedAttribute,
  setSelectedAttribute,
}: SelectProductAttributeProps<T>) => {
  const axiosPrivate = useAxiosPrivate();
  const [attributes, setAttributes] = useState<T[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get<T[]>(route);
        setAttributes(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [axiosPrivate, route]);

  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-0.5">
          {isRequired && <Asterisk className="h-4 w-4 text-red-500" />}
          <Label>{name}</Label>
        </div>
        {info && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button">
                <CircleHelp className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{info}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Select
        key={selectedAttribute?.id}
        value={selectedAttribute?.name}
        onValueChange={(value: string) =>
          setSelectedAttribute(value as unknown as T)
        }
      >
        {attributes.length === 0 ? (
          <SelectTrigger disabled={true}>No {name} available</SelectTrigger>
        ) : (
          <SelectTrigger>
            <SelectValue placeholder={`Select ${name}`} />
          </SelectTrigger>
        )}
        <SelectContent position="popper">
          {attributes.map((t) => (
            <SelectItem key={t.id} value={t.name}>
              {t.name}
            </SelectItem>
          ))}
          {isCreatable && (
            <>
              <Separator className="my-2" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Plus className="h-4 w-4" />
                <p>Add new {name}</p>
              </Button>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
