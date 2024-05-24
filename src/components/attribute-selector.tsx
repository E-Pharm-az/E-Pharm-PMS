import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import {
  Asterisk,
  Check,
  ChevronsUpDown,
  CircleHelp,
  Plus,
  Search,
  X,
} from "lucide-react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { ProductAttribute } from "@/types/product-attribute-types.ts";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

interface SelectAttributeProps<T extends ProductAttribute> {
  isRequired?: boolean;
  isCreatable?: boolean;
  selectLimit?: number;
  route: string;
  name: string;
  info?: string;
  error?: string;
  selectedAttributeIds: number[];
  setSelectedAttributeIds: Dispatch<SetStateAction<number[]>>;
  onAttributesChange?: (attributes: T[] | null) => void; // Acts as a function to get the array of attributes from this component to the parent component
}

export const AttributeSelector = <T extends ProductAttribute>({
  isRequired = false,
  isCreatable,
  selectLimit,
  route,
  name,
  info,
  error,
  selectedAttributeIds,
  setSelectedAttributeIds,
  onAttributesChange,
}: SelectAttributeProps<T>) => {
  const axiosPrivate = useAxiosPrivate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [attributes, setAttributes] = useState<T[] | null>(null);
  const [filteredAttributes, setFilteredAttributes] = useState<T[] | null>(
    null,
  );
  const [showDropdown, setShowDropdown] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    function handleWindowBlur() {
      setShowDropdown(false);
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("blur", handleWindowBlur);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("blur", handleWindowBlur);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [showDropdown]);

  const fetchAttributes = async () => {
    setShowDropdown(!showDropdown);
    if (attributes === null) {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get<T[]>(route);
        setAttributes(response.data);
        setFilteredAttributes(response.data);
        if (onAttributesChange) {
          onAttributesChange(response.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (attributes) {
      const result = attributes.filter((attribute) =>
        attribute.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredAttributes(result);
    }
  }, [query, attributes]);

  const handleSelect = (attributeId: number) => {
    setSelectedAttributeIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(attributeId)) {
        return prevSelectedIds.filter((id) => id !== attributeId);
      }

      if (selectLimit !== undefined && prevSelectedIds.length >= selectLimit) {
        if (selectLimit === 1) {
          return [attributeId]; // Replace the single selected item
        }
        return prevSelectedIds; // Do nothing if limit reached
      }

      return [...prevSelectedIds, attributeId];
    });
  };

  const handleRemove = (attributeId: number) => {
    setSelectedAttributeIds((prevSelectedIds) =>
      prevSelectedIds.filter((id) => id !== attributeId),
    );
  };

  return (
    <div className="w-full space-y-1.5" ref={dropdownRef}>
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
        {error && <Label className="text-red-400">{error}</Label>}
      </div>
      <div className="flex space-x-2">
        <div className="w-full relative ">
          <Button
            variant="outline"
            size="default"
            role="combobox"
            aria-expanded={showDropdown}
            className="w-full h-full justify-between"
            onClick={fetchAttributes}
          >
            <div className="flex flex-wrap gap-1">
              {selectedAttributeIds.length > 0 ? (
                selectedAttributeIds.map((id) => (
                  <div
                    key={id}
                    className="text-xs px-2 py-1 border rounded-full flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => e.stopPropagation()}
                  >
                    <p className="whitespace-nowrap">
                      {
                        attributes?.find((attribute) => attribute.id === id)
                          ?.name
                      }
                    </p>
                    <X
                      className="w-4 h-4 hover:cursor-pointer opacity-50 hover:opacity-100 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(id);
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>Select {name}</p>
              )}
            </div>

            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
          {showDropdown && (
            <div className="z-50 w-full top-11 absolute rounded-md border bg-popover text-popover-foreground shadow-md outline-non">
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <input
                  placeholder={`Search ${name}`}
                  className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="p-1 max-h-[300px] overflow-y-auto overflow-x-hidden">
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ) : (
                  filteredAttributes?.map((attribute) => (
                    <div
                      onClick={() => handleSelect(attribute.id)}
                      className="text-sm font-medium text-foreground hover:bg-muted px-2 py-1 rounded hover:cursor-pointer flex items-center space-x-2"
                      key={attribute.id}
                    >
                      {selectedAttributeIds.find(
                        (id) => id === attribute.id,
                      ) && <Check className="h-4 w-4" />}
                      <p>{attribute.name}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        {/*TODO: Add a create attribute modal*/}
        {isCreatable && (
          <Button variant="outline">
            <Plus className="mr-1 h-4 w-4 shrink-0" />
            Add new
          </Button>
        )}
      </div>
    </div>
  );
};
