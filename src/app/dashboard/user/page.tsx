import { DUMMY_ORDERS } from '@/lib/data';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function UserDashboard() {
    const recentOrders = DUMMY_ORDERS.slice(0, 2);

    return (
        <div className={`animate-fade-in ${styles.container}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Welcome back, John!</h1>
                <p className="text-secondary">Here's an overview of your account activity.</p>
            </div>

            <div className={styles.grid}>
                {/* Quick Stats */}
                <div className={`glass ${styles.card}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <div>
                            <h3>Total Orders</h3>
                            <p className={styles.stat}>12</p>
                        </div>
                    </div>
                </div>

                <div className={`glass ${styles.card}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3>Wishlist Items</h3>
                            <p className={styles.stat}>4</p>
                        </div>
                    </div>
                </div>

                <div className={`glass ${styles.card}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3>Store Credit</h3>
                            <p className={styles.stat}>$45.00</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className={`glass ${styles.section}`}>
                <div className={styles.sectionHeader}>
                    <h2>Recent Orders</h2>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>

                <div className={styles.orderList}>
                    {recentOrders.map(order => (
                        <div key={order.id} className={styles.orderItem}>
                            <div className={styles.orderMeta}>
                                <h4>Order #{order.id}</h4>
                                <span className="text-secondary">{order.date}</span>
                            </div>
                            <div className={styles.orderStatus}>
                                <span className={`${styles.badge} ${styles[order.status.toLowerCase()]}`}>
                                    {order.status}
                                </span>
                                <span className={styles.orderTotal}>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
