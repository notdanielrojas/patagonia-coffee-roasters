"use client";

import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { useUser } from "@/context/UserContext";

interface User {
  id: string;
  email: string;
}

export default function ProfileValid() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  console.log("user", user);

  return (
    <div className={styles.profileValidSection}>
      <div className={styles.profileValidHistory}>
        <Link href='/myPosts'>
          <h3>My Posts</h3>
        </Link>
        <Link href='/orders'>
          <h3>My Orders</h3>
        </Link>
      </div>
      <div className={styles.profileValidMyAccount}>
        <h1>My Account</h1>
        <button className={styles.logOutButton} onClick={handleLogout}>
          Log Out <CiLogout className={styles.logOutIcon} />
        </button>
      </div>
      <div className={styles.profileValidInfo}>
        <h2>Account Details</h2>
        {user ? (
          <>
            <p>Email: {user.email}</p>
          </>
        ) : (
          <p>No user information available.</p>
        )}
      </div>
    </div>
  );
}
