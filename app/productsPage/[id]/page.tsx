// app/coffee/[id]/page.tsx
import React from "react";
import { getCoffee } from "@/app/api/coffeeAPI";

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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh", fontSize: "3rem" }}>
        Under construction ⚠️⛔
      </div>
    );
  } catch (error) {
    console.error("Error fetching coffee details:", error);
    return <p>Error loading coffee details. Please try again later.</p>;
  }
};

export default CoffeePage;
