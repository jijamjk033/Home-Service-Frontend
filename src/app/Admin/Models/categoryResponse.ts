export interface CategoryResponse{
    name: string;
    image: string;
}

export interface ServiceResponse{
    name: string;
    image: string;
    price: number;
    category:string;
    description:string;
}