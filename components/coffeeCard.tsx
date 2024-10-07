import React, { useContext } from "react";
import Image from "next/image";
import styles from "../app/styles/styles.module.css";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import Link from "next/link";

interface CoffeeProps {
  id: number;
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

export default function CoffeeCard({ image_url, id, name, description, price, region, weight, flavor_profile, grind_option, roast_level }: CoffeeProps) {
  return (
    <div className={styles.coffeeCard}>
      <Link href={`/${id}`}>
        <Image alt={name} src={image_url} width={300} height={300} className={styles.coffeCardImage} />
      </Link>

      <h2 className={styles.coffeCardTitle}>{name}</h2>
      <p className={styles.coffeeCardInfo}>Flavor Profile: {flavor_profile.join(", ")}</p>
      <p className={styles.coffeeCardInfo}>Roast Level: {roast_level}</p>
      <p className={styles.coffeeCardInfo}>Price: ${price.toFixed(2)}</p>
      <button className={styles.coffeeCardButton}>
        Add <LiaCartArrowDownSolid className={styles.coffeeCardIcon} />
      </button>
    </div>
  );
}
