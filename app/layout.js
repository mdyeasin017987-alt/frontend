import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import Navbar from "@/componet/navbar";
import Footer from "@/componet/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "100% Organic Coconut - SahyesNatural",
  description: "SahyesNatural is 100% organic coconut products provider. We provide fresh and pure coconut, coconut oil, coconut milk powder, and other coconut products.",
  openGraph: {
    title: "100% Organic Coconut - SahyesNatural",
    description: "SahyesNatural is 100% organic coconut products provider. We provide fresh and pure coconut, coconut oil, coconut milk powder, and other coconut products.",
    url: "https://sahyesnatural.com",
    siteName: "SahyesNatural",
    images: [
      {
        url: "https://res.cloudinary.com/zlegm9or/image/upload/v1785753338/file_0000000079a8820796d65473e5ef8fd3_1_geumii.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "100% Organic Coconut - SahyesNatural",
    description: "SahyesNatural is 100% organic coconut products provider. We provide fresh and pure coconut, coconut oil, coconut milk powder, and other coconut products.",
    images: [
      "https://res.cloudinary.com/zlegm9or/image/upload/v1785753338/file_0000000079a8820796d65473e5ef8fd3_1_geumii.png",
    ],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-poppins">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
