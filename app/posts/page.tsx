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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://backendpatagonia-production.up.railway.app/posts/all", {
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

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <div className={styles.generalPostSection}>
      <h1 className={styles.generalPostTitle}>Our Community</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.postCardContainer}>
        {currentPosts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.cardImage}>
              <Image
                src={post.image_url}
                alt={post.title}
                width={150}
                height={100}
                className={styles.postImage}
                priority
              />
            </div>
            <div className={styles.postCardContent}>
              <h3 className={styles.postCardTitle}>{post.title}</h3>
              <p className={styles.postCardDescription}>{post.description}</p>
            </div>
          </div>
        ))}
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
    </div>
  );
}
