import Image from "next/image";
import styles from "../styles/styles.module.css";

interface CoffeeImageProps {
  image: string;
  name: string;
}

export const CoffeeImage: React.FC<CoffeeImageProps> = ({ image, name }) => {
  return (
    <Image
      src={image}
      alt={name}
      width={300}
      height={300}
      className={styles.coffeCardImage}
    />
  );
};
