"use client";

import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Swal from "sweetalert2";

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("https://patagonia-coffee-roasters.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Email or password incorrect");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successfull!",
        showConfirmButton: false,
        timer: 2000,
      });
      router.push("/profileValid");
    } catch (error) {
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          minLength={10}
          maxLength={50}
          className={styles.inputForm}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          minLength={5}
          maxLength={20}
          className={styles.inputForm}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button type="submit" className={styles.loginButton}>
          Sign In <CiLogin className={styles.logInIcon} />
        </button>

        <p>Dont have an account yet?</p>
        <p>
          <Link href="/register" style={{ textDecoration: "underline" }}>
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
