"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../styles/styles.module.css";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.hamburgerMenu} onClick={toggleMenu} style={{ zIndex: isOpen ? 10 : "initial" }}>
          <div className={`${styles.hamburgerBar} ${isOpen ? styles.active : ""}`}></div>
          <div className={`${styles.hamburgerBar} ${isOpen ? styles.active : ""}`}></div>
          <div className={`${styles.hamburgerBar} ${isOpen ? styles.active : ""}`}></div>
        </div>
        <nav className={`${styles.navMenu} ${isOpen ? styles.open : ""}`}>
          <Link href='/' className={styles.menuItem}>
            Home
          </Link>
          <Link href='/products' className={styles.menuItem}>
            Products
          </Link>
          <Link href='/locations' className={styles.menuItem}>
            Locations
          </Link>
          <Link href='/posts' className={styles.menuItem}>
            Posts
          </Link>
          <Link href='/story' className={styles.menuItem}>
            Story
          </Link>
        </nav>
      </div>
    </>
  );
};
