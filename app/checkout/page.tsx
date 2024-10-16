"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import styles from "../styles/styles.module.css";
import { IoBagCheckOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart, setCart, clearCart } = useCart();
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
      const response = await fetch("http://localhost:5000/orders", {
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
      alert("Order created successfully 🎉!");
      setSuccess("Order created successfully!");
      setError(null);
    } catch (error: any) {
      console.error("Checkout error:", error);
      setError(error.message || "Failed to create order");
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
              <td>{item.quantity}</td>
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
