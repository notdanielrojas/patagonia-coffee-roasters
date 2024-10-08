// app/api/coffeeAPI.ts
export async function getCoffeeList() {
  const response = await fetch("https://fake-coffee-api.vercel.app/api", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch coffee list");
  }

  const coffees = await response.json();
  return coffees;
}

export const getCoffee = async (id: number): Promise<any> => {
  const response = await fetch(`https://fake-coffee-api.vercel.app/api/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch coffee with ID ${id}`);
  }

  const data = await response.json();
  return data;
};
