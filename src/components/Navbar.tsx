'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container flex-between ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    Shop<span className="text-gradient">EZ</span>
                </Link>

                <div className={styles.links}>
                    <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
                    <Link href="/seller" className={pathname === '/seller' ? styles.active : ''}>Seller Dashboard</Link>
                </div>

                <div className={styles.actions}>
                    <Link href="/checkout" className={styles.cartBtn}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="24"
                            height="24"
                        >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span className={styles.cartBadge}>3</span>
                    </Link>
                    <div className={styles.profile}>
                        SJ
                    </div>
                </div>
            </div>
        </nav>
    );
}
