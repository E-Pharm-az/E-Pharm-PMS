import {useContext, useEffect, useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Clock } from "lucide-react";
import {DataTable} from "@/components/ui/data-table.tsx";
import {Product} from "@/components/product/Products.tsx";
import LoaderContext from "@/context/LoaderContext.tsx";
import ErrorContext from "@/context/ErrorContext.tsx";
import {AxiosError} from "axios";

const columns: ColumnDef<Product>[] = [
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
    id: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <img
        className="h-10 w-10 pointer-events-none"
        src={row.original.imageUrl}
        alt={row.original.name}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    id: "price",
    header: "Price (AZN)",
    cell: ({ row }) => (row.original.price / 100).toFixed(2),
  },
  {
    id: "Approval State",
    cell: ({ row }) =>
      !row.original.isApproved && (
        <div className="ml-auto flex w-min items-center justify-center rounded-full border border-yellow-400 bg-yellow-300 px-2 py-1 text-center text-xs text-nowrap space-x-1.5">
          <Clock className="h-4 w-4" />
          <p>Pending approval</p>
        </div>
      ),
  },
];

const ProductsDataTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState<Product[]>([]);
  const {setLoading, loading} = useContext(LoaderContext)
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get<Product[]>(
          `/product/pharmacy?page=1`,
        );
        setProducts(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            if (error.response.status !== 404) {
              setError(error.response?.data);
            }
          }
        } else {
          setError("Unexpected error");
        }
      }
      finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <DataTable
      name="products"
      columns={columns}
      data={products}
      isLoading={loading}
    />
  );
};
export default ProductsDataTable;
