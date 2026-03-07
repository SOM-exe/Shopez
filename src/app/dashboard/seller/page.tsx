import Button from '@/components/Button';
import { DUMMY_ORDERS, DUMMY_PRODUCTS } from '@/lib/data';
import styles from './page.module.css';

export default function SellerDashboard() {
    const totalRevenue = DUMMY_ORDERS.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = DUMMY_ORDERS.length;
    const activeProducts = DUMMY_PRODUCTS.length;

    return (
        <div className={`animate-fade-in ${styles.dashboardContainer}`}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Seller Dashboard</h1>
                    <p className="text-secondary">Welcome back! Here's what's happening with your store today.</p>
                </div>
                <Button>Add New Product</Button>
            </div>

            {/* Analytics Overview */}
            <section className={styles.statsGrid}>
                <div className={`glass ${styles.statCard}`}>
                    <div className={styles.statHeader}>Total Revenue</div>
                    <div className={styles.statValue}>${totalRevenue.toFixed(2)}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.positive}>+12.5%</span> from last month
                    </div>
                </div>

                <div className={`glass ${styles.statCard}`}>
                    <div className={styles.statHeader}>Total Orders</div>
                    <div className={styles.statValue}>{totalOrders}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.positive}>+5.2%</span> from last month
                    </div>
                </div>

                <div className={`glass ${styles.statCard}`}>
                    <div className={styles.statHeader}>Active Products</div>
                    <div className={styles.statValue}>{activeProducts}</div>
                    <div className={styles.statTrend}>
                        <span className="text-secondary">2 items low on stock</span>
                    </div>
                </div>
            </section>

            <div className={styles.mainGrid}>
                {/* Recent Orders List */}
                <section className={`glass ${styles.panel}`}>
                    <div className={styles.panelHeader}>
                        <h2>Recent Orders</h2>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>

                    <div className={styles.tableRef}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DUMMY_ORDERS.map(order => (
                                    <tr key={order.id}>
                                        <td className={styles.orderId}>{order.id}</td>
                                        <td>{order.date}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className={styles.amount}>${order.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Top Products */}
                <section className={`glass ${styles.panel}`}>
                    <div className={styles.panelHeader}>
                        <h2>Top Products</h2>
                    </div>
                    <div className={styles.productList}>
                        {DUMMY_PRODUCTS.slice(0, 4).map(product => (
                            <div key={product.id} className={styles.productItem}>
                                <img src={product.images[0]} alt={product.name} className={styles.productImg} />
                                <div className={styles.productInfo}>
                                    <h4>{product.name}</h4>
                                    <p className="text-secondary">{product.category}</p>
                                </div>
                                <div className={styles.productSales}>
                                    <div className={styles.salesCount}>{Math.floor(Math.random() * 50) + 10} sold</div>
                                    <div className={product.stock < 20 ? styles.stockLow : styles.stockOk}>
                                        {product.stock} in stock
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
