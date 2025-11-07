import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavSidebar from "./components/NavSidebar";
import Header from "./components/Header";

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
        {/* Global Header */}
        <Header />

        <div className="flex h-screen bg-black overflow-hidden">
          {/* Left Sidebar - Navigation (Desktop Only) */}
          <aside className="hidden md:block w-20 bg-black border-r border-gray-800 flex-shrink-0 pt-16">
            <NavSidebar />
          </aside>

          {/* Mobile Navigation - Always render NavSidebar for mobile bottom nav */}
          <div className="md:hidden">
            <NavSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
