"use client";

import styles from "../app/styles/styles.module.css";
import { getCoffeeList } from "../app/api/coffeeAPI";
import { useEffect, useState } from "react";

interface Coffee {
  image_url: string;
  name: string;
}

export default function PostForm() {
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const coffees = await getCoffeeList();
        setCoffeeList(coffees);
      } catch (err) {
        setError("Ocurrió un error al cargar la lista de cafés.");
      }
    };
    fetchCoffees();
  }, []);

  const handleCoffeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = coffeeList.find(
      (coffee) => coffee.name === event.target.value
    );
    setSelectedCoffee(selectedProduct || null);
  };

  return (
    <div className={styles.postSection}>
      <form action='/login' method='post' className={styles.postForm}>
        <label htmlFor='producto'>Choose a Product</label>
        <select
          name='producto'
          id='producto'
          className={styles.selectProductForm}
          onChange={handleCoffeeChange}
        >
          <option value=''>-- Choose a product --</option>
          {coffeeList.map((producto) => (
            <option key={producto.name} value={producto.name}>
              {producto.name}
            </option>
          ))}
        </select>
        {selectedCoffee && (
          <div className={styles.postImageContainer}>
            <img
              src={selectedCoffee.image_url}
              alt={selectedCoffee.name}
              className={styles.postImage}
            />
          </div>
        )}
        <label htmlFor='producto'>Commentary</label>
        <input
          type='text'
          id='commentary'
          name='commentary'
          placeholder='Escríbe tu review aquí'
          required
          minLength={100}
          maxLength={1000}
          autoComplete='off'
          className={styles.postFormInput}
        />
        <label htmlFor='evaluacion'>Rate</label>
        <select
          name='evaluacion'
          id='evaluacion'
          className={styles.postSelectScore}
        >
          <option value='evaluacion' disabled hidden>
            -- Choose a rate --
          </option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <button type='submit' className={styles.postButton}>
          Post
        </button>
      </form>
      <div className={styles.postImageContainerDesktop}>
        {selectedCoffee && (
          <img
            src={selectedCoffee.image_url}
            alt={selectedCoffee.name}
            className={styles.postImageDesktop}
          />
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}{" "}
    </div>
  );
}
