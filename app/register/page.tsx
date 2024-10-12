"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/styles.module.css";
import { CiLogin } from "react-icons/ci";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const registerUser = async (user: { name: string; last_name: string; email: string; password: string }) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error creando usuario");
      }
      console.log("Usuario registrado:", data);
    } catch (error: any) {
      console.error("Error registrando el usuario:", error.message);
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
          placeholder='Type your username'
          required
          minLength={10}
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
          placeholder='Type your last name'
          required
          minLength={10}
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
          placeholder='Type your email'
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
          placeholder='Type your password'
          required
          minLength={10}
          maxLength={20}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className={styles.inputForm}
        />
        <button type='submit' className={styles.registerButton}>
          Sign Up <CiLogin className={styles.signInIcon}/>
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
