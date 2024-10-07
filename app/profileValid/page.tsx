import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { GiCoffeeBeans } from "react-icons/gi";

export default function ProfileValid() {
  return (
    <>
      <div className={styles.profileValidSection}>
        <div className={styles.profileValidHistory}>
          <Link href={"/myPosts"}>
            <h3>My Posts</h3>
          </Link>
          <Link href={"/orders"}>
            <h3>My Orders</h3>
          </Link>
        </div>
        <div className={styles.profileValidMyAccount}>
          <GiCoffeeBeans className={styles.profileAvatar} />
          <h1>My Account</h1>
          <p>Log Out</p>
        </div>
        <div className={styles.profileValidInfo}>
          <h2>Account Details</h2>
          <p>username</p>
          <p>user@email.com</p>
        </div>
      </div>
    </>
  );
}
