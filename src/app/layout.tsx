import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PowerList - Win Every Day",
  description: "A minimal productivity app implementing Andy Frisella's Power List concept",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
