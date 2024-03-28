import {Button} from "@/components/ui/button.tsx";
import {useContext, useEffect, useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import AuthContext from "@/components/context/AuthContext.tsx";
import {DataTable} from "@/components/ui/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface Product {
    id: number;
    pharmaCompanyId: number;
    productName: string;
    productDescription: string;
    productImageUrl: string;
}

const columns: ColumnDef<Product>[] = [
    {
        id: "productName",
        header: "Product Name",
        cell: (cell) => cell.row.original.productName,
    },
    {
        id: "productDescription",
        header: "Description",
        cell: (cell) => cell.row.original.productDescription,
    },
    {
        id: "productImageUrl",
        header: "Image",
        cell: (cell) => cell.row.original.productImageUrl,
    },
];

const Products = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axiosPrivate.get<Product[]>(`/product/pharma-company/${auth?.companyId}/product`);
                setProducts(response.data);
                setLoading(false);
            } catch (error: any) {
                handleError(error.response.data.message);
                setLoading(false);
            }
        }
        getProducts();
    }, []);

    const handleError = (errorMessage: string) => {
        setError(errorMessage);

        const timeout = setTimeout(() => {
            setError(null);
        }, 5000);

        return () => clearTimeout(timeout);
    }

    const handleAddProduct = () => {
        navigate("/add-product");
    }

    return (
        <>
            {error && (
                <Alert className="bg-white fixed shadow top-2 max-w-[1200px]" variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
                <Button onClick={handleAddProduct}>Add Product</Button>
            </div>
            <div className="h-full">
                {
                    products.length === 0 && !loading ? (
                        <div
                            className="h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className="text-2xl font-bold tracking-tight">You have no products</h3>
                                <p className="text-sm text-muted-foreground">You can start selling as soon as you
                                    add a
                                    product.</p>
                                <Button className="mt-4">Add Product</Button>
                            </div>
                        </div>
                    ) : (
                        <DataTable columns={columns} data={products} isLoading={loading}/>
                    )
                }
            </div>
        </>
    );
};

export default Products;
