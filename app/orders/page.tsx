import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { GiCoffeeBeans } from "react-icons/gi";

export default function ordersHistory() {
  return (
    <>
      <div className={styles.orderSection}>
        <div className={styles.orderHistory}>
          <Link href={""}>
            <h3>My Order History</h3>
          </Link>
        </div>
        <div className={styles.orderMyAccount}>
          <GiCoffeeBeans className={styles.profileOrderAvatar} />
          <h1>My Account</h1>
          <h4>Log out</h4>
        </div>
        <div className={styles.orderInfo}>
          <h2>Account Details</h2>
          <h4>Username</h4>
          <h4>user@email.com</h4>
        </div>
      </div>
    </>
  );
}
