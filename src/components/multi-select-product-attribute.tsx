import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Asterisk, CircleHelp, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export interface ProductAttribute {
  id: number;
  name: string;
}

interface SelectProductAttributeProps<T extends ProductAttribute> {
  isRequired: boolean;
  isCreatable?: boolean; // Can a user create this attribute
  route: string;
  name: string;
  info?: string;
  selectedAttributes: T[];
  setSelectedAttributes: (attributes: (prevSelected: T[]) => T[]) => void;
}

export const MultiSelectProductAttribute = <T extends ProductAttribute>({
  isRequired,
  isCreatable,
  route,
  name,
  info,
  selectedAttributes,
  setSelectedAttributes,
}: SelectProductAttributeProps<T>) => {
  const axiosPrivate = useAxiosPrivate();
  const [attributes, setAttributes] = useState<T[]>([]);
  const [selected] = useState<string>("");

  const handleSelectAttribute = (selectedAttribute: string) => {
    const isAlreadySelected = selectedAttributes.some(
      (t) => t.name === selectedAttribute,
    );

    if (!isAlreadySelected) {
      const attribute = attributes.find((t) => t.name === selectedAttribute);
      setSelectedAttributes((prevSelected: T) => [...prevSelected, attribute]);
    }
  };

  const handleRemoveAttribute = (attributeToRemove: T) => {
    setSelectedAttributes((prevSelected: T[]) =>
      prevSelected.filter((t) => t.id !== attributeToRemove.id),
    );
  };

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
      <Select value={selected} onValueChange={handleSelectAttribute}>
        {attributes.filter(
          (t) => !selectedAttributes.some((selected) => selected.id === t.id),
        ).length === 0 ? (
          <SelectTrigger disabled={true}>No {name} available</SelectTrigger>
        ) : (
          <SelectTrigger>Select {name}</SelectTrigger>
        )}
        <SelectContent position="popper">
          {attributes
            .filter(
              (t) =>
                !selectedAttributes.some((selected) => selected.id === t.id),
            )
            .map((t) => (
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
      {selectedAttributes.length > 0 && (
        <div className="flex items-center space-x-2">
          {selectedAttributes.map((t) => (
            <div
              key={t.id}
              className="flex items-center rounded-full border border-neutral-200 p-2 space-x-1 bg-muted"
            >
              <X
                className="h-4 w-4 cursor-pointer rounded-full bg-red-500 text-white"
                onClick={() => handleRemoveAttribute(t)}
              />
              <div className="text-xs font-medium">{t.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
