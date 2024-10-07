"use client";
import { useState, useEffect } from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

export default function Cart() {
  const { cart } = useCart();
  const [savedCart, setSavedCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setSavedCart(JSON.parse(storedCart) as CartItem[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className={styles.cartSection}>
      <h2>Carrito de Compras</h2>
      {savedCart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Imagen</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {savedCart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <Image src={item.image_url} alt={item.name} width={200} height={200} />
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>1</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
