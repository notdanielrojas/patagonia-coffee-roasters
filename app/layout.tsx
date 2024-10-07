import "./styles/globals.css";
import { Poppins } from "next/font/google";
import { Nav } from "@/components/Nav";
import { LogoPCR } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

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
          <CartProvider>
            <LogoPCR />
            <Nav />
            {children}
          </CartProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
