"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/styles.module.css";
import { CiLogin } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const registerUser = async (userData: { name: string; last_name: string; email: string; password: string }) => {
    try {
      const response = await fetch("https://backendpatagonia-production.up.railway.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error creating user");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error trying to create the user:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(user);
  };

  return (
    <div className={styles.registerSection}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter your name'
          required
          minLength={3}
          maxLength={20}
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className={styles.inputForm}
        />

        <label htmlFor='last_name'>Last Name:</label>
        <input
          type='text'
          id='last_name'
          name='last_name'
          placeholder='Enter your last name'
          required
          minLength={3}
          maxLength={20}
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          className={styles.inputForm}
        />

        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter a valid email address'
          required
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className={styles.inputForm}
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Enter your password (5-20 characters)'
          required
          minLength={5}
          maxLength={20}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className={styles.inputForm}
        />
        <button type='submit' className={styles.registerButton}>
          Sign Up <CiLogin className={styles.signInIcon} />
        </button>
        <p>Already have an account?</p>
        <p>
          <Link href='/login' style={{ textDecoration: "underline" }}>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
