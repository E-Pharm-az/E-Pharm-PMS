import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { useNavigate } from "react-router-dom";
import { StaffDataTable } from "@/components/staff/StaffDataTable.tsx";

export interface StaffType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const Staff = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffType[]>([]);
  const [error, setError] = useState<string | null>(null); // TODO: Set error global and lift to Dashboard Layout
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get<StaffType[]>(
          `/pharmacompanymanager/${1}`,
        );
        setStaff(response.data);
        setIsLoading(false);
      } catch (error: any) {
        handleError(error.response.data.message);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);

    const timeout = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timeout);
  };

  const handleAddStaff = () => navigate("/dashboard/add-staff");

  return (
    <div className="p-6 space-y-6 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Staff</h1>
        <Button onClick={handleAddStaff}>Add staff</Button>
      </div>
      {(isLoading || staff.length > 0) && (
        <StaffDataTable staff={staff} isLoading={isLoading} />
      )}
    </div>
  );
};

export default Staff;
