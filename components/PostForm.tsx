"use client";

import { useEffect, useState } from "react";
import styles from "../app/styles/styles.module.css";
import { getCoffeeList } from "../app/api/coffeeAPI";

interface Coffee {
  image_url: string;
  name: string;
}

export default function PostForm() {
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const coffees = await getCoffeeList();
        console.log("Coffee List:", coffees);
        setCoffeeList(coffees);
      } catch (err) {
        setError("Failed to fetch coffee list.");
      }
    };
    fetchCoffees();
  }, []);

  const handleCoffeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = coffeeList.find((coffee) => coffee.name === event.target.value);
    setSelectedCoffee(selectedProduct || null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedCoffee || !review || !rating) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: selectedCoffee.name,
          review,
          rating,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }
      console.log("Review posted successfully:", data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className={styles.postSection}>
      <form onSubmit={handleSubmit} className={styles.postForm}>
        <label htmlFor='product'>Choose a Product</label>
        <select name='product' id='product' className={styles.selectProductForm} onChange={handleCoffeeChange}>
          <option value=''>-- Choose a product --</option>
          {coffeeList.map((producto) => (
            <option key={producto.name} value={producto.name}>
              {producto.name}
            </option>
          ))}
        </select>

        {selectedCoffee && (
          <div className={styles.postImageContainer}>
            <img src={selectedCoffee.image_url} alt={selectedCoffee.name} className={styles.postImage} />
          </div>
        )}

        <label htmlFor='review'>Your Review</label>
        <input
          type='text'
          id='review'
          name='review'
          placeholder='Write your review here'
          required
          minLength={100}
          maxLength={1000}
          autoComplete='off'
          className={styles.postFormInput}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <label htmlFor='rating'>Rate</label>
        <select
          name='rating'
          id='rating'
          className={styles.postSelectScore}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value='' disabled hidden>
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

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
