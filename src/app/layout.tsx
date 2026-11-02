import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  fallback: ["Impact", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Caspria – Modern Marketing Solutions",
  description:
    "Caspria helps brands grow with bold strategy, stunning design, and performance-driven marketing.",
  keywords: ["marketing", "branding", "digital marketing", "Caspria"],
  openGraph: {
    title: "Caspria – Modern Marketing Solutions",
    description:
      "Caspria helps brands grow with bold strategy, stunning design, and performance-driven marketing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${anton.variable} ${inter.className}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
