import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CompareProvider } from "@/context/CompareContext";
import { ShortlistProvider } from "@/context/ShortlistContext";
import CompareDrawer from "@/components/compare/CompareDrawer";
import AICounselorWidget from "@/components/ai/AICounselorWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NextBschool — AI-Powered MBA College Decision Engine India",
  description: "Find your dream MBA college in India. AI college predictor, verified student reviews, 3-way college comparison, CAT/XAT cutoffs, fee structures, and placement reality checks.",
  keywords: "MBA colleges in India, CAT percentile predictor, IIM Ahmedabad, FMS Delhi, MBA reviews, MBA fees, MBA comparison, CAT cutoffs, XAT, SNAP, NMAT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900">
        <CompareProvider>
          <ShortlistProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CompareDrawer />
            <AICounselorWidget />
          </ShortlistProvider>
        </CompareProvider>
      </body>
    </html>
  );
}
