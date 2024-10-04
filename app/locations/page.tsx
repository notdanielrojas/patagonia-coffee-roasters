import React from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";

const Locations = () => {
  return (
    <div className={styles.heroSection}>
      <div>
        <h1 className={styles.heroText}>
          Patagonia Coffee Roasters cerca de ti
        </h1>
      </div>
      <Image
        src='/images/carousel/2.jpg'
        alt='Imagen 2 de Carrusel'
        width={800}
        height={300}
      ></Image>
    </div>
  );
};

export default Locations;
