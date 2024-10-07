import React from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";
import posts from "../posts.json";

export default async function Posts() {
  return (
    <>
      <div className={styles.generalPostSection}>
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
                  <Image
                    src={post.image_url}
                    alt={post.producto}
                    width={150}
                    height={100}
                  />
                </td>
                <td>{post.commentary}</td>
                <td>{post.evaluacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
