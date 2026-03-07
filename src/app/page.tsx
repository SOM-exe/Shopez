import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { DUMMY_PRODUCTS } from '@/lib/data';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = DUMMY_PRODUCTS.filter(p => p.featured);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={`animate-fade-in ${styles.heroContent}`}>
              <div className={styles.badge}>New Collection 2026</div>
              <h1 className={styles.heroTitle}>
                Discover the <span className="text-gradient">Future</span> of Shopping
              </h1>
              <p className={styles.heroDesc}>
                Seamlessly navigate through detailed product descriptions, premium selections, and available discounts to make informed decisions.
              </p>
              <div className={styles.heroActions}>
                <Link href="#featured">
                  <Button size="lg">Shop Now</Button>
                </Link>
                <Link href="/seller">
                  <Button variant="outline" size="lg">Seller Dashboard</Button>
                </Link>
              </div>
            </div>

            <div className={`animate-fade-in ${styles.heroImageContainer}`}>
              <div className={styles.heroBlob}></div>
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
                alt="Shopping Experience"
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className={styles.categories}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
            <div className={styles.categoryGrid}>
              {['Electronics', 'Wearables', 'Home Office', 'Lifestyle'].map(cat => (
                <div key={cat} className={`glass ${styles.categoryCard}`}>
                  <h3>{cat}</h3>
                  <p>Explore Now &rarr;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className={`container ${styles.productsSection}`}>
          <div className="flex-between">
            <h2 className={styles.sectionTitle}>Trending Now</h2>
            <Button variant="ghost">View All</Button>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
