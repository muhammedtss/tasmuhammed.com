import { HeroSection } from "@/components/features/hero";
import { HomeAboutSection } from "@/components/features/home-about";
import { HomeGuestbookSection } from "@/components/features/home-guestbook";
import { HomeProjectsSection } from "@/components/features/home-projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      
      {/* 1. GİRİŞ (Hero) */}
      <HeroSection />

      {/* 2. ÖNE ÇIKAN PROJELER */}
      <HomeProjectsSection />

      {/* 3. HAKKIMDA (Profil Kartı) */}
      <HomeAboutSection />
      
      {/* 4. ZİYARETÇİ NOTLARI (Burada Çağırıyoruz) */}
      <HomeGuestbookSection />
      
    </main>
  );
}
