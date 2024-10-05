

export async function getCoffeeList() {
  const response = await fetch("https://fake-coffee-api.vercel.app/api");
  if (!response.ok) {
    throw new Error("Failed to fetch coffee list");
  }
  const coffees = await response.json();
  return coffees;
}
