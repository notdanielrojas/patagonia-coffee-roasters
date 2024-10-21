import Image from "next/image";
import styles from "./styles/styles.module.css";
import "./styles/globals.css";

export default function Home() {
  return (
    <main className={styles.mainGrid}>
      <div className={styles.heroSection}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroText}>We are Patagonia Coffee Roasters</h1>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src='/images/jpg/store1.jpg'
            alt='Image of a Coffee Store'
            width={800}
            height={300}
            className={styles.heroImage}
            quality={100}
          ></Image>
        </div>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.infoLeft}>
          <Image
            src='/images/info/direct-trade.avif'
            alt='Image of two hands shaking'
            width={800}
            height={300}
            className={styles.icon}
            quality={100}
          />
          <h1 className={styles.textInfo}>Direct trade partnerships with producers</h1>
        </div>
        <div className={styles.infoCenter}>
          <Image
            src='/images/info/natural-process.webp'
            alt='Image of a leave'
            width={800}
            height={300}
            className={styles.icon}
            quality={100}
          />
          <h1 className={styles.textInfo}>Paying premiums for quality</h1>
        </div>
        <div className={styles.infoRight}>
          {" "}
          <Image
            src='/images/info/farm-level.avif'
            alt='Image of a farm'
            width={800}
            height={300}
            className={styles.icon}
            quality={100}
          />
          <h1 className={styles.textInfo}>Investing in coffee communities and their environments</h1>
        </div>
      </div>
    </main>
  );
}
