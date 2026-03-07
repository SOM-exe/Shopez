'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './page.module.css';

type Role = 'User' | 'Seller' | 'Admin';

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState<Role>('User');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock network request
        setTimeout(() => {
            setIsLoading(false);
            // Route based on role
            if (activeTab === 'User') router.push('/dashboard/user');
            else if (activeTab === 'Seller') router.push('/dashboard/seller');
            else if (activeTab === 'Admin') router.push('/dashboard/admin');
        }, 1000);
    };

    return (
        <div className={styles.authContainer}>
            {/* Background Graphic */}
            <div className={styles.blurBlob}></div>
            <div className={styles.blurBlob2}></div>

            <div className={`glass ${styles.authCard}`}>
                <Link href="/" className={styles.backLink}>&larr; Back to Home</Link>

                <div className={styles.header}>
                    <h2>Shop<span className="text-gradient">EZ</span> Portal</h2>
                    <p>Login to access your personalized dashboard</p>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'User' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('User')}
                        type="button"
                    >
                        User
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'Seller' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('Seller')}
                        type="button"
                    >
                        Seller
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'Admin' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('Admin')}
                        type="button"
                    >
                        Admin
                    </button>
                </div>

                <form onSubmit={handleAuth} className={styles.form}>
                    {!isLogin && (
                        <Input label="Full Name" placeholder="John Doe" required />
                    )}
                    <Input label={`${activeTab} Email`} type="email" placeholder={`login@${activeTab.toLowerCase()}.com`} required />
                    <Input label="Password" type="password" placeholder="••••••••" required />

                    {isLogin && (
                        <div className={styles.forgotPassword}>
                            <a href="#">Forgot password?</a>
                        </div>
                    )}

                    <Button type="submit" fullWidth isLoading={isLoading} size="lg" className={styles.submitBtn}>
                        {isLogin ? `Login as ${activeTab}` : `Register as ${activeTab}`}
                    </Button>
                </form>

                {activeTab !== 'Admin' && (
                    <div className={styles.toggleMode}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => setIsLogin(!isLogin)} className={styles.toggleBtn}>
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
