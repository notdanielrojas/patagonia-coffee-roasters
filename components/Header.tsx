"use client";

import Image from "next/image";
import { LuShoppingCart } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import styles from "../app/styles/styles.module.css";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
interface HeaderProps {
  id: string;
  alt: string;
}

export function Header({ alt }: HeaderProps) {
  const { user } = useUser();
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <Link href='/'>
          <Image src={"/images/logo/pcr-logo.png"} alt={alt} width={200} height={150} />
        </Link>
      </div>
      <div className={styles.headerIcons}>
        <Link href={user ? "/profileValid" : "/login"}>
          <IoPersonSharp className={styles.headerIcon} />
        </Link>
        <Link href='/checkout' className={styles.cartIconContainer}>
          <LuShoppingCart className={styles.headerIcon} />
          {totalItems > 0 && <span className={styles.cartItemCount}>{totalItems}</span>}
        </Link>
      </div>
    </div>
  );
}

export function LogoPCR() {
  return <Header id='logo' alt='Patagonia Coffee Roasters Logo' />;
}
