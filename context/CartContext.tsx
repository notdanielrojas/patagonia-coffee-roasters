// Habilita el modo "cliente" en Next.js, permitiendo que el componente use funciones específicas del cliente.
"use client";

// Importa las dependencias necesarias de React.
import React, { createContext, useContext, useState } from "react";

// Define una interfaz para un elemento en el carrito de compras, con sus propiedades específicas.
interface CartItem {
  id: number; // Identificador único del producto.
  name: string; // Nombre del producto.
  price: number; // Precio del producto.
  quantity: number; // Cantidad del producto en el carrito.
  image_url: string; // URL de la imagen del producto.
}

// Define una interfaz para el contexto del carrito, que incluye el estado del carrito y las funciones para modificarlo.
interface CartContextType {
  cart: CartItem[]; // Estado del carrito, un array de elementos del tipo CartItem.
  setCart: (cart: CartItem[]) => void; // Función para actualizar el estado del carrito.
  addToCart: (item: Omit<CartItem, "quantity">) => void; // Función para agregar un producto al carrito.
  removeFromCart: (id: number) => void; // Función para eliminar un producto del carrito por su id.
  clearCart: () => void; // Función para vaciar el carrito.
  incrementQuantity: (id: number) => void; // Función para incrementar la cantidad de un producto.
  decrementQuantity: (id: number) => void; // Función para decrementar la cantidad de un producto.
}

// Crea un contexto para el carrito, inicializándolo con un valor indefinido.
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define el proveedor del contexto del carrito, que permitirá que los componentes hijos accedan al estado del carrito.
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Crea el estado del carrito usando useState, inicializado como un array vacío.
  const [cart, setCart] = useState<CartItem[]>([]);

  // Define la función para agregar un producto al carrito.
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      // Busca si el producto ya existe en el carrito.
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Si el producto ya existe, incrementa su cantidad.
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      // Si el producto no existe, agrégalo al carrito con cantidad 1.
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Define la función para eliminar un producto del carrito por su id.
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id)); // Filtra los elementos que no tienen el id especificado.
  };

  // Define la función para vaciar el carrito.
  const clearCart = () => {
    setCart([]); // Establece el carrito como un array vacío.
  };

  // Define la función para incrementar la cantidad de un producto específico en el carrito.
  const incrementQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) => (cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
    );
  };

  // Define la función para decrementar la cantidad de un producto en el carrito.
  const decrementQuantity = (id: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((cartItem) => (cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)) // Reduce la cantidad.
          .filter((cartItem) => cartItem.quantity > 0) // Elimina productos con cantidad cero.
    );
  };

  // Retorna el proveedor del contexto, que proporciona el estado y las funciones del carrito a los componentes hijos.
  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Define un hook personalizado para acceder al contexto del carrito.
export const useCart = (): CartContextType => {
  const context = useContext(CartContext); // Obtiene el contexto del carrito.
  if (!context) {
    // Lanza un error si el hook se usa fuera de un CartProvider.
    throw new Error("useCart must be used within a CartProvider");
  }
  return context; // Retorna el contexto si está disponible.
};
