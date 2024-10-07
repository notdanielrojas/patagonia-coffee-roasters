export async function getCoffeeList() {
  const response = await fetch("https://fake-coffee-api.vercel.app/api");
  if (!response.ok) {
    throw new Error("Failed to fetch coffee list");
  }
  const coffees = await response.json();
  return coffees;
}

interface CoffeePageProps {
  params: {
    coffeeName: string;
  };
}

export const getCoffee = async (id: number): Promise<any> => {
  const res = await fetch(`https://fake-coffee-api.vercel.app/api/1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  console.log("hola soy el" + data);
  return data;
};
