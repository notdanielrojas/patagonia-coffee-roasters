"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import { IoBagCheckOutline } from "react-icons/io5";

export default function CheckoutPage() {
  const { cart, setCart, clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = JSON.parse(atob(token.split(".")[1]));
      setUser(userInfo);
    }

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCheckout = async () => {
    if (!user || !user.id) {
      setError("User not authenticated. Please log in.");
      return;
    }

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
        const message = `Failed to create order: ${response.status} ${response.statusText}`;
        throw new Error(message);
      }

      clearCart();
      localStorage.removeItem("cart");
      alert("Order created successfully!");
    } catch (error: any) {
      console.error("Checkout error:", error);
      setError(error.message || "Failed to create order");
    }
  };

  const totalGeneral = cart.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartSection}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your Cart is empty</p>
      ) : (
        <>
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
        </>
      )}
      <button onClick={handleCheckout} className={styles.cartButton}>
        Place Order <IoBagCheckOutline className={styles.cartIcon} />
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
