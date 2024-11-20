import type { Metadata } from "next";
import {Inter as FontSans} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});


export const metadata: Metadata = {
  title: "MyChat App",
  description: "Chat with the world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-backgroun font-sans antialiased")}
      >
        {children}
      </body>
    </html>
  );
}
