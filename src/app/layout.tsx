import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

// Font Optimizasyonu: 'swap' özelliği metnin yüklenmesini engellemez (LCP Puanı için kritik)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap" 
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  display: "swap" 
});

// Production Domain'i (OG Image'lar için zorunlu)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tasmuhammed.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL), // <-- KRİTİK EKLEME
  title: {
    default: "Muhammed Taş | Developer & Drone Pilot",
    template: "%s | Muhammed Taş",
  },
  description: "Dijital bahçem, projelerim, blog yazılarım ve havacılık tutkum üzerine kişisel portfolyom.",
  keywords: ["Next.js", "React", "Drone Pilotu", "Yazılım Mühendisliği", "SUI Blockchain", "Blog", "Full Stack Developer"],
  authors: [{ name: "Muhammed Taş", url: BASE_URL }],
  creator: "Muhammed Taş",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: BASE_URL,
    title: "Muhammed Taş - Kişisel Portfolyo & Blog",
    description: "Yazılım ve havacılık üzerine notlar.",
    siteName: "Muhammed Taş",
    images: [
      {
        url: "/opengraph-image.png", // Next.js otomatik oluşturacak
        width: 1200,
        height: 630,
        alt: "Muhammed Taş Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Taş | Developer & Drone Pilot",
    description: "Yazılım ve havacılık üzerine notlar.",
    creator: "@muhammedtss", // Varsa twitter kullanıcı adın
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased text-foreground",
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          
          {/* Vercel Entegrasyonları */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}