"use client";

import { CoffeeGrid } from "@/app/components/CoffeeGrid";
import React, { useEffect, useState } from "react";
import { getCoffeeList } from "../api/coffeeAPI";
import { Coffee } from "@/types/coffeeTypes";
import styles from "../styles/styles.module.css";

export default function Products() {
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCoffeeList = async () => {
      try {
        const data = await getCoffeeList();
        if (isMounted) setCoffeeList(data);
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error) {
            console.error("Failed to fetch coffee list:", err.message);
            setError("Error fetching coffee data. Please try again later.");
          } else {
            console.error("An unknown error occurred:", err);
            setError("Error fetching coffee data. Please try again later.");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCoffeeList();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p className={styles.loadingStatus}>Loading coffees...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <CoffeeGrid coffeeList={coffeeList} />
    </div>
  );
}
