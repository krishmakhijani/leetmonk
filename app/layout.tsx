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
  title: "LeetMonk",
  description: "Leetmonk created by Krish Makhijani",
  icons: {
    icon: [
      { url: '/monk.png' },
      { url: '/monk.png', sizes: '16x16', type: 'image/png' },
      { url: '/monk.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/monk.png' }
    ],
    other: {
      rel: 'apple-touch-icon',
      url: '/monk.png',
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {children}

    </body>
    </html>
  );
}
