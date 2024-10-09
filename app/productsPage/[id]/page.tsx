import { getCoffee } from "@/app/api/coffeeAPI";
import Image from "next/image";
interface CoffeePageProps {
  params: {
    id: string;
  };
}

const CoffeePage: React.FC<CoffeePageProps> = async ({ params }) => {
  const coffeeId = Number(params.id);

  try {
    const coffee = await getCoffee(coffeeId);

    if (!coffee) {
      throw new Error("Coffee not found");
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2>Coffee Details</h2>

        {coffee.map(
          (item: {
            id: number;
            name: string;
            description: string;
            price: number;
            region: string;
            weight: number;
            flavor_profile: string[];
            grind_option: string[];
            roast_level: string[];
            image_url: string;
          }) => (
            <div key={item.id}>
              <Image src={item.image_url} alt='imagen' width={800} height={800}></Image>
              <p> {item.name} </p>
              <p> {item.description} </p>
              <p> {item.price} </p>
              <p> {item.region} </p>
              <p> {item.weight} </p>
              <p> {item.flavor_profile} </p>
              <p> {item.grind_option.join(" , ")} </p>
              <p> {item.roast_level} </p>
            </div>
          )
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching coffee details:", error);
    return <p>Error loading coffee details. Please try again later.</p>;
  }
};

export default CoffeePage;
