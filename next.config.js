/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode her zaman açık olmalı
  reactStrictMode: true,
  
  // Production'da console.log'ları temizle (Performans + Güvenlik)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    // Modern formatları destekle
    formats: ['image/avif', 'image/webp'],
    
    // Remote Patternler (Aynen korundu ve optimize edildi)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      }
    ],
  },
};

module.exports = nextConfig;