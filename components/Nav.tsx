import Link from "next/link";
import styles from "../app/styles/styles.module.css";

interface navLinks {
  title: string;
  path: string;
}

interface navIcons {
  title: string;
  path: string;
}

export const Nav = () => {
  const navLink = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Coffee",
      path: "/coffee/1",
    },
    {
      title: "Locations",
      path: "/locations",
    },
    {
      title: "Reviews",
      path: "/reviews/1",
    },
    {
      title: "Story",
      path: "/story",
    },
  ];

  const navIcon = [
    {
      title: "hola ",
      path: "",
    },

    { title: "hola", path: "" },
  ];

  return (
    <div className={styles.navBar}>
      {navLink.map(({ path, title }) => (
        <Link key={title} href={path} passHref>
          <h1 className={styles.menuItem}>{title}</h1>
        </Link>
      ))}
    </div>
  );
};
