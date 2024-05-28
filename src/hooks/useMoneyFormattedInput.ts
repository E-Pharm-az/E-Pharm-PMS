import { UseFormSetValue } from "react-hook-form";
import { FormData } from "@/views/product/AddProduct.tsx";
import { ChangeEvent, useState } from "react";

const useFormattedInput = (
    defaultValue: number,
    setValue: UseFormSetValue<FormData>,
    fieldName: string,
) => {
    const [value, setValueState] = useState<number>(defaultValue);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = parseFloat(e.target.value.replace(",", "."));
        if (isNaN(inputValue)) {
            inputValue = 0;
        }
        setValueState(inputValue);
        setValue(fieldName, inputValue * 100); // Store the value as cents
    };

    const displayedValue = (value / 100).toFixed(2); // Convert stored cents to manats

    return { handleInputChange, displayedValue };
};

export default useFormattedInput;