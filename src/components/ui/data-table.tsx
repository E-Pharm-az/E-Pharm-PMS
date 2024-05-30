import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ListFilter,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { BsSearch } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Separator } from "@/components/ui/separator.tsx";

interface DataTableProps<TData, TValue> {
  name: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function DataTable<TData, TValue>({
  name,
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [desc, setDesc] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    const headers = table
      .getAllColumns()
      .filter((column) => typeof column.columnDef.header === "string")
      .map((column) => column.columnDef.header as string);

    setColumnNames(headers);
  }, [table]);

  const handleCancelSearch = () => {
    setShowSearch(false);
    table.getColumn("name")?.setFilterValue("");
    setColumnFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.id !== "name"),
    );
  };

  const handleSort = (columnName: string) => {
    const column = table.getColumn(columnName);
    if (column) {
      setSelectedColumn(columnName);
      setSorting([{ id: column.id, desc: desc }]);
    }
  };

  const handleOrder = (desc: boolean) => {
    setDesc(desc);
    const column = table.getColumn(selectedColumn);
    if (column) {
      setSelectedColumn(selectedColumn);
      setSorting([{ id: column.id, desc: desc }]);
    }
  };

  return (
    <div className="border rounded-md">
      <div className="p-2 border-b flex justify-between space-x-2">
        {showSearch && (
          <div className="relative items-center w-full">
            <BsSearch className="absolute h-3.5 w-3.5 left-2.5 top-2.5 text-muted-foreground" />
            <Input
              placeholder={`Searching all ${name}`}
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full h-8 appearance-none pl-8 shadow-none bg-background"
            />
          </div>
        )}
        <div className="space-x-2 flex ml-auto">
          {showSearch ? (
            <Button
              onClick={handleCancelSearch}
              size="sm"
              variant="destructive"
              className="px-2 h-8 w-16"
            >
              Cancel
            </Button>
          ) : (
            <Button
              onClick={() => setShowSearch(true)}
              size="sm"
              variant="outline"
              className="px-2 space-x-2 h-8 w-16"
            >
              <Search className="h-4 w-4" />
              <ListFilter className="h-4 w-4" />
            </Button>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="px-2 h-8">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-3 mr-8 grid gap-3">
              <h4 className="font-medium leading-none mb-1">Sort by</h4>
              <RadioGroup defaultValue="name">
                {columnNames.map((columnName, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      onClick={() => handleSort(columnName.toLowerCase())}
                      value={columnName.toLowerCase()}
                    />
                    <Label>{columnName}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Separator />

              <div className="grid gap-2">
                <button
                  className={`h-8 px-3 space-x-2 justify-start text-xs inline-flex items-center rounded-md font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground ${!desc && "bg-accent text-accent-foreground"}`}
                  onClick={() => handleOrder(false)}
                >
                  <ArrowUp className="h-4 w-4" />
                  <p>Ascending</p>
                </button>
                <button
                  onClick={() => handleOrder(true)}
                  className={`h-8 px-3 space-x-2 justify-start text-xs inline-flex items-center rounded-md font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground ${desc && "bg-accent text-accent-foreground"}`}
                >
                  <ArrowDown className="h-4 w-4" />
                  <p>Descending</p>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
