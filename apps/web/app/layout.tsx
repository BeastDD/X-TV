import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";

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
      <body className={cn(
        geistSans.variable,
        geistMono.variable,
        "bg-black text-white antialiased font-sans"
      )}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
