import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { GiCoffeeBeans } from "react-icons/gi";

export default function ProfileValid() {
  return (
    <>
      <div className={styles.profileValidSection}>
        <div className={styles.profileValidHistory}>
          <Link href={""}>
            <h3>My Posts History</h3>
          </Link>
        </div>
        <div className={styles.profileValidMyAccount}>
          <GiCoffeeBeans className={styles.profileAvatar} />
          <h1>My Account</h1>
          <h4>Log Out</h4>
        </div>
        <div className={styles.profileValidInfo}>
          <h2>Account Details</h2>
          <h4>Username</h4>
          <h4>user@email.com</h4>
        </div>
      </div>
    </>
  );
}
