import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { Roboto, Inter, Dancing_Script } from "next/font/google";

// Configure Inter font
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // title: "HitnFlop | Discover What’s Trending and What’s Not",
  title: "HitnFlop",
  description: "Explore reviews, ratings, and real-time verdicts on the latest movies, shows, music, and more. Stay updated with what’s a hit and what’s a flop — only on HitnFlop.",
  icons: {
    icon: '/assets/icons/Table Host.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
