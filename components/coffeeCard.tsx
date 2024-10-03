import Link from "next/link";
import Image from "next/image";
import styles from "./styles/styles.module.css";
import "./styles/globals.css";

interface CoffeeCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: number;
  flavor_profile: string[];
  grind_option: string[];
  roast_level: number;
  image_url: string;
}

export function CoffeeCard({
  id,
  name,
  description,
  price,
  region,
  weight,
  flavor_profile,
  grind_option,
  roast_level,
  image_url,
}: CoffeeCardProps) {
  return (
    <Link href={name} className={styles.coffeeCard} rel='noopener noreferrer'>
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Region: {region}</p>
      <p>Weight: {weight}g</p> <p>Roast Level: {roast_level}</p>
      <Image
        src={image_url}
        alt={`Image of ${name}`}
        width={150}
        height={100}
      />{" "}
    </Link>
  );
}
