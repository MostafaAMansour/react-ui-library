import Link from "next/link";
import React from "react";
import { FaCar } from "react-icons/fa";
import styles from "./header.module.css"
export default function Header( ) {
    return(
        <header className={styles.header}>
            <nav className={styles.navbar} >
                <div className={styles.logo}>
                    <Link href="/" className={styles.link}> Car Shop </Link>
                    <FaCar className={styles.car} />
                </div>
                <ul className={styles.navLinks}>
                    <Link className={styles.navLink} href="/">Home</Link>
                    <Link className={styles.navLink} href="/about">About</Link>
                    <Link className={styles.navLink} href="/cars">Cars</Link>
                    <Link className={styles.navLink} href="/contactUs">Contact us</Link>
                </ul>
            </nav>
            
        </header>
    )
}
