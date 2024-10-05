import React from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";

export default function Locations() {
  return (
    <>
      <div className={styles.locationSection}>
        <div>
          <h1 className={styles.locationTitle}>Estamos cerca de ti</h1>
        </div>
        <Image
          src='/images/carousel/2.jpg'
          alt='Imagen 2 de Carrusel'
          width={800}
          height={300}
        ></Image>
      </div>
      <div className={styles.locationNames}>
        <h3>Patagonia Cafe</h3>
        <h3 className={styles.locationSubNames}>Santiago</h3>
      </div>
      <div className={styles.locationCards}>
        <div className={styles.locationCard}>
          <Image
            src='/images/carousel/2.jpg'
            alt='Imagen 2 de Carrusel'
            width={800}
            height={300}
            className={styles.locationImage}
          ></Image>
          <div className={styles.locationInfo}>
            <h2>El Bosque</h2>
            <h3>Boulevard Bellavista La Florida, Local 145, Santiago, RM.</h3>
            <h3>Todos los días: 07:00 - 20:00</h3>
            <h3>+56912345678</h3>
          </div>
        </div>
        <div className={styles.locationCard}>
          <Image
            src='/images/carousel/2.jpg'
            alt='Imagen 2 de Carrusel'
            width={800}
            height={300}
            className={styles.locationImage}
          ></Image>
          <div className={styles.locationInfo}>
            <h2>Providencia</h2>
            <h3>Boulevard Bellavista La Florida, Local 145, Santiago, RM.</h3>
            <h3>Todos los días: 07:00 - 20:00</h3>
            <h3>+56912345678</h3>
          </div>
        </div>
        <div className={styles.locationCard}>
          <Image
            src='/images/carousel/2.jpg'
            alt='Imagen 2 de Carrusel'
            width={800}
            height={300}
            className={styles.locationImage}
          ></Image>
          <div className={styles.locationInfo}>
            <h2>San Miguel</h2>
            <h3>Boulevard Bellavista La Florida, Local 145, Santiago, RM.</h3>
            <h3>Todos los días: 07:00 - 20:00</h3>
            <h3>+56912345678</h3>
          </div>
        </div>
      </div>
    </>
  );
}
