import {
  ComponentType,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
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
import { AxiosError } from "axios";
import ErrorContext from "@/context/ErrorContext.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";

type SingleOrArray<T> = T | T[] | null;

interface SelectAttributeProps<T extends ProductAttribute> {
  isRequired?: boolean;
  selectLimit?: number;
  route: string;
  name: string;
  info?: string;
  error?: string;
  selectedAttributeIds: SingleOrArray<number>;
  setSelectedAttributeIds: Dispatch<SetStateAction<SingleOrArray<number>>>;
  onChange: (ids: SingleOrArray<number>) => void;
  onAttributesChange?: (attributes: T[] | null) => void;
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useContext(ErrorContext);
  const [query, setQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const selectedIds = Array.isArray(selectedAttributeIds) ? selectedAttributeIds : selectedAttributeIds ? [selectedAttributeIds] : [];

  const handleCreateSubmit = async (data: Partial<T>) => {
    try {
      const response = await axiosPrivate.post<T>(route, data);
      const newAttribute = response.data;

      setAttributes((prev) =>
        prev ? [...prev, newAttribute] : [newAttribute],
      );
      handleSelect(newAttribute.id);
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    const handleWindowBlur = () => setShowDropdown(false);

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("blur", handleWindowBlur);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [showDropdown]);

  const fetchAttributes = async () => {
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
        if (
          error instanceof AxiosError &&
          error.response &&
          error.response.status !== 404
        ) {
          setError(error.response.data);
        } else if (!(error instanceof AxiosError)) {
          setError("Unexpected error");
        }
      } finally {
        setIsLoading(false);
      }
    }
    setShowDropdown(!showDropdown);
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
    let newIds: SingleOrArray<number>;
    if (selectedIds.includes(attributeId)) {
      newIds = selectedIds.filter((id) => id !== attributeId);
    } else {
      if (selectLimit === 1) {
        newIds = attributeId;
      } else if (!selectLimit || selectedIds.length < selectLimit) {
        newIds = [...selectedIds, attributeId];
      } else {
        return;
      }
    }
    setSelectedAttributeIds(newIds);
    onChange(newIds);
  };

  const handleRemove = (attributeId: number) => {
    const newIds = selectedIds.filter((id) => id !== attributeId);
    let result: SingleOrArray<number>;

    if (selectLimit === 1) {
      result = newIds.length > 0 ? newIds[0] : null;
    } else {
      result = newIds.length > 0 ? newIds : null;
    }

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
        <div className="w-full relative">
          <Button
            variant="outline"
            size="default"
            role="combobox"
            aria-expanded={showDropdown}
            className="w-full h-full justify-between"
            onClick={fetchAttributes}
          >
            <div className="flex flex-wrap gap-1">
              {selectedIds.length > 0 ? (
                selectedIds.map((id) => (
                  <div
                    key={id}
                    className="text-xs px-2 py-1 border rounded-full flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
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
            <div className="z-50 w-full top-11 absolute rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
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
                      {selectedIds.includes(attribute.id) && (
                        <Check className="h-4 w-4" />
                      )}
                      <p>{attribute.name}</p>
                    </div>
                  ))
                )}
                {!isLoading && !attributes && (
                  <p className="text-sm">No {name} were found.</p>
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
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
