import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Mock image generation using unoptimized Next image since these are external unsplash urls

    return (
        <div className={styles.card}>
            <Link href={`/product/${product.id}`} className={styles.imageWrapper}>
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className={styles.image}
                />
                {product.featured && <span className={styles.badge}>Featured</span>}
            </Link>

            <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <Link href={`/product/${product.id}`}>
                    <h3 className={styles.title}>{product.name}</h3>
                </Link>

                <div className={styles.footer}>
                    <div className={styles.priceContainer}>
                        <span className={styles.price}>${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>

                    <button className={styles.addButton} title="Add to Cart">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="20"
                            height="20"
                        >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
