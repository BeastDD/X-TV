import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "X TV",
  description: "Seamless TV-like experience for video content from X (Twitter).",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* Simple dark body like the reference version that loads reliably. Fonts optional. */}
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
