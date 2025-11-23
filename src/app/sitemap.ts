import { getPosts } from "@/lib/actions";
import { MetadataRoute } from "next";

// Geliştirme aşamasında localhost, canlıda gerçek domainin olacak
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Veritabanındaki tüm blog yazılarını çek
  const posts = await getPosts();

  // Blog url'lerini oluştur
  const postUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Statik sayfalar
  const routes = ["", "/lab", "/roadmap", "/stack", "/guestbook", "/blog"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1.0,
  }));

  return [...routes, ...postUrls];
}