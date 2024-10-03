import "./styles/globals.css";
import styles from "./styles/styles.module.css";
import { LogoPCR } from "@/components/Logo";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Nav } from "@/components/Nav";

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
        <main>
          <Link href='/' target='blank' className={styles.logoPCR}>
            <LogoPCR />
          </Link>
          <Nav />
          {children}
        </main>
        <footer className={styles.footerInfo}>
          <h1>Este es el futuro Footer</h1>
        </footer>
      </body>
    </html>
  );
}
