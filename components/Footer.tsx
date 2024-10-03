import React from "react";
import styles from "../app/styles/styles.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footerInfo}>
      <div className={styles.footerContent}>
        <p>
          © {new Date().getFullYear()} Patagonia Coffee Roasters. <br /> Todos los
          derechos reservados.
        </p>
      {/*   <nav className={styles.footerNav}>
          <a href='/' className={styles.footerLink}>
            Inicio
          </a>
          <a href='/about' className={styles.footerLink}>
            Acerca de
          </a>
          <a href='/contact' className={styles.footerLink}>
            Contacto
          </a>
        </nav> */}
      </div>
    </footer>
  );
};
