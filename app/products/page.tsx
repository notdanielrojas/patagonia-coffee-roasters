import { CoffeeGrid } from "@/components/CoffeeGrid";
import React from "react";
import { getCoffeeList } from "../api/coffeeAPI";

type Props = {};

export default async function Products(props: Props) {
  try {
    const coffeeList = await getCoffeeList();
    return (
      <div>
        <CoffeeGrid coffeeList={coffeeList} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch coffee list:", error);
    return (
      <div>
        <h2>Error fetching coffee data. Please try again later.</h2>
      </div>
    );
  }
}
