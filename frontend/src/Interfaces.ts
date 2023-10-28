export interface Product {
    id?: number
    name: string
    slug?: string
    description: string
    price: number
    rating?: number
    count_in_stock : number
    category: string
    image: File | null;
    quantity?: number
    num_reviews?: number
}

export interface Order{
    total_price: number,
    address: string,
    city: string,
    postal_code: string,
    order_items: Product[]
}

export interface Token {
    exp: number;
    is_staff: boolean;
    avatar: string;
}

export interface Meta{
    next: string | null;
    previous: string | null;
    count: number;
}

export interface Page{
    data: Product[];
    meta: Meta;
}

export interface User {
    id: number;
    email: string;
    name: string;
    last_name: string;
}