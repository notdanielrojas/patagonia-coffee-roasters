import "./styles/globals.css";
import { Poppins } from "next/font/google";
import { Nav } from "@/app/components/Nav";
import { LogoPCR } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patagonia Coffee",
  description: "Welcome to Patagonia Coffee Roasters",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} antialiased`}>
        <main>
          <UserProvider>
            <CartProvider>
              <LogoPCR />
              <Nav />
              {children}
            </CartProvider>
          </UserProvider>
          <Footer />
        </main>
      </body>
    </html>
  );
}
