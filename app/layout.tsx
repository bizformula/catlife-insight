import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://catlife.happy-insight.com"),
  title: {
    default: "Catlife Insight",
    template: "%s | Catlife Insight",
  },
  description: "고양이 사료와 간식의 성분표를 쉽게 읽고 비교하는 곳",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="ko"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
  <head>
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3781508655873635"
      crossOrigin="anonymous"
    />
  </head>

  <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
    ...
  </body>
</html>
  );
}