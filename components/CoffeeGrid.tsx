"use client";
import CoffeeCard from "./CoffeeCard";
import { useState } from "react";
import styles from "../app/styles/styles.module.css";

interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
  region: string;
  image_url: string;
  weight: number;
  flavor_profile: string[];
  grind_option: string[];
  roast_level: number;
}

interface CoffeeGridProps {
  coffeeList: Coffee[];
}

export function CoffeeGrid({ coffeeList }: CoffeeGridProps) {
  const [searchText, setSearchText] = useState("");

  const filteredCoffeeList = coffeeList.filter((coffee) => coffee.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
      <div className={styles.productGridTitle}>
        <h3>Find Your Coffee</h3>
      </div>
      <div className={styles.productGridForm}>
        <form className={styles.productGridFormContent} onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='coffeeName'>Type the coffee that you are looking for.</label>
          <input
            type='text'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Harvest Moon, Andean Almond, Sumatra Blend.'
            id='coffeeName'
            className={styles.productGridFormInput}
          />
        </form>
      </div>
      <div className={styles.productGridSection}>
        <div className={styles.productGridItems}>
          {filteredCoffeeList.map((data) => (
            <CoffeeCard
              id={data.id}
              image_url={data.image_url}
              name={data.name}
              key={data.id}
              description={data.description}
              price={data.price}
              region={data.region}
              weight={data.weight}
              flavor_profile={data.flavor_profile}
              grind_option={data.grind_option}
              roast_level={data.roast_level}
            />
          ))}
        </div>
      </div>
    </>
  );
}
