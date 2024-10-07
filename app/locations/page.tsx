import React from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";

export default function Locations() {
  return (
    <>
      <div className={styles.locationSection}>
        <div>
          <h1 className={styles.locationTitle}>We are close to you.</h1>
        </div>
        <Image
          src='/images/store5.jpg'
          alt='store5'
          width={800}
          height={300}
        ></Image>
      </div>
      <div className={styles.locationNames}>
        <h3>Patagonia Coffee Roasters</h3>
        <h3 className={styles.locationSubNames}>Santiago</h3>
      </div>
      <div className={styles.locationCards}>
        <div className={styles.locationCard}>
          <Image
            src='/images/store2.jpg'
            alt='store2'
            width={800}
            height={300}
            className={styles.locationImage}
          ></Image>
          <div className={styles.locationInfo}>
            <h2>Providencia</h2>
            <h3>Av. Providencia 1234, Local 25, Santiago, RM.</h3>
            <h3>Open Hours: Monday to Friday: 07:30am - 07:00pm</h3>
            <h3>Teléfono: +56987654321</h3>
          </div>
        </div>
        <div className={styles.locationCard}>
          <Image
            src='/images/store3.jpg'
            alt='store3'
            width={800}
            height={300}
            className={styles.locationImage}
          ></Image>
          <div className={styles.locationInfo}>
            <h2>Santiago</h2>
            <h3>Paseo Ahumada 456, Santiago Centro, RM.</h3>
            <h3>Open Hours: Everyday: 08:00am - 09:00pm</h3>
            <h3>Teléfono: +56911223344</h3>
          </div>
        </div>
        <div className={styles.locationCard}>
          <Image
            src='/images/store4.jpg'
            alt='store4'
            width={800}
            height={300}
            className={styles.locationImage}
          ></Image>
          <div className={styles.locationInfo}>
            <h2>La Dehesa</h2>
            <h3>Av. La Dehesa 987, Local 5, Lo Barnechea, RM.</h3>
            <h3>Open Hours: Everyday: 07:00om - 08:00pm</h3>
            <h3>Teléfono: +56999887766</h3>
          </div>
        </div>
      </div>
    </>
  );
}
