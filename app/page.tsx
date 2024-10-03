import Image from "next/image";
import styles from "./styles/styles.module.css";
import "./styles/globals.css";
import { CoffeeCard } from "@/components/coffeeCard";

export default function Home() {
  return (
    <main className={styles.mainGrid}>
      <div className={styles.heroSection}>
        <div>
          <h1>Bienvenido a la Cafetería</h1>
        </div>
        <Image
          src='/images/carousel/2.jpg'
          alt='Imagen 2 de Carrusel'
          width='800'
          height='300'
        ></Image>
      </div>
      <div className={styles.infoSection}>
        <Image
          src='/images/info/direct-trade.avif'
          alt='Image of two hands shaking'
          width='100'
          height='100'
          className={styles.icon}
        />
        <Image
          src='/images/info/natural-process.webp'
          alt='Image of a leave'
          width='100'
          height='100'
          className=''
        />
        <Image
          src='/images/info/farm-level.avif'
          alt='Image of a farm'
          width='100'
          height='100'
          className=''
        />
        <h1 className={styles.textInfo}>
          Direct trade partnerships with producers
        </h1>
        <h1 className={styles.textInfo}>Paying premiums for quality</h1>
        <h1 className={styles.textInfo}>
          Investing in coffee communities and their environments
        </h1>
      </div>
      <div className={styles.bestSection}>
        <div>
          <h1>Nuestros más vendidos</h1>
        </div>
        <Image
          src='/images/carousel/1.jpg'
          alt='Imagen 1 de Carrusel'
          width='700'
          height='300'
          className={styles.coverImg}
        ></Image>
      </div>
    </main>
  );
}
