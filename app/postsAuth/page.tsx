import React from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";

export default function Posts() {
  return (
    <div className={styles.heroSection}>
      <div>
        <h1 className={styles.heroText}>Posts</h1>
      </div>
      <Image
        src='/images/carousel/2.jpg'
        alt='Imagen 2 de Carrusel'
        width={800}
        height={300}
      ></Image>
    </div>
  );
}
