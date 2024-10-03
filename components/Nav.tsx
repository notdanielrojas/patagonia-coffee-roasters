import Link from "next/link";
import styles from "../app/styles/styles.module.css";

export const Nav = () => {
  const navLink = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Coffee",
      link: "/coffee/1",
    },
    {
      name: "Locations",
      link: "/locations",
    },
    {
      name: "Reviews",
      link: "/reviews/1",
    },
    {
      name: "Story",
      link: "/story",
    },
  ];

  return (
    <div className={styles.navBar}>
      {navLink.map(({ link, name }) => (
        <Link key={name} href={link} passHref>
          <h1 className={styles.menuItem}>{name}</h1>
        </Link>
      ))}
    </div>
  );
};
