import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import styles from "../app/styles/styles.module.css";
import Link from "next/link";

export function Header({ alt }: { id: string; alt: string }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <Link href='/'>
          <Image src={"/images/logo/pcr-logo.png"} alt={alt} width='200' height='150' />
        </Link>
      </div>
      <div className={styles.headerIcons}>
        <Link href='/login'>
          <IoPersonSharp className={styles.headerIcon} />
        </Link>
        <Link href='/cart'>
          <CiShoppingCart className={styles.headerIcon} />
        </Link>
      </div>
    </div>
  );
}

export function LogoPCR() {
  return <Header id='logo' alt='Patagonia Coffee Roasters Logo' />;
}
