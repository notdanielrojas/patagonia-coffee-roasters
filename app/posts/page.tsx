"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";

type Post = {
  id: string;
  image_url: string;
  title: string;
  description: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts/", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Expected an array of posts");
        }

        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.generalPostSection}>
      <h1 className={styles.generalPostTitle}>Our Community</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.postCardContainer}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.cardImage}>
              <Image src={post.image_url} alt={post.title} width={150} height={100} className={styles.postImage} />
            </div>
            <div className={styles.postCardContent}>
              <h3 className={styles.postCardTitle}>{post.title}</h3>
              <p className={styles.postCardDescription}>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    /*    <div className={styles.generalPostSection}>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.tablePosts}>
        <thead className={styles.tableHeadPosts}>
          <tr>
            <th className={styles.tableHeadPosts}>Image</th>
            <th className={styles.tableHeadPosts}>Title</th>
            <th className={styles.tableHeadPosts}>Description</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className={styles.postGrid}>
              <td className={styles.postImageContainer}>
                <Image src={post.image_url} alt={post.title} width={150} height={100} className={styles.postImage} />
              </td>
              <td>{post.title}</td>
              <td>{post.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */
  );
}
