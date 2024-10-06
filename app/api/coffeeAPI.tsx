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

export async function getCoffee(name: string) {
  const response = await fetch(
    `https://fake-coffee-api.vercel.app/api/${name}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coffee details.");
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("The response is not in JSON format.");
  }
}
