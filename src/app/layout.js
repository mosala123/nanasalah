import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./animations.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "صدقة جارية - في الذكرى الطيبة",
  description: "موقع مكرس لتكريم الذكريات والعطاء في الذكرى الطيبة",
  keywords: "صدقة, تبرع, خير, ذكرى طيبة",
  robots: "index, follow",
  author: "   محمد ابراهيم   ",
  openGraph: {
    title: "صدقة جارية",
    description: "موقع مكرس لتكريم الذكريات والعطاء",
    url: "https://example.com",
    siteName: "صدقة جارية",
    images: [{ url: "/og-image.png", width: 800, height: 600 }],
    locale: "ar-EG",
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
