import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";


export default async function Products() {
  return (
    <div className={styles.heroSection}>
      <div>
        <h1 className={styles.heroText}>Nuestros productos</h1>
      </div>
    </div>
  );
}
