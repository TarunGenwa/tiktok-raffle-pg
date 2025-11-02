import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpinWin Raffles",
  description: "Instant win competitions - Swipe to explore and spin to win prizes!",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overscroll-none">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none`}
        style={{ overscrollBehavior: 'none' }}
      >
        {children}
      </body>
    </html>
  );
}
