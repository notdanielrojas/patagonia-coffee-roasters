import React from "react";
import Image from "next/image";
import styles from "../app/styles/styles.module.css";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { GiCoffeeBeans } from "react-icons/gi";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export interface CoffeeProps {
  id: number;
  image_url: string;
  name: string;
  description?: string;
  price: number;
  region: string;
  weight: number;
  flavor_profile: string[];
  grind_option: string[];
  roast_level: number;
}

const getRegionStyle = (region: string | undefined) => {
  switch (region) {
    case "Africa":
      return styles.africa;
    case "Asia Pacific":
      return styles.asiaPacific;
    case "Central America":
      return styles.centralAmerica;
    case "Middle East":
      return styles.middleEast;
    case "South America":
      return styles.southAmerica;
    default:
      return styles.defaultRegion;
  }
};

export default function CoffeeCard({ id, image_url, name, price, region, flavor_profile }: CoffeeProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, image_url, price });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${name} has been added to your cart!`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <div className={styles.coffeeCard}>
      <Link href={`/productsPage/${id}`}>
        <Image alt={name} src={image_url} width={800} height={800} className={styles.coffeeCardImage} priority />
      </Link>
      <div className={styles.coffeeCardInfoContainer}>
        <h2 className={styles.coffeCardTitle}>{name}</h2>
        <p className={styles.coffeeCardInfo}>{flavor_profile.join(" , ")}</p>

        <button className={`${styles.coffeeCardInfoButton} ${getRegionStyle(region)}`}>{region}</button>
        <p className={styles.coffeeCardInfo}>${price.toFixed(2)}</p>
      </div>
      <div className={styles.coffeeCardButtons}>
        <Link href={`/productsPage/${id}`}>
          <button className={styles.coffeeCardButton}>
            More <GiCoffeeBeans className={styles.coffeeCardIcon} />
          </button>
        </Link>
        <button className={styles.coffeeCardButton} onClick={handleAddToCart}>
          Add <LiaCartArrowDownSolid className={styles.coffeeCardIcon} />
        </button>
      </div>
    </div>
  );
}
