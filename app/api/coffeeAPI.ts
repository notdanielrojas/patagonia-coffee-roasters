import { Coffee } from "@/types/coffeeTypes";

const BASE_URL = "https://fake-coffee-api.vercel.app/api";

export async function getCoffeeList() {
  const response = await fetch(`${BASE_URL}`, {
    method: "GET",
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!response.ok) {
    throw new Error("Failed to fetch coffee list");
  }

  const coffees: Coffee[] = await response.json();
  return coffees;
}

export const getCoffee = async (id: number): Promise<Coffee> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!response.ok) {
    throw new Error(`Failed to fetch coffee with ID ${id}`);
  }

  const data: Coffee = await response.json();
  return data;
};
