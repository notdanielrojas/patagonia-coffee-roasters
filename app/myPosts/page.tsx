"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { GiCoffeeBeans } from "react-icons/gi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { MdRateReview } from "react-icons/md";
import { useUser } from "../../context/UserContext";

type Post = {
  id: string;
  image_url: string;
  title: string;
  description: string;
};

export default function ProfileOrderHistory() {
  const { user, setUser } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/posts/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  if (loading) {
    return <div className={styles.loadingStatus}>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className={styles.profilePostsHistorySection}>
      <div className={styles.profilePostsHistory}>
        <h3 className={styles.profilePostsTitle}>My Posts History</h3>
        <Link href='/postForm'>
          <button className={styles.profilePostButton}>
            Create a Post <MdRateReview className={styles.profilePostIcon} />
          </button>
        </Link>
      </div>
      <table className={styles.tablePosts}>
        <thead className={styles.tableHeadPosts}>
          <tr>
            <th className={styles.tableHeadPosts}>Image</th>
            <th className={styles.tableHeadPosts}>Title</th>
            <th className={styles.tableHeadPosts}>Description</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={post.id || index} className={styles.postGrid}>
                <td>
                  <Image src={post.image_url} alt={post.title} width={150} height={100} className={styles.postImage} />
                </td>
                <td>{post.title}</td>
                <td>{post.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No posts found.</td>
            </tr>
          )}
        </tbody>
      </table>
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
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
