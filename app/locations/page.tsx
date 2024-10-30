"use client";

import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";
import locationsData from "../data/locations.json";

export default function Locations() {
  const [location, setLocation] = useState("santiago");

  return (
    <>
      <div className={styles.locationSection}>
        <div className={styles.locationTitleContainer}>
          <h1 className={styles.locationTitle}>We are close to you</h1>
          <p>
            We are constantly striving to be closer to you with our growing network of stores, offering a wide variety
            of coffee products and an inviting space for all coffee enthusiasts.
          </p>
        </div>

        <div className={styles.locationImageContainer}></div>
      </div>
      <div className={styles.locationNamesContainer}>
        <h2> Patagonia Coffee Roasters </h2>
        <div className={styles.locationNames}>
          <button onClick={() => setLocation("santiago")} className={styles.locationClickable}>
            Santiago
          </button>
          <button onClick={() => setLocation("vinaDelMar")} className={styles.locationClickable}>
            Viña del Mar
          </button>
        </div>
      </div>
      <div className={styles.locationCards}>
        {(location === "santiago" ? locationsData.santiago : locationsData.vinaDelMar).map((loc) => (
          <div key={loc.id} className={styles.locationCard}>
            <Image
              src={loc.image}
              alt={`store${loc.id}`}
              width={800}
              height={300}
              className={styles.locationImage}
              quality={100}
            />
            <div className={styles.locationInfo}>
              <h2>{loc.name}</h2>
              <h3>{loc.address}</h3>
              <h3>{loc.hours}</h3>
              <h3>Tel: {loc.phone}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
