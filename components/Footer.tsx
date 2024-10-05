import React from "react";
import styles from "../app/styles/styles.module.css";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <div className={styles.footerIcons}>
            <FaFacebookF className={styles.footerIcon} />
            <AiFillInstagram className={styles.footerIcon} />
            <FaYoutube className={styles.footerIcon} />
          </div>
          <div className={styles.contactFooterCard}>
            <h2 className={styles.footerCardTextTitle}>Contact Us</h2>
            <p className={styles.footerCardText}>
              Live Chat <br />
              M-F 9:00am - 5:00pm PST
            </p>
            <p className={styles.footerCardText}>support@patagoniacoffee.com</p>
            <p className={styles.footerCardText}>+56912345678</p>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          <p className={styles.footerCopyrightMessage}>
            © {new Date().getFullYear()} Patagonia Coffee Roasters.
          </p>
          <p className={styles.footerCopyrightMessage}>
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
