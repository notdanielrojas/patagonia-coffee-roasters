"use client";

import Link from "next/link";
import styles from "../app/styles/styles.module.css";
/* import { HamburgerMenu } from "./HamburguerMenu"; */

export const Nav = () => {
  return (
    <>
      {" "}
      {/* <HamburgerMenu /> */}
      <div className={styles.navBar}>
        <h1>
          <Link href='/' className={styles.menuItem}>
            Home
          </Link>
        </h1>
        <h1>
          <Link href='/products' className={styles.menuItem}>
            Products
          </Link>
        </h1>
        <h1>
          <Link href='/locations/' className={styles.menuItem}>
            Locations
          </Link>
        </h1>
        <h1>
          <Link href='/posts/' className={styles.menuItem}>
            Posts
          </Link>
        </h1>
        <h1>
          <Link href='/story/' className={styles.menuItem}>
            Story
          </Link>
        </h1>
      </div>
    </>
  );
};
