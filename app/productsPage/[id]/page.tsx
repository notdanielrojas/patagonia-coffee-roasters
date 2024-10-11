/* "use client" */

import { getCoffee } from "@/app/api/coffeeAPI";
import Image from "next/image";
import styles from "@/app/styles/styles.module.css";
import { useCart } from "@/context/CartContext";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { PiKeyReturnFill } from "react-icons/pi";
import Link from "next/link";
interface CoffeePageProps {
  params: {
    id: string;
  };
}

const CoffeePage: React.FC<CoffeePageProps> = async ({ params }) => {
  const coffeeId = Number(params.id);
 /*  const { addToCart } = useCart(); */

  try {
    const coffee = await getCoffee(coffeeId);

    if (!coffee) {
      throw new Error("Coffee not found");
    }

    /* const handleAddToCart = (item: { id: number; name: string; image_url: string; price: number }) => {
      addToCart({ id: item.id, name: item.name, image_url: item.image_url, price: item.price });
    };
 */
    return (
      <div className={styles.productInfoPageSection}>
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
            roast_level: number;
            image_url: string;
          }) => (
            <div key={item.id} className={styles.productInfoRow}>
              <div className={styles.productInfoImage}>
                <Image src={item.image_url} alt='image' width={700} height={1000} />
              </div>
              <div className={styles.productInfoDetails}>
                <h2 className={styles.productInfoPageTitle}>Coffee Details</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Name:</strong>
                      </td>
                      <td>{item.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Description:</strong>
                      </td>
                      <td>{item.description}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Price:</strong>
                      </td>
                      <td>{item.price}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Region:</strong>
                      </td>
                      <td>{item.region}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Weight:</strong>
                      </td>
                      <td>{item.weight}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Flavor Profile:</strong>
                      </td>
                      <td>{item.flavor_profile.join(", ")}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Grind Option:</strong>
                      </td>
                      <td>{item.grind_option.join(", ")}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Roast Level:</strong>
                      </td>
                      <td>{"🔥".repeat(item.roast_level)}</td>
                    </tr>
                  </tbody>
                </table>
                <div className={styles.coffeeCardButtons}>
                  <Link href={`/products`}>
                    <button className={styles.coffeeCardButton}>
                      Go back <PiKeyReturnFill className={styles.coffeeCardIcon} />
                    </button>
                  </Link>
                 {/*  <button className={styles.coffeeCardButton} onClick={() => handleAddToCart(item)}>
                    Add to Cart <LiaCartArrowDownSolid className={styles.coffeeCardIcon} />
                  </button> */}
                </div>
              </div>
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
