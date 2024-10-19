import React from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";

export default function Story() {
  return (
    <div className={styles.storySection}>
      <div className={styles.storyCard}>
        <Image src="/images/story1.webp" alt="story1" width={800} height={300} className={styles.storyImage}></Image>
        <div className={styles.storyInfo}>
          <h2>Crafting the future of coffee</h2>
          <p>
            We are committed to innovation and equitable direct trade that plays an active role in every step of the
            supply chain, investing in individual producers across the globe. We recognize that a producer&apos;s
            dedication and years of knowledge are fundamental to the caliber and character of the coffees we&apos;re
            obsessed with and known for.
          </p>
        </div>
      </div>
      <div className={styles.storyCard}>
        <div className={styles.storyInfo}>
          <h2>The other side of the cup</h2>
          <p>
            We&apos;re equally dedicated to our beloved customers. Every sip is a chance for connection. So, whether
            you&apos;re new to the world of coffee or a coffee connoisseur, we&apos;re stoked to be on this journey with
            you.
          </p>
        </div>
        <Image src="/images/story2.webp" alt="story2" width={800} height={300} className={styles.storyImage}></Image>
      </div>
    </div>
  );
}
