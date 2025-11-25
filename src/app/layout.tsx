import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider"; // YENİ IMPORT

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

// ... importlar aynı kalsın ...

export const metadata: Metadata = {
  title: {
    default: "Muhammed Taş | Developer & Drone Pilot",
    template: "%s | Muhammed Taş", // Alt sayfalarda "Blog | Muhammed Taş" yazar
  },
  description: "Dijital bahçem, projelerim, blog yazılarım ve havacılık tutkum üzerine kişisel portfolyom.",
  keywords: ["Next.js", "React", "Drone Pilotu", "Yazılım Mühendisliği", "SUI Blockchain", "Blog"],
  authors: [{ name: "Muhammed Taş", url: "https://tasmuhammed.com" }],
  creator: "Muhammed Taş",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://tasmuhammed.com",
    title: "Muhammed Taş - Kişisel Portfolyo & Blog",
    description: "Yazılım ve havacılık üzerine notlar.",
    siteName: "Muhammed Taş",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

// ... RootLayout fonksiyonu aynı kalsın ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // DİKKAT: className="dark" kaldırıldı, suppressHydrationWarning eklendi (Hata almamak için)
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased text-foreground",
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        {/* Siteyi ThemeProvider ile sarmalıyoruz */}
        <ThemeProvider
            attribute="class"
            defaultTheme="dark" // Varsayılan yine Dark olsun
            enableSystem
            disableTransitionOnChange
          >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
