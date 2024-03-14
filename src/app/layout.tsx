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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Body>{children}</Body>
      </body>
    </html>
  );
}
