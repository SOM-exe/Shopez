import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { DUMMY_PRODUCTS } from '@/lib/data';
import styles from './page.module.css';

export default function CheckoutPage() {
    // Use mock cart items for visual test
    const cartItems = [
        { product: DUMMY_PRODUCTS[0], quantity: 1 },
        { product: DUMMY_PRODUCTS[2], quantity: 2 }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shipping = 15.00;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <>
            <Navbar />

            <main className="container animate-fade-in" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <h1 className={styles.title}>Secure Checkout</h1>

                <div className={styles.checkoutGrid}>
                    {/* Payment & Shipping Form */}
                    <div className={styles.formSection}>
                        <div className={`glass ${styles.card}`}>
                            <h2>Shipping Information</h2>
                            <div className={styles.formGrid}>
                                <Input label="First Name" placeholder="John" />
                                <Input label="Last Name" placeholder="Doe" />
                                <Input label="Email Address" type="email" placeholder="john@example.com" fullWidth className={styles.fullSpan} />
                                <Input label="Street Address" placeholder="123 Main St" fullWidth className={styles.fullSpan} />
                                <Input label="City" placeholder="San Francisco" />
                                <Input label="Postal Code" placeholder="94105" />
                            </div>
                        </div>

                        <div className={`glass ${styles.card} ${styles.marginTop}`}>
                            <h2>Payment Method</h2>
                            <div className={styles.paymentMethods}>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="payment" defaultChecked />
                                    Credit/Debit Card
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="payment" />
                                    PayPal
                                </label>
                            </div>
                            <div className={styles.formGrid}>
                                <Input label="Card Number" placeholder="0000 0000 0000 0000" fullWidth className={styles.fullSpan} />
                                <Input label="Expiry Date" placeholder="MM/YY" />
                                <Input label="CVC" placeholder="123" type="password" />
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className={styles.summarySection}>
                        <div className={`glass ${styles.card} ${styles.sticky}`}>
                            <h2>Order Summary</h2>

                            <div className={styles.cartItems}>
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className={styles.cartItem}>
                                        <img src={item.product.images[0]} alt={item.product.name} className={styles.itemImage} />
                                        <div className={styles.itemDetails}>
                                            <h4>{item.product.name}</h4>
                                            <div className={styles.itemMeta}>
                                                <span>Qty: {item.quantity}</span>
                                                <span className={styles.itemPrice}>${item.product.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.totals}>
                                <div className={styles.totalRow}>
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Estimated Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <hr className={styles.divider} />
                                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                                    <span>Total</span>
                                    <span className="text-gradient">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button size="lg" fullWidth className={styles.payBtn}>
                                Pay ${total.toFixed(2)}
                            </Button>

                            <p className={styles.secureText}>
                                <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                Payments are secure and encrypted.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
