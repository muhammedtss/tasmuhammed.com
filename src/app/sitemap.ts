import { getPosts } from "@/lib/actions";
import { MetadataRoute } from "next";

// Varsa Post tipini import et, yoksa burada basitçe tanımla ki IDE sana yardım etsin.
interface Post {
  slug: string;
  updatedAt?: string | Date; // CMS genelde bunu verir
  createdAt: string | Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. URL'i Environment Variable'dan al.
  // Localhost'ta veya Vercel preview ortamlarında doğru domaini dinamik olarak verir.
  // Fallback olarak production domainini bırakabilirsin ama process.env öncelikli olmalı.
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tasmuhammed.com";

  let posts: Post[] = [];

  try {
    // 2. Veri çekme işlemini garantiye al.
    // getPosts'un dönüş tipinin Post[] olduğunu varsayıyorum.
    posts = await getPosts();
  } catch (error) {
    // Sadece console'a basma, monitoring aracın varsa (Sentry vb.) oraya da gönder.
    console.error("❌ Sitemap: Blog postları çekilemedi:", error);
    // Hata durumunda sitemap patlamamalı, en azından statik sayfaları dönmeli.
  }

  // 3. Blog URL'lerini oluştur
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    // Varsa güncelleme tarihini kullan, yoksa oluşturulma tarihini. SEO için kritik.
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Statik Sayfalar
  // Not: Statik sayfalar için 'lastModified'ı 'new Date()' yapmak yerine,
  // eğer sayfa içeriği gerçekten sık değişmiyorsa bu alanı boş geçmek veya
  // deploy tarihini bir env variable olarak basmak daha dürüst bir yaklaşımdır.
  // Ancak basitlik adına şimdilik deploy anını (new Date) kabul ediyoruz.
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/lab",
    "/roadmap",
    "/stack",
    "/guestbook",
    "/blog",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...postUrls];
}