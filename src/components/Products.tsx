import {Button} from "@/components/ui/button.tsx";
import {useContext, useEffect, useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import AuthContext from "@/components/context/AuthContext.tsx";
import {DataTable} from "@/components/ui/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table";

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
    const {auth} = useContext(AuthContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axiosPrivate.get<Product[]>(`/product/pharma-company/${auth?.companyId}/product`);
                setProducts(response.data);
            } catch (error: any) {
                setError(error.response.data.message);
            }
        }
        getProducts();
    }, []);

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
            </div>
            {products.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">You have no products</h3>
                        <p className="text-sm text-muted-foreground">You can start selling as soon as you add a
                            product.</p>
                        <Button className="mt-4">Add Product</Button>
                    </div>
                </div>
            ) : (
                <DataTable columns={columns} data={products}/>
            )}
        </>
    );
};

export default Products;