import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YEENKSLUXE | Premium Streetwear & Accessories",
  description: "Discover premium luxury apparel, armless tees, hoodies, and exclusive accessories at YEENKSLUXE. Where streetwear meets luxury.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
