"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../../context/UserContext";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface Order {
  id: number;
  producto: string;
  image_url: string;
  price: number;
  quantity: number;
  total: number;
}

export default function OrdersHistory() {
  const { user, setUser } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/order_details/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setUser(null);
    router.push("/login");
  };

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
    {orders.length === 0 ? (
      <tr>
        <td colSpan={5} style={{ textAlign: 'center' }}>No orders found.</td>
      </tr>
    ) : (
      orders.map((order) => (
        <tr key={order.id} className={styles.orderGrid}>
          <td>{order.producto}</td>
          <td>
            <Image
              src={order.image_url || '/default-image.png'}
              alt={order.producto}
              width={150}
              height={100}
            />
          </td>
          <td>{order.price}</td>
          <td>{order.quantity}</td>
          <td>{order.total}</td>
        </tr>
      ))
    )}
  </tbody>
  </table>

        <div className={styles.profileValidMyAccount}>
          <h1>My Account</h1>
          <button className={styles.logOutButton} onClick={handleLogout}>
            Log Out <CiLogout className={styles.logOutIcon} />
          </button>
        </div>
        <div className={styles.profileValidInfo}>
          <h2>Account Details</h2>
          <p>Username</p>
          <p>user@email.com</p>
        </div>
      </div>
    </>
  );
}
