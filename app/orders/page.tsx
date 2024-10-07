import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { GiCoffeeBeans } from "react-icons/gi";
import orders from "../orders.json";
import Image from "next/image";

export default function ordersHistory() {
  return (
    <>
      <div className={styles.profileOrderHistorySection}>
        <Link href={""}>
          <h3 className={styles.profileOrderHistoryTitle}>My Orders History</h3>
        </Link>
      </div>
      <div className={styles.profileOrderHistoryInfo}>
        <table className={styles.tableOrders}>
          <thead className={styles.tableHeadPosts}>
            <tr>
              <th className={styles.tableHeadPosts}>Product</th>
              <th className={styles.tableHeadPosts}>Image</th>
              <th className={styles.tableHeadPosts}>Price</th>
              <th className={styles.tableHeadPosts}>Quantity</th>
              <th className={styles.tableHeadPosts}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className={styles.orderGrid}>
                <td>{order.producto}</td>
                <td>
                  <Image src={order.image_url} alt={order.producto} width={150} height={100} />
                </td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.profileValidMyAccount}>
          <h1>My Account</h1>
          <p>Log Out</p>
        </div>
        <div className={styles.profileValidInfo}>
          <GiCoffeeBeans className={styles.profileOrderAvatar} />
          <h2>Account Details</h2>
          <p>Username</p>
          <p>user@email.com</p>
        </div>
      </div>
    </>
  );
}
