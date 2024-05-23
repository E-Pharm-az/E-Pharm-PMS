import { Button } from "@/components/ui/button.tsx";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import AuthContext from "@/context/AuthContext.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import {
  AlertCircle,
  ArrowUpDown,
  Clock,
  Copy,
  ListFilter,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";

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
        className="h-10 w-10 pointer-events-none"
        src={row.original.imageUrl}
        alt={row.original.name}
      />
    ),
  },
  {
    id: "Name",
    header: "Name",
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
  const [selectedView, setSelectedView] = useState<string>("all");

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
    <div className="p-6 space-y-6 h-full">
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
              <ToggleGroupItem value="active">Active</ToggleGroupItem>
              <ToggleGroupItem value="draft">Draft</ToggleGroupItem>
              <ToggleGroupItem value="archived">Archived</ToggleGroupItem>
            </ToggleGroup>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create new view</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label>Name</Label>
                    <Input />
                  </div>
                </div>
                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button disabled={true} type="button">
                    Create view
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
        {(loading || products.length > 0) && (
          <DataTable columns={columns} data={products} isLoading={loading} />
        )}
        {products.length === 0 && !loading && (
          <div className="w-full h-[300px] items-center justify-center flex">
            <div className=" text-center items-center justify-center gap-1">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button onClick={handleAddProduct} className="mt-4">
                Add Product
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
