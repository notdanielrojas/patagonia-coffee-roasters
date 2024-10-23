"use client";

import { getCoffee } from "@/app/api/coffeeAPI";
import styles from "@/app/styles/styles.module.css";
import { useCart } from "@/context/CartContext";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { PiKeyReturnFill } from "react-icons/pi";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Coffee } from "@/types/coffeeTypes";

interface CoffeePageProps {
  params: {
    id: string;
  };
}

const CoffeePage: React.FC<CoffeePageProps> = ({ params }) => {
  const coffeeId = Number(params.id);
  const { addToCart } = useCart();
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const data = await getCoffee(coffeeId);
        console.log("Coffee data:", data);
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Coffee not found");
        }
        setCoffeeList(data);
      } catch (error) {
        console.error(error);
        setError("Error fetching coffee details");
      }
    };

    fetchCoffee();
  }, [coffeeId]);

  const handleAddToCart = (item: Coffee) => {
    addToCart({ id: item.id, name: item.name, image_url: item.image_url, price: item.price });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${item.name} has been added to your cart!`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (coffeeList.length === 0) {
    return <p className={styles.loadingStatus}>Loading coffee details...</p>;
  }

  return (
    <div className={styles.productInfoPageSection}>
      {coffeeList.map((item: Coffee) => (
        <div key={item.id} className={styles.productInfoRow}>
          <div className={styles.productInfoPageImageContainer}>
            <img src={item.image_url} alt={`Picture of a bag of ${item.name} coffee`} className={styles.productInfoImage} />
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
                  <td>{item.weight}gr</td>
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
              <button className={styles.coffeeCardButton} onClick={() => handleAddToCart(item)}>
                Add to Cart <LiaCartArrowDownSolid className={styles.coffeeCardIcon} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoffeePage;
