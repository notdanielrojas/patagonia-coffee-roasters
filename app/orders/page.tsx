import React from "react";
import styles from "../styles/styles.module.css";
import Link from "next/link";
import { GiCoffeeBeans } from "react-icons/gi";

export default function ordersHistory() {
  return (
    <>
      <div className={styles.orderSection}>
        <div className={styles.orderHistory}>
          <Link href={""}>
            <h3>Mis Pedidos</h3>
            
          </Link>
        </div>
        <div className={styles.orderMyAccount}>
          <GiCoffeeBeans className={styles.profileOrderAvatar} />
          <h1>Mi Cuenta</h1>
          <h4>Salir</h4>
        </div>
        <div className={styles.orderInfo}>
          <h2>Detalles de la Cuenta</h2>
          <h4>Usuario</h4>
          <h4>usuario@correo.cl</h4>
        </div>
      </div>
    </>
  );
}
