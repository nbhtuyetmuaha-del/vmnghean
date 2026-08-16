import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { landingPageData } from "@/data/cms";
import Header from "@/components/Header";
import Tracking from "@/components/Tracking";

// Sử dụng font Inter cực kỳ hiện đại và dễ đọc
const inter = Inter({ 
  subsets: ["latin", "vietnamese"], 
  variable: '--font-inter',
  display: 'swap',
});

// Lấy Title tự động từ file CMS
export const metadata: Metadata = {
  title: `${landingPageData.carModel.name} | ${landingPageData.dealership.name}`,
  description: landingPageData.carModel.slogan,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
        <Tracking />
        <Header />
        <main className="pt-16 sm:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
