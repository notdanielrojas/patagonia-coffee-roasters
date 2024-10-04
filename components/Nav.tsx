import Link from "next/link";
import styles from "../app/styles/styles.module.css";

export const Nav = () => {
  return (
    <div className={styles.navBar}>
      <h1>
        <Link href='/'>Home</Link>
      </h1>
      <h1>
        <Link href='/products'>Products</Link>
      </h1>
      <h1>
        <Link href='/locations/'>Locations</Link>
      </h1>
      <h1>
        <Link href='/posts/post'>Posts</Link>
      </h1>
      <h1>
        <Link href='/story/'>Story</Link>
      </h1>
    </div>
  );
};

/* interface NavLink {
  title: string;
  path: string;
}

export const Nav = () => {
  const navLinks: NavLink[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Products",
      path: "/products/",
    },
    {
      title: "Locations",
      path: "/locations/",
    },
    {
      title: "Reviews",
      path: "/reviews/",
    },
    {
      title: "Story",
      path: "/story",
    },
  ];

  return (
    <div className={styles.navBar}>
      {navLinks.map(({ path, title }) => (
        <Link key={title} href={path}>
          <h1 className={styles.menuItem}>{title}</h1>
        </Link>
      ))}
    </div>
  );
};
  */