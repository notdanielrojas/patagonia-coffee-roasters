import { CoffeeImage } from "@/components/CoffeeImage";
import { getCoffee } from "../api/coffeeAPI";
import styles from "../styles/styles.module.css";

export default async function CoffeePage({
  params,
}: {
  params: { coffeeName: string };
}) {
  const { coffeeName } = params;
  const coffeeObject = await getCoffee(coffeeName);

  return (
    <>
      <h1 className={styles.coffeePageTitle}>{coffeeName}</h1>
      <CoffeeImage
        image={coffeeObject.image_url}
        name={coffeeName}
      />
    </>
  );
}
