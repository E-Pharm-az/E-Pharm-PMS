import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { StaffType } from "@/components/staff/Staff.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";

// TODO: Add data sorting and data search to data-table component
// TODO: If the data passed to the data table is null, it means it is loading, whiles if the array is less than 1, then there is no data.
// TODO: Add an option to disable the datatable, for example with the data length is 0 (optional by the parent)
// TODO: On select, there should be actions that appear on the header for the selected items.

interface Props {
  staff: StaffType[];
  isLoading: boolean;
}

const nameFilterFn = (row: any, columnId: string, filterValue: string) => {
  const name = `${row.original.firstName} ${row.original.lastName}`.toLowerCase();
  return name.includes(filterValue.toLowerCase());
};

const columns: ColumnDef<StaffType>[] = [
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
    id: "name",
    header: "Name",
    cell: ({ row }) => (
        <div>
          {row.original.firstName} {row.original.lastName}
        </div>
    ),
    filterFn: nameFilterFn,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
];

export const StaffDataTable = ({ staff, isLoading }: Props) => {
  return (
    <DataTable
      name="staff"
      columns={columns}
      data={staff}
      isLoading={isLoading}
    />
  );
};
