"use client";

import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response Status:", response.status);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error during login");
      }

      console.log("Logged in successfully:", data);

      router.push("/profileValid");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className={styles.loginSection}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          required
          minLength={10}
          maxLength={50}
          className={styles.inputForm}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Enter your password'
          required
          minLength={5}
          maxLength={20}
          className={styles.inputForm}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

        <button type='submit' className={styles.loginButton}>
          Sign In <CiLogin className={styles.logInIcon} />
        </button>

        <p>Don't have an account yet?</p>
        <p>
          <Link href='/register' style={{ textDecoration: "underline" }}>
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}