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
    data-overlays="bottom"
    crossOrigin="anonymous"
  />

  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-VQE5R4HP9E"
  />

  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VQE5R4HP9E');
      `,
    }}
  />
</head>

  <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
  <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 md:px-6">
    <Header />
    <main className="flex-1 py-8">{children}</main>
    <Footer />
  </div>
</body>
</html>
  );
}