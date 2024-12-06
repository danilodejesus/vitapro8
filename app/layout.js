import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Baner from "./components/Baner";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "VitaPro8 Colombia - Nos dedicamos a la fabricación y comercialización de productos para la salud y bienestar",
  description: "Nos dedicamos a la fabricación y comercialización de productos para la salud y bienestar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
