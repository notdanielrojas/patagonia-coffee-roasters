import React from "react";
import Image from "next/image";
import styles from "../app/styles/styles.module.css";

interface CoffeeProps {
  image_url: string;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: number;
  flavor_profile: string[];
  grind_option: string[];
  roast_level: number;
}

export default function CoffeeCard({
  image_url,
  name,
  description,
  price,
  region,
  weight,
  flavor_profile,
  grind_option,
  roast_level,
}: CoffeeProps) {
  return (
    <div className={styles.coffeeCard}>
      <Image
        alt={name}
        src={image_url}
        width={300}
        height={300}
        className={styles.coffeCardImage}
      />
      <h2 className={styles.coffeCardTitle}>{name}</h2>
      <p className={styles.coffeCardInfo}>
        Flavor Profile: {flavor_profile.join(", ")}
      </p>
      <p className={styles.coffeCardInfo}>Roast Level: {roast_level}</p>
      <p className={styles.coffeCardInfo}>Price: ${price.toFixed(2)}</p>
      <button className={styles.coffeCardButton}>Agregar al carro</button>
    </div>
  );
}
