import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import Staff from "@/components/staff/Staff.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";

// TODO: Add data sorting and data search to data-table component
// TODO: If the data passed to the data table is null, it means it is loading, whilts if the array is less than 1, then there is no data.

interface Props {
  staff: Staff[];
  isLoading: boolean;
}

const columns: ColumnDef<Staff>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "Name",
    header: "Name",
    cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
  },
];

export const StaffDataTable = ({ staff, isLoading }: Props) => {
  return <DataTable columns={columns} data={staff} isLoading={isLoading} />;
};
