import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Statik dosyaları ve API'leri pas geç (Performans için kritik)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") || 
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Admin Kontrolleri (Mevcut Mantığın)
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    const token = request.cookies.get("admin-token");
    if (!token) {
      console.log("⛔ GİRİŞ YOK! Login'e atılıyor...");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    } else {
      console.log("✅ GİRİŞ İZNİ VAR.");
      // Admin login olmuşsa bakım modundan etkilenmemeli
      return NextResponse.next();
    }
  }

  // 3. Login sayfasına dokunma
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // 4. Bakım Modu Kontrolü
  // Middleware Prisma kullanamadığı için API'ye soruyoruz
  try {
    const checkUrl = new URL("/api/maintenance-check", request.url);
    const res = await fetch(checkUrl.toString(), { cache: 'no-store' }); 
    const data = await res.json();

    if (data.isMaintenance) {
      // Zaten bakım sayfasındaysak devam et (Loop engelleme)
      if (pathname === "/maintenance") {
        return NextResponse.next();
      }
      // Değilsek bakım sayfasına at (Rewrite URL'i değiştirmez, Redirect değiştirir)
      return NextResponse.rewrite(new URL("/maintenance", request.url));
    }
  } catch (error) {
    console.error("Maintenance check failed:", error);
  }

  // Bakım modu kapalıysa ve kullanıcı elle /maintenance'a gitmeye çalışıyorsa ana sayfaya at
  if (pathname === "/maintenance") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Tüm sayfaları kapsayacak şekilde güncellendi
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};