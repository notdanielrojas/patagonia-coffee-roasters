"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import styles from "../styles/styles.module.css";
import { IoBagCheckOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const { cart, setCart, clearCart, incrementQuantity, decrementQuantity } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleCheckout = async () => {
    if (!user || !user.id) {
      console.log("Redirecting to login");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://backendpatagonia-production.up.railway.app/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          cart,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        const errorMessage = message || `Failed to create order: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      clearCart();
      localStorage.removeItem("cart");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Order created successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      setSuccess("Order created successfully!");
      router.push("/orders");
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Checkout error:", error);
        setError(error.message || "Failed to create order");
      } else {
        console.error("Checkout error:", error);
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const totalGeneral = cart.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return <p className={styles.checkoutMessage}>Your Cart is empty 🛒.</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.cartSection}>
      <h2>Shopping Cart</h2>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <Image src={item.image_url} alt={item.name} width={200} height={200} />
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button onClick={() => decrementQuantity(item.id)}>-</button> {item.quantity}{" "}
                <button onClick={() => incrementQuantity(item.id)}>+</button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.totalSection}>
        <strong>Total:</strong> ${totalGeneral.toFixed(2)}
      </div>
      <button onClick={handleCheckout} className={styles.cartButton} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"} <IoBagCheckOutline className={styles.cartIcon} />
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};

export default CheckoutPage;
