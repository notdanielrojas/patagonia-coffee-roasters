import { useState } from "react";
import Link from "next/link";
import styles from "../app/styles/styles.module.css";

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.hamburgerMenu}>
      <button onClick={toggleMenu} className={styles.hamburgerButton}>
        ☰
      </button>
      {isOpen && (
        <nav className={styles.dropdownMenu}>
          <h1>
            <Link href='/' className={styles.menuItemHamburguer} onClick={toggleMenu}>
              Home
            </Link>
          </h1>
          <h1>
            <Link href='/products' className={styles.menuItemHamburguer} onClick={toggleMenu}>
              Products
            </Link>
          </h1>
          <h1>
            <Link href='/locations/' className={styles.menuItemHamburguer} onClick={toggleMenu}>
              Locations
            </Link>
          </h1>
          <h1>
            <Link href='/posts/' className={styles.menuItemHamburguer} onClick={toggleMenu}>
              Posts
            </Link>
          </h1>
          <h1>
            <Link href='/story/' className={styles.menuItemHamburguer} onClick={toggleMenu}>
              Story
            </Link>
          </h1>
        </nav>
      )}
    </div>
  );
};
