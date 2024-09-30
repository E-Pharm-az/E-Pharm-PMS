import {useState, useEffect, FC, ChangeEvent} from "react";
import { useController, Control } from "react-hook-form";
import { FormData } from "@/pages/product/NewProduct.tsx";

interface PriceInputProps {
  name: "price" | "costPerItem";
  control: Control<FormData>;
  placeholder?: string;
}

const PriceInput: FC<PriceInputProps> = ({
  name,
  control,
  placeholder = "₼ 0.00",
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: "This field is required" },
  });

  const [displayValue, setDisplayValue] = useState("");

  const formatValue = (val: string) => {
    const numeric = val.replace(/[^\d]/g, "");
    const paddedNumeric = numeric.padStart(3, "0");
    const integerPart = paddedNumeric.slice(0, -2);
    const decimalPart = paddedNumeric.slice(-2);
    return `${integerPart},${decimalPart}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, "");
    setDisplayValue(formatValue(inputValue));
    onChange(parseInt(inputValue, 10)); // Store as integer for API
  };

  useEffect(() => {
    if (value !== undefined) {
      setDisplayValue(formatValue(value.toString()));
    }
  }, [value]);

  return (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default PriceInput;
