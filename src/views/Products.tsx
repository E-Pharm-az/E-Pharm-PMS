import { Button } from "@/components/ui/button.tsx";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import AuthContext from "@/context/AuthContext.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { AlertCircle, Clock, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

interface Product {
  id: number;
  pharmaCompanyId: number;
  name: string;
  description: string;
  imageUrl: string;
  isApproved: boolean;
  price: number;
}

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
    id: "ImageUrl",
    header: "Image",
    cell: ({ row }) => (
      <img
        className="h-10 w-10"
        src={row.original.imageUrl}
        alt={row.original.name}
      />
    ),
  },
  {
    id: "Name",
    header: "Product Name",
    cell: ({ row }) => row.original.name,
  },
  {
    id: "Description",
    header: "Description",
    cell: ({ row }) => row.original.description,
  },
  {
    id: "Price",
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.original.id.toString())
              }
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

const Products = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get<Product[]>(
          `/product/pharma-company/${3}/product/1`,
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error: any) {
        handleError(error.response.data.message);
        setLoading(false);
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

  const handleAddProduct = () => navigate("/dashboard/add-product");

  return (
    <div className="p-6 space-y-6">
      {error && (
        <Alert
          className="fixed top-2 bg-white shadow max-w-[1200px]"
          variant="destructive"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>
      <div className="h-full">
        {products.length === 0 && !loading ? (
          <div className="flex h-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div>
        ) : (
          <DataTable columns={columns} data={products} isLoading={loading} />
        )}
      </div>
    </div>
  );
};

export default Products;
