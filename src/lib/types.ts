export interface Review {
    id: string;
    userName: string;
    rating: number; /* 1-5 */
    comment: string;
    date: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number; /* For discounts */
    category: string;
    images: string[];
    reviews: Review[];
    stock: number;
    featured?: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Order {
    id: string;
    date: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: CartItem[];
}
