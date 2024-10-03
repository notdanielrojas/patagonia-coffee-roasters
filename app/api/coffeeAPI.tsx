const FAKE_COFFEE_API = "https://fake-coffee-api.vercel.app/api";

interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: number;
  flavor_profile: string[];
  grind_option: string[];
  roast_level: string;
  image_url: string;
}

export async function getCoffeeList(): Promise<Coffee[]> {
  try {
    const response = await fetch(FAKE_COFFEE_API);
    if (!response.ok) {
      throw new Error(`Error fetching coffee list: ${response.statusText}`);
    }
    const data = await response.json();

    if (!Array.isArray(data.results)) {
      throw new Error("Expected data.results to be an array");
    }

    const coffeeList = await Promise.all(
      data.results.map(async (coffee: { name: string }) => {
        const coffeeData = await getCoffee(coffee.name);
        return {
          id: coffeeData.id,
          name: coffeeData.name,
          description: coffeeData.description || "",
          price: coffeeData.price || 0,
          region: coffeeData.region || "",
          weight: coffeeData.weight || 0,
          flavor_profile: coffeeData.flavor_profile || [],
          grind_option: coffeeData.grind_option || [],
          roast_level: coffeeData.roast_level || "",
          image_url: coffeeData.image_url || "",
        };
      })
    );

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
