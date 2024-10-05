"use client";

import React, { useState, useEffect } from "react";

type Product = {
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
};

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fake-coffee-api.vercel.app/api");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return ProductsList();
}

/* export interface Coffee {
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
} */
/* 
export async function getCoffeeList(): Promise<Coffee[]> {
  try {
    const response = await fetch(FAKE_COFFEE_API);
    if (!response.ok) {
      throw new Error(`Error fetching coffee list: ${response.statusText}`);
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Expected data to be an array");
    }

    const coffeeList = data.map((coffee: Coffee) => ({
      id: coffee.id,
      name: coffee.name,
      description: coffee.description || "",
      price: coffee.price || 0,
      region: coffee.region || "",
      weight: coffee.weight || 0,
      flavor_profile: coffee.flavor_profile || [],
      grind_option: coffee.grind_option || [],
      roast_level: coffee.roast_level || 0,
      image_url: coffee.image_url || "",
    }));

    return coffeeList;
  } catch (error) {
    console.error("Failed to fetch coffee list:", error);
    throw error;
  }
}

export async function getCoffee(name: string) {
  const response = await fetch(`${FAKE_COFFEE_API}/coffee/${name}`);
  if (!response.ok) {
    throw new Error(`Error fetching coffee: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
 */
