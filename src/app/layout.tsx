import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopEZ | Online Shopping Made Effortless",
  description: "Experience the future of online shopping with seamless navigation, detailed product info, and secure checkout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
