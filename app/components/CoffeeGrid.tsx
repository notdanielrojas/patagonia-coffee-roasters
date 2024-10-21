"use client";

import CoffeeCard from "./CoffeeCard";
import { useState } from "react";
import styles from "../styles/styles.module.css";
import { Coffee } from "@/types/coffeeTypes";

interface CoffeeGridProps {
  coffeeList: Coffee[];
}

const ITEMS_PER_PAGE = 6;

export function CoffeeGrid({ coffeeList }: CoffeeGridProps) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredCoffeeList = searchText
    ? coffeeList.filter((coffee) => coffee.name.toLowerCase().includes(searchText.toLowerCase()))
    : coffeeList;

  const totalPages = Math.ceil(filteredCoffeeList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCoffees = filteredCoffeeList.slice(startIndex, endIndex);

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
            placeholder='Example: Harvest Moon, Andean Almond, Sumatra Blend, Chilean Charm.'
            id='coffeeName'
            className={styles.productGridFormInput}
          />
        </form>
        {filteredCoffeeList.length === 0 && searchText && (
          <div className={styles.noResults}>No results found for &quot;{searchText}&quot;.</div>
        )}
        <div className={styles.productGridSection}>
          <div className={styles.productGridItems}>
            {currentCoffees.map((data) => (
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
          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
