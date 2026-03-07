import Button from '@/components/Button';
import styles from './page.module.css';

export default function AdminDashboard() {
    return (
        <div className={`animate-fade-in ${styles.container}`}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Platform Overview</h1>
                    <p className="text-secondary">Super Admin controls & global metrics.</p>
                </div>
                <div className={styles.actions}>
                    <Button variant="outline">Download Report</Button>
                    <Button>System Settings</Button>
                </div>
            </div>

            <div className={styles.grid}>
                {/* Global Stats */}
                <div className={`glass ${styles.card}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3>Total Users</h3>
                            <p className={styles.stat}>124,592</p>
                        </div>
                    </div>
                </div>

                <div className={`glass ${styles.card}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div>
                            <h3>Total Sellers</h3>
                            <p className={styles.stat}>4,812</p>
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
                            <h3>Monthly GMV</h3>
                            <p className={styles.stat}>$2.4M</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.splitGrid}>
                {/* Recent Platform Activity */}
                <section className={`glass ${styles.section}`}>
                    <div className={styles.sectionHeader}>
                        <h2>System Alerts</h2>
                        <span className={styles.badgeWarning}>3 New</span>
                    </div>
                    <div className={styles.alertList}>
                        <div className={styles.alertItem}>
                            <div className={styles.alertDot}></div>
                            <div>
                                <h4>High Traffic Warning</h4>
                                <p className="text-secondary">Server load crossed 80% on primary database node.</p>
                            </div>
                            <span className={styles.timeStr}>10m ago</span>
                        </div>
                        <div className={styles.alertItem}>
                            <div className={styles.alertDot} style={{ background: '#f59e0b' }}></div>
                            <div>
                                <h4>New Seller Registrations</h4>
                                <p className="text-secondary">42 new sellers awaiting manual verification.</p>
                            </div>
                            <span className={styles.timeStr}>1h ago</span>
                        </div>
                    </div>
                </section>

                {/* Top Performing Categories */}
                <section className={`glass ${styles.section}`}>
                    <div className={styles.sectionHeader}>
                        <h2>Top Categories</h2>
                    </div>
                    <div className={styles.categoryList}>
                        <div className={styles.catItem}>
                            <span>Electronics</span>
                            <div className={styles.barContainer}>
                                <div className={styles.barFill} style={{ width: '85%' }}></div>
                            </div>
                            <span>45%</span>
                        </div>
                        <div className={styles.catItem}>
                            <span>Wearables</span>
                            <div className={styles.barContainer}>
                                <div className={styles.barFill} style={{ width: '60%', background: '#a855f7' }}></div>
                            </div>
                            <span>25%</span>
                        </div>
                        <div className={styles.catItem}>
                            <span>Home Office</span>
                            <div className={styles.barContainer}>
                                <div className={styles.barFill} style={{ width: '40%', background: '#10b981' }}></div>
                            </div>
                            <span>15%</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
