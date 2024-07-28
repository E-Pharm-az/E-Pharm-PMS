import {FC, FormEvent} from "react";
import { RegulatoryInformation } from "@/types/product-attribute-types.ts";
import { useForm, Controller } from "react-hook-form";
import { FormInput } from "@/components/ui/form-input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import { CalendarIcon } from "lucide-react";
import {format, isAfter} from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";

export const RegulatoryInformationForm: FC<{
    onSubmit: (data: Partial<RegulatoryInformation>) => Promise<void>;
}> = ({ onSubmit }) => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegulatoryInformation>();

    const onSubmitWrapper = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(onSubmit)(e);
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <form onSubmit={onSubmitWrapper} className="grid gap-4">
        <div className="grid gap-1">
          <FormInput
            type="text"
            {...register("name", { required: "Required" })}
            placeholder="Name*"
          />
          {errors.name && (
            <p className="text-red-400 text-xs">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-1">
          <FormInput
            type="text"
            {...register("certification", { required: "Required" })}
            placeholder="Certificate*"
          />
          {errors.certification && (
            <p className="text-red-400 text-xs">
              {errors.certification.message}
            </p>
          )}
        </div>
        <div className="grid gap-1">
          <Controller
            name="approvalDate"
            control={control}
            rules={{
              required: "Required",
              validate: (value) =>
                !isAfter(new Date(value), today) ||
                "Approval date cannot be in the future",
            }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Select approval date*</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                    disabled={(date) => isAfter(date, today)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.approvalDate && (
            <p className="text-red-400 text-xs">
              {errors.approvalDate.message}
            </p>
          )}
        </div>
        <Button type="submit">Create</Button>
      </form>
    );
};