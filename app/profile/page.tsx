import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { BiUnderline } from "react-icons/bi";

export default function LogIn() {
  return (
    <div className={styles.loginSection}>
      <form action='/login' method='post' className={styles.loginForm}>
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          name='email'
          placeholder='Ingresa tu usuario'
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
          placeholder='Ingresa tu contraseña'
          required
          minLength={10}
          maxLength={20}
          className={styles.inputForm}
        />
        <button type='submit' className={styles.loginButton}>
          Sign In
        </button>
        <p>
          ¿Aún no tienes cuenta?{" "}
          <Link href='/register' style={{ textDecoration: "underline" }}>
            Crear cuenta
          </Link>
        </p>
      </form>
    </div>
  );
}
