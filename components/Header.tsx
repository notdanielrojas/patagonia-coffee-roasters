import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import styles from "../app/styles/styles.module.css";

export function Header({ alt }: { id: string; alt: string }) {
  return (
    <div className={styles.header}>
      <Image
        src={"/images/logo/pcr-logo.png"}
        alt={alt}
        width='200'
        height='150'
      />
      <div>
        <CiShoppingCart className={styles.headerIcons} />
        <IoPersonSharp className={styles.headerIcons} />
      </div>
    </div>
  );
}

export function LogoPCR() {
  return <Header id='logo' alt='Patagonia Coffee Roasters Logo' />;
}
