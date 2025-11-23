import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Admin panelini indeksleme!
    },
    sitemap: "https://seninsiten.com/sitemap.xml",
  };
}