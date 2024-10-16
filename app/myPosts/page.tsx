"use client";

import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { GiCoffeeBeans } from "react-icons/gi";
import posts from "../posts.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { MdRateReview } from "react-icons/md";
import { useUser } from "../../context/UserContext";

export default function ProfileOrderHistory() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      <div className={styles.profilePostsHistorySection}>
        <div className={styles.profilePostsHistory}>
          <h3 className={styles.profilePostsTitle}>My Posts History</h3>
          <Link href='/postForm'>
            <button className={styles.profilePostButton}>
              Create a Post <MdRateReview className={styles.profilePostIcon} />
            </button>
          </Link>
        </div>
        <div className={styles.profilePostsHistorySection}>
          <table className={styles.tablePosts}>
            <thead className={styles.tableHeadPosts}>
              <tr>
                <th className={styles.tableHeadPosts}>Product</th>
                <th className={styles.tableHeadPosts}>Image</th>
                <th className={styles.tableHeadPosts}>Commentary</th>
                <th className={styles.tableHeadPosts}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <tr key={post.id || index} className={styles.postGrid}>
                    <td>{post.producto}</td>
                    <td>
                      <Image src={post.image_url} alt={post.producto} width={150} height={100} />
                    </td>
                    <td>{post.review}</td>
                    <td>{post.evaluacion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
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
            <p>Username</p>
            <p>user@email.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
