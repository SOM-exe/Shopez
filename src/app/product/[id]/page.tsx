import { DUMMY_PRODUCTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import styles from './page.module.css';
import Link from 'next/link';

export function generateStaticParams() {
    return DUMMY_PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = DUMMY_PRODUCTS.find((p) => p.id === params.id);

    if (!product) {
        notFound();
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <>
            <Navbar />

            <main className="container animate-fade-in" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                {/* Breadcrumbs */}
                <div className={styles.breadcrumbs}>
                    <Link href="/">Home</Link> &gt; <span>{product.category}</span> &gt; <span className={styles.current}>{product.name}</span>
                </div>

                <div className={styles.productGrid}>
                    {/* Main Image */}
                    <div className={styles.imageGallery}>
                        <div className={styles.mainImageContainer}>
                            <img src={product.images[0]} alt={product.name} className={styles.mainImage} />
                            {discount > 0 && <div className={styles.discountBadge}>-{discount}%</div>}
                        </div>
                        {product.images.length > 1 && (
                            <div className={styles.thumbnailList}>
                                {product.images.map((img, idx) => (
                                    <img key={idx} src={img} alt={`Thumbnail ${idx}`} className={styles.thumbnail} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className={styles.infoContainer}>
                        <div className={styles.tag}>{product.category}</div>
                        <h1 className={styles.title}>{product.name}</h1>

                        <div className={styles.priceContainer}>
                            <span className={styles.price}>${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>

                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.meta}>
                            <div className={styles.stock}>
                                {product.stock > 0 ? (
                                    <><span className={styles.dotAvailable}></span> In Stock ({product.stock})</>
                                ) : (
                                    <><span className={styles.dotOut}></span> Out of Stock</>
                                )}
                            </div>
                        </div>

                        <hr className={styles.divider} />

                        <div className={styles.actions}>
                            <div className={styles.quantity}>
                                <button>-</button>
                                <span>1</span>
                                <button>+</button>
                            </div>
                            <Button size="lg" fullWidth>Add to Cart</Button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className={styles.reviewsSection}>
                    <h2>Customer Reviews</h2>
                    {product.reviews.length === 0 ? (
                        <p className="text-secondary">No reviews yet. Be the first to review this product!</p>
                    ) : (
                        <div className={styles.reviewsList}>
                            {product.reviews.map(review => (
                                <div key={review.id} className={`glass ${styles.reviewCard}`}>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.avatar}>{review.userName.charAt(0)}</div>
                                        <div>
                                            <div className={styles.reviewerName}>{review.userName}</div>
                                            <div className={styles.reviewDate}>{review.date}</div>
                                        </div>
                                        <div className={styles.stars}>
                                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                        </div>
                                    </div>
                                    <p className={styles.reviewText}>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
