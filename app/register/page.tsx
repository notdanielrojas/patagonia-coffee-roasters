import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { BiUnderline } from "react-icons/bi";

export default function Register() {
  return (
    <div className={styles.loginSection}>
      <form action='/login' method='post' className={styles.registerForm}>
        <label htmlFor='nombre'>Name:</label>
        <input type='text' id='nombre' name='nombre' placeholder='Ingresa tu usuario' required minLength={10} maxLength={20} className={styles.inputForm} />
        <label htmlFor='apellido'>Last Name:</label>
        <input type='text' id='apellido' name='apellido' placeholder='Ingresa tu primer apellido' required minLength={10} maxLength={20} className={styles.inputForm} />
        <label htmlFor='email'>Email:</label>
        <input type='text' id='email' name='email' placeholder='Ingresa tu email' required minLength={10} maxLength={20} className={styles.inputForm} />
        <label htmlFor='password'>Password:</label>
        <input type='text' id='password' name='password' placeholder='Ingresa tu contraseña' required minLength={10} maxLength={20} className={styles.inputForm} />
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
