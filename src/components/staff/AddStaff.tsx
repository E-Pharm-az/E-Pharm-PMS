import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { StaffForm } from "@/components/staff/StaffForm.tsx";
import { FieldValues } from "react-hook-form";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";

const AddStaff = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    console.log(JSON.stringify(data));

    try {
      await axiosPrivate.post(
        `/user/register/${1}/pharma-manager`,
        JSON.stringify(data),
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-start space-x-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => navigate("/dashboard/staff")}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-semibold md:text-2xl">Add Staff</h1>
      </div>
      <StaffForm onSubmit={onSubmit} />
    </div>
  );
};

export default AddStaff;