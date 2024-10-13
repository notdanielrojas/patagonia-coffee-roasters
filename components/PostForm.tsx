"use client";

import { useEffect, useState } from "react";
import styles from "../app/styles/styles.module.css";
import { getCoffeeList } from "../app/api/coffeeAPI";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";

interface Coffee {
  image_url: string;
  name: string;
}

interface DecodedToken {
  user_id: number;
}

export default function PostForm() {
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [user_id, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

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

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);
        setUserId(decoded.user_id);
      } catch (err) {
        setError("Failed to decode token");
      }
    }
  }, []);

  const handleCoffeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = coffeeList.find((coffee) => coffee.name === event.target.value);
    setSelectedCoffee(selectedProduct || null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user_id || !selectedCoffee || !review || !rating) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id,
          selected_coffee: selectedCoffee.name,
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
      setSelectedCoffee(null);
      setReview("");
      setRating(null);
      alert("Review posted successfully!");
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
            <Image
              src={selectedCoffee.image_url}
              alt={selectedCoffee.name}
              className={styles.postImage}
              width={200}
              height={200}
            />
          </div>
        )}

        <label htmlFor='review'>Your Review</label>
        <input
          type='text'
          id='review'
          name='review'
          placeholder='Write your review here'
          required
          minLength={50}
          maxLength={255}
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
