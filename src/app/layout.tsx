import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanika's Foodie Challenge | Fav & New Dishes 🍕",
  description: "Answer the trivia about Sanika's favorite/new dishes, spin the dinner wheel, and promise Vinit a treat!",
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
