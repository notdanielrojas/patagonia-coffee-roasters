import "./styles/globals.css";
import styles from "./styles/styles.module.css";
import { LogoPCR } from "@/components/logo";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Page Title",
  description: "Page Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} antialiased`}>
                  <main className=''>
            <Link href='/' target='blank' className={styles.logoPCR}>
              <LogoPCR />
            </Link>
            <div className={styles.navBar}>
              <Link href='/' target='blank'>
                {" "}
                <h1 className={styles.menuItem}>Coffee</h1>{" "}
              </Link>
              <Link href='/' target='blank'>
                {" "}
                <h1 className={styles.menuItem}>Reviews</h1>{" "}
              </Link>
              <Link href='/' target='blank'>
                {" "}
                <h1 className={styles.menuItem}>Locations</h1>{" "}
              </Link>
              <Link href='/' target='blank'>
                {" "}
                <h1 className={styles.menuItem}>Story</h1>{" "}
              </Link>
            </div>
            {children}
          </main>
          <footer className={styles.footerInfo}>
            <h1>Este es el futuro Footer</h1>
          </footer>
              </body>
    </html>
  );
}
