import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("👀 BEKÇİ GÖRDÜ: ", request.nextUrl.pathname);

  // Admin paneline gidenleri kontrol et
  if (request.nextUrl.pathname.startsWith("/admin")) {
    
    // Zaten login sayfasındaysa karışma
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin-token");

    if (!token) {
      console.log("⛔ GİRİŞ YOK! Login'e atılıyor...");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    } else {
      console.log("✅ GİRİŞ İZNİ VAR.");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};