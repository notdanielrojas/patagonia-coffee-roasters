"use client";

import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
/* import { GiCoffeeBeans } from "react-icons/gi"; */
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";

export default function ProfileValid() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <>
      <div className={styles.profileValidSection}>
        <div className={styles.profileValidHistory}>
          <Link href={"/myPosts"}>
            <h3>My Posts</h3>
          </Link>
          <Link href={"/orders"}>
            <h3>My Orders</h3>
          </Link>
        </div>
        <div className={styles.profileValidMyAccount}>
         {/*  <GiCoffeeBeans className={styles.profileAvatar} /> */}
          <h1>My Account</h1>
          <button className={styles.logOutButton} onClick={handleLogout}>
            Log Out <CiLogout className={styles.logOutIcon} />
          </button>
        </div>
        <div className={styles.profileValidInfo}>
          <h2>Account Details</h2>
          <p>username</p>
          <p>user@email.com</p>
        </div>
      </div>
    </>
  );
}
