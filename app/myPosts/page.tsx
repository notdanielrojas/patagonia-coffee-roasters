import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { GiCoffeeBeans } from "react-icons/gi";
import posts from "../posts.json";
import Image from "next/image";

export default function ProfileOrderHistory() {
  return (
    <>
      <div className={styles.profilePostsHistorySection}>
        <div className={styles.profilePostsHistory}>
          <Link href={""}>
            <h3>My Posts History</h3>
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
              {posts.map((post, index) => (
                <tr key={index} className={styles.postGrid}>
                  <td>{post.producto}</td>
                  <td>
                    <Image src={post.image_url} alt={post.producto} width={150} height={100} />
                  </td>
                  <td>{post.commentary}</td>
                  <td>{post.evaluacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.profileValidMyAccount}>
          <GiCoffeeBeans className={styles.profileAvatar} />
          <h1>My Account</h1>
          <p>Log Out</p>
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
