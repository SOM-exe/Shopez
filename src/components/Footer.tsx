import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.grid}`}>
                <div className={styles.brand}>
                    <h2>Shop<span className="text-gradient">EZ</span></h2>
                    <p>Experience the future of effortless online shopping. Premium quality, lightning fast delivery, and world-class support.</p>
                </div>

                <div className={styles.links}>
                    <h3>Shop</h3>
                    <Link href="/">All Products</Link>
                    <Link href="/">Electronics</Link>
                    <Link href="/">Wearables</Link>
                    <Link href="/">Home Office</Link>
                </div>

                <div className={styles.links}>
                    <h3>Support</h3>
                    <Link href="/">Contact Us</Link>
                    <Link href="/">Shipping Policy</Link>
                    <Link href="/">Returns</Link>
                    <Link href="/">FAQ</Link>
                </div>

                <div className={styles.newsletter}>
                    <h3>Stay Updated</h3>
                    <p>Subscribe to our newsletter for the latest products and exclusive discounts.</p>
                    <form className={styles.form}>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit" className={styles.submitBtn}>Subscribe</button>
                    </form>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} ShopEZ Platform. All rights reserved.</p>
            </div>
        </footer>
    );
}
