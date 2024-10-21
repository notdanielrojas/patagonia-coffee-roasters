import { useState } from "react";
import styles from "../styles/styles.module.css";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Swal from "sweetalert2";
import Image from "next/image";

export default function PostForm() {
  const { user } = useUser();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [image_url, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image_url.trim() || !title.trim() || !description.trim() || !user?.id) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://backendpatagonia-production.up.railway.app/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          image_url,
          title,
          description,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      setError(null);
      setImageUrl("");
      setTitle("");
      setDescription("");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your post was posted successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      router.push("/posts");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.UserPostSection}>
      <div className={styles.postSection}>
        <div className={styles.titleContainer}>
          <h2>
            Love Our Products?
            <br /> Share Your Experience with the Community!
          </h2>
          <Image
            src='/images/jpg/post.jpg'
            alt='Picture of a Coffee Barman'
            width={850}
            height={800}
            className={styles.postUserImage}
            priority
          />
        </div>
        <form onSubmit={handleSubmit} className={styles.postForm}>
          <label htmlFor='image_url'>Image</label>
          <input
            type='text'
            id='image_url'
            name='image_url'
            placeholder='Enter the image URL here'
            required
            autoComplete='off'
            className={styles.postFormInput}
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Enter your title here'
            required
            autoComplete='off'
            className={styles.postFormInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            name='description'
            placeholder='Write a description'
            required
            autoComplete='off'
            minLength={10}
            maxLength={255}
            className={styles.postFormInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type='submit' className={styles.postButton} disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
