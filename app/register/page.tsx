import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { BiUnderline } from "react-icons/bi";

export default function Register() {
  return (
    <div className={styles.loginSection}>
      <form action='/login' method='post' className={styles.registerForm}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Type your username'
          required
          minLength={10}
          maxLength={20}
          className={styles.inputForm}
        />
        <label htmlFor='last name'>Last Name:</label>
        <input
          type='text'
          id='last name'
          name='last name'
          placeholder='Type your last name'
          required
          minLength={10}
          maxLength={20}
          className={styles.inputForm}
        />
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          name='email'
          placeholder='Type your email'
          required
          minLength={10}
          maxLength={20}
          className={styles.inputForm}
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='text'
          id='password'
          name='password'
          placeholder='Type your password'
          required
          minLength={10}
          maxLength={20}
          className={styles.inputForm}
        />
        <button type='submit' className={styles.registerButton}>
          Sign In
        </button>
        <p>Already have an account?</p>
        <p>
          <Link href='/profile' style={{ textDecoration: "underline" }}>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
