"use client";

import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { useUser } from "@/context/UserContext";
import Swal from "sweetalert2";

export default function ProfileValid() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Log out Successfull!",
      showConfirmButton: false,
      timer: 2000,
    });
    router.push("/login");
  };

  return (
    <div className={styles.profileValidSection}>
      <div className={styles.profileValidMyAccount}>
        <h2>My Account</h2>
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
        <div className={styles.profileValidHistory}>
          <Link href='/myPosts'>
            <h3>Post History</h3>
          </Link>
          <Link href='/orders'>
            <h3>Order History</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
