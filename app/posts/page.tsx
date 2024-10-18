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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts/all", {
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
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className={styles.loadingStatus}>Loading posts...</div>;
  }

  return (
    <div className={styles.generalPostSection}>
      <h1 className={styles.generalPostTitle}>Our Community</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.postCardContainer}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.cardImage}>
              <Image src={post.image_url} alt={post.title} width={150} height={100} className={styles.postImage} priority/>
            </div>
            <div className={styles.postCardContent}>
              <h3 className={styles.postCardTitle}>{post.title}</h3>
              <p className={styles.postCardDescription}>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
