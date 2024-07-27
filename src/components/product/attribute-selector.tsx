import {
  ComponentType,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
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
import {AxiosError} from "axios";
import ErrorContext from "@/context/ErrorContext.tsx";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";

interface SelectAttributeProps<T extends ProductAttribute> {
  isRequired?: boolean;
  selectLimit?: number;
  route: string;
  name: string;
  info?: string;
  error?: string;
  selectedAttributeIds: number | number[];
  setSelectedAttributeIds: Dispatch<SetStateAction<number | number[]>>;
  onChange: (ids: number | number[]) => void;
  onAttributesChange?: (attributes: T[] | null) => void; // Acts as a function to get the array of attributes from this component to the parent component
  createForm?: ComponentType<{ onSubmit: (data: Partial<T>) => Promise<void> }>;
}

export const AttributeSelector = <T extends ProductAttribute>({
  isRequired = false,
  selectLimit,
  route,
  name,
  info,
  error,
  selectedAttributeIds,
  setSelectedAttributeIds,
  onChange,
  onAttributesChange,
  createForm: CreateForm,
}: SelectAttributeProps<T>) => {
  const axiosPrivate = useAxiosPrivate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [attributes, setAttributes] = useState<T[] | null>(null);
  const [filteredAttrbs, setFilteredAttrbs] = useState<T[] | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { setError } = useContext(ErrorContext);
  const [query, setQuery] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const selectedIds = Array.isArray(selectedAttributeIds)
      ? selectedAttributeIds
      : selectedAttributeIds ? [selectedAttributeIds] : [];

  const handleCreateSubmit = async (data: Partial<T>) => {
    try {
      const response = await axiosPrivate.post<T>(route, data);
      const newAttribute = response.data;

      setAttributes((prev) =>
        prev ? [...prev, newAttribute] : [newAttribute],
      );

      setSelectedAttributeIds((prev) => [...prev, newAttribute.id]);

      setShowCreateModal(false);

      if (onAttributesChange) {
        onAttributesChange(
          attributes ? [...attributes, newAttribute] : [newAttribute],
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data ||
            "An error occurred while creating the attribute",
        );
      } else {
        setError("Unexpected error occurred while creating the attribute");
      }
    }
  };

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
        const response = await axiosPrivate.get<T[]>(
          `${route}${CreateForm ? "/pharmacy" : ""}`,
        );
        setAttributes(response.data);
        setFilteredAttrbs(response.data);
        if (onAttributesChange) {
          onAttributesChange(response.data);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            if (error.response.status !== 404) {
              setError(error.response?.data);
            }
          }
        } else {
          setError("Unexpected error");
        }
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
      setFilteredAttrbs(result);
    }
  }, [query, attributes]);

  const handleSelect = (attributeId: number) => {
    let newSelectedIds: number | number[];
    if (selectedIds.includes(attributeId)) {
      newSelectedIds = selectedIds.filter((id) => id !== attributeId);
    } else {
      if (selectLimit === 1) {
        newSelectedIds = attributeId;
      } else if (selectedIds.length < selectLimit) {
        newSelectedIds = [...selectedIds, attributeId];
      } else {
        return;
      }
    }
    setSelectedAttributeIds(newSelectedIds);
    onChange(newSelectedIds);
  };

  const handleRemove = (attributeId: number) => {
    const newSelectedIds = selectedIds.filter((id) => id !== attributeId);
    const result = selectLimit === 1 ? newSelectedIds[0] || null : newSelectedIds;
    setSelectedAttributeIds(result);
    onChange(result);
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
                      {attributes &&
                        attributes?.find((attribute) => attribute.id === id)
                          ?.name}
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
                  filteredAttrbs?.map((attribute) => (
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
                {!isLoading && !attributes && (
                  <Label>No {name} were found.</Label>
                )}
              </div>
            </div>
          )}
        </div>
        {CreateForm && (
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="mr-1 h-4 w-4 shrink-0" />
                Add new
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new {name.toLowerCase()}</DialogTitle>
              </DialogHeader>
              <CreateForm onSubmit={handleCreateSubmit} />
            </DialogContent>
          </Dialog>
        )}
      </div>
      {error && <Label className="text-red-400">{error}</Label>}
    </div>
  );
};
