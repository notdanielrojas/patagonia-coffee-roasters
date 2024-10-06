import Image from "next/image";
import styles from "./styles/styles.module.css";
import "./styles/globals.css";

export default function Home() {
  return (
    <main className={styles.mainGrid}>
      <div className={styles.heroSection}>
        <div>
          <h1 className={styles.heroText}>
            Somos Patagonia Coffee Roasters
          </h1>
        </div>
        <Image
          src='/images/store1.jpg'
          alt='Imagen Story 1'
          width='800'
          height='300'
        ></Image>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.infoLeft}>
          <Image
            src='/images/info/direct-trade.avif'
            alt='Image of two hands shaking'
            width='100'
            height='100'
            className={styles.icon}
          />
          <h1 className={styles.textInfo}>
            Direct trade partnerships with producers
          </h1>
        </div>
        <div className={styles.infoCenter}>
          <Image
            src='/images/info/natural-process.webp'
            alt='Image of a leave'
            width='100'
            height='100'
            className={styles.icon}
          />
          <h1 className={styles.textInfo}>Paying premiums for quality</h1>
        </div>
        <div className={styles.infoRight}>
          {" "}
          <Image
            src='/images/info/farm-level.avif'
            alt='Image of a farm'
            width='100'
            height='100'
            className={styles.icon}
          />
          <h1 className={styles.textInfo}>
            Investing in coffee communities and their environments
          </h1>
        </div>
      </div>
    </main>
  );
}
