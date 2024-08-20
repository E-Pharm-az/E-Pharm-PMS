import OrderProduct from "@/types/order-product.ts";

export interface Order {
    id: number;
    orderProducts: OrderProduct[];
    orderStatus: string;
    address: string;
    district: string;
    city: string;
    zip: number;
}