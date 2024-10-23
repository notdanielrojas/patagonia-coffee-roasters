import { Coffee } from "@/types/coffeeTypes";

const BASE_URL = "https://fake-coffee-api.vercel.app/api";

async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`Failed to fetch. Status: ${response.status}`);
  }
  return response.json();
}

export async function getCoffeeList(): Promise<Coffee[]> {
  const response = await fetch(`${BASE_URL}`, {
    method: "GET",
  });

  return handleResponse(response);
}

export const getCoffee = async (id: number): Promise<Coffee> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};
