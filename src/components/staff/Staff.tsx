import { Button } from "@/components/ui/button.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { ArrowUpDown, ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { useNavigate } from "react-router-dom";
import {StaffDataTable} from "@/components/staff/StaffDataTable.tsx";

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const Staff = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [error, setError] = useState<string | null>(null); // Set error global and lift to Dashboard Layout
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<string>("all");

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get<Staff[]>(
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
      <div className="border rounded-md">
        <div className="p-2 border-b flex justify-between space-x-2">
          <div className="space-x-2 flex">
            <ToggleGroup
              defaultValue={selectedView}
              onValueChange={setSelectedView}
              size="sm"
              type="single"
            >
              <ToggleGroupItem value="all">All</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-x-2 flex">
            <Button size="sm" variant="outline" className="px-2 h-8">
              <Search className="h-4 w-4" />
              <ListFilter className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="px-2 h-8">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {(isLoading || staff.length > 0) && (
            <StaffDataTable staff={staff} isLoading={isLoading}/>
        )}
      </div>
    </div>
  );
};

export default Staff;
