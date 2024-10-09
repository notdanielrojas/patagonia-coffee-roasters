import React from "react";
import Image from "next/image";
import styles from "../app/styles/styles.module.css";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export interface CoffeeProps {
  id: number;
  image_url: string;
  name: string;
  description?: string;
  price: number;
  region?: string;
  weight?: number;
  flavor_profile?: string[];
  grind_option?: string[];
  roast_level?: number;
}

export default function CoffeeCard({
  id,
  image_url,
  name,
  price,
  description,
  region,
  weight,
  flavor_profile,
  grind_option,
  roast_level,
}: CoffeeProps) {
  const { addToCart } = useCart();

 const handleAddToCart = () => {
    addToCart({ id, name, image_url, price });
  };

  return (
    <div className={styles.coffeeCard}>
      <Link href={`/productsPage/${id}`}>
        <Image alt={name} src={image_url} width={300} height={300} className={styles.coffeCardImage} />
      </Link>
      <h2 className={styles.coffeCardTitle}>{name}</h2>
      <p className={styles.coffeeCardInfo}>Price: ${price.toFixed(2)}</p>
      <button className={styles.coffeeCardButton} onClick={handleAddToCart}>
        Add <LiaCartArrowDownSolid className={styles.coffeeCardIcon} />
      </button>
    </div>
  );
}
