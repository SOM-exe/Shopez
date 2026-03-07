import { Product, Order } from './types';

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Aura Premium Wireless Headphones',
        description: 'Experience pure sound with industry-leading active noise cancellation. Ergonomic design meets 40-hour battery life for the ultimate auditory journey.',
        price: 299.99,
        originalPrice: 349.99,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80'],
        stock: 45,
        featured: true,
        reviews: [
            { id: 'r1', userName: 'Alex J.', rating: 5, comment: 'Phenomenal bass and crystal clear highs. Best purchase this year.', date: '2026-02-14' },
            { id: 'r2', userName: 'Sarah M.', rating: 4, comment: 'Great sound, but they get a little warm after 4 hours.', date: '2026-02-18' }
        ]
    },
    {
        id: 'p2',
        name: 'Zenith Smartwatch Pro',
        description: 'Track your fitness, control your smart home, and stay connected. Features a stunning OLED display and titanium casing for durability.',
        price: 199.50,
        category: 'Wearables',
        images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'],
        stock: 120,
        featured: true,
        reviews: [
            { id: 'r3', userName: 'Mike T.', rating: 5, comment: 'Battery life is insane. UI is snappy.', date: '2026-03-01' }
        ]
    },
    {
        id: 'p3',
        name: 'Nova Minimalist Desk Lamp',
        description: 'Illuminate your workspace with adjustable color temperatures and brightness levels. Features built-in wireless charging base.',
        price: 89.00,
        originalPrice: 120.00,
        category: 'Home Office',
        images: ['https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80'],
        stock: 200,
        featured: false,
        reviews: []
    },
    {
        id: 'p4',
        name: 'Oasis Mechanical Keyboard',
        description: 'Premium tactile feedback with custom-lubed switches. Hot-swappable PCB and double-shot PBT keycaps for endless customization.',
        price: 150.00,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'],
        stock: 15,
        featured: true,
        reviews: [
            { id: 'r4', userName: 'DevLife', rating: 5, comment: 'The typing feel is absolute perfection.', date: '2026-01-20' }
        ]
    },
    {
        id: 'p5',
        name: 'Vortex Coffee Espresso Machine',
        description: 'Bring the cafe to your kitchen. Semi-automatic espresso maker with built-in burr grinder and milk frothing wand.',
        price: 499.00,
        originalPrice: 599.00,
        category: 'Kitchen',
        images: ['https://images.unsplash.com/photo-1517246286466-21ceeed25553?w=800&q=80'],
        stock: 8,
        featured: false,
        reviews: [
            { id: 'r5', userName: 'Emma C.', rating: 5, comment: 'Makes mornings worth waking up for.', date: '2026-02-28' }
        ]
    },
    {
        id: 'p6',
        name: 'Nomad Canvas Backpack',
        description: 'Durable, water-resistant canvas paired with premium leather accents. Fits up to a 16-inch laptop with multiple quick-access pockets.',
        price: 115.00,
        category: 'Lifestyle',
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
        stock: 65,
        featured: true,
        reviews: []
    }
];

export const DUMMY_ORDERS: Order[] = [
    {
        id: 'ORD-8291A',
        date: '2026-03-01',
        total: 349.99,
        status: 'Shipped',
        items: [
            { product: DUMMY_PRODUCTS[0], quantity: 1 },
            { product: DUMMY_PRODUCTS[2], quantity: 1 }
        ]
    },
    {
        id: 'ORD-9922B',
        date: '2026-03-03',
        total: 199.50,
        status: 'Processing',
        items: [
            { product: DUMMY_PRODUCTS[1], quantity: 1 }
        ]
    },
    {
        id: 'ORD-7112C',
        date: '2026-02-28',
        total: 499.00,
        status: 'Delivered',
        items: [
            { product: DUMMY_PRODUCTS[4], quantity: 1 }
        ]
    }
];
