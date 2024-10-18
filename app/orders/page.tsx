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

const ITEMS_PER_PAGE = 5;

export default function OrdersHistory() {
  const { user, setUser } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    return <div className={styles.loadingStatus}>Loading your orders...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setUser(null);
    router.push("/login");
  };

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <>
      <div className={styles.profileOrderHistorySection}>
        <h3 className={styles.profileOrderHistoryTitle}>My Orders History</h3>
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
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No orders found.
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
                  <tr key={order.id} className={styles.orderGrid}>
                    <td>{order.producto}</td>
                    <td>
                      <Image
                        src={order.image_url || "/default-image.png"}
                        alt={order.producto}
                        width={150}
                        height={100}
                        priority
                        className={styles.orderImage}
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
        </div>
        <div className={styles.pagination}>
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div className={styles.profileAccountContainer}>
          <div className={styles.profileValidMyAccount}>
            <h2>My Account</h2>
            <button className={styles.logOutButton} onClick={handleLogout}>
              Log Out <CiLogout className={styles.logOutIcon} />
            </button>
          </div>
          <div className={styles.profileValidInfo}>
            <h2>Account Details</h2>
            {user ? <p>Email: {user.email}</p> : <p>No user information available.</p>}
          </div>
        </div>
      </div>
    </>
  );
}
