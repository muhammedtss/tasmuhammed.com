import { HeroSection } from "@/components/features/hero-scene"; // Dosya adı hero-scene idi, dikkat et
import { HomeAboutSection } from "@/components/features/home-about";
import { HomeGuestbookSection } from "@/components/features/home-guestbook";
import { HomeProjectsSection } from "@/components/features/home-projects";

export default function Home() {
  
  // JSON-LD: Google'ın seni tanıması için yapısal veri
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammed Taş",
    "url": "https://tasmuhammed.com",
    "jobTitle": "Software Engineer & Drone Pilot",
    "worksFor": {
      "@type": "Organization",
      "name": "Fırat Üniversitesi Havacılık" // Veya kendi girişimin
    },
    "sameAs": [
      "https://github.com/muhammedtss",
      "https://linkedin.com/in/muhammedtas",
      "https://twitter.com/muhammedtss"
    ]
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Structured Data (Görünmez ama SEO için hayati) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. GİRİŞ (Hero) */}
      <HeroSection />

      {/* 2. ÖNE ÇIKAN PROJELER */}
      <HomeProjectsSection />

      {/* 3. HAKKIMDA (Profil Kartı) */}
      <HomeAboutSection />
      
      {/* 4. ZİYARETÇİ NOTLARI */}
      <HomeGuestbookSection />
      
    </main>
  );
}