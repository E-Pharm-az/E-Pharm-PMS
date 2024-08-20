import Product from "@/types/product.ts";

export default interface OrderProduct {
    product: Product;
    quantity: number;
    totalPrice: number;
}
