import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import Body from "@/Components/Body";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RTTMedia Management",
  description: "Management dashboard for RTTMedia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      </head>
      <body className={inter.className}>
        <Header />
        <Body>{children}</Body>
      </body>
    </html>
  );
}