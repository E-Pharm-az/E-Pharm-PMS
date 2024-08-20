export default interface Product {
    id: number;
    pharmaCompanyId: number;
    name: string;
    description: string;
    imageUrl?: string;
    isApproved: boolean;
    price: number;
}