"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle"; // Tema butonu
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// MENÜ LİNKLERİ (Blog Eklendi)
const navItems = [
  { name: "Home", href: "/" },
  { name: "Lab", href: "/lab" },
  { name: "Stack", href: "/stack" },
  { name: "Blog", href: "/blog" }, // <-- YENİ
  { name: "Roadmap", href: "/roadmap" },
  { name: "Guestbook", href: "/guestbook" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-mono text-lg font-bold tracking-tighter text-foreground">
              MUHAMMED TAS
            </span>
          </Link>
        </div>

        {/* Desktop Navigation (Masaüstü) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary" // Aktif sayfa rengi
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Admin Girişi (Sadece masaüstünde görünür, silik durur) */}
          <Link href="/admin" className="text-muted-foreground hover:text-primary text-xs opacity-50 ml-4 hidden lg:inline">
            Admin
          </Link>
        </nav>

        {/* Sağ Taraf (Tema Butonu & Mobil Menü) */}
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground mr-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Online
          </div>

          {/* Tema Değiştirici */}
          <ModeToggle />

          {/* Mobile Menu (Hamburger) */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
                <SheetHeader>
                    <SheetTitle className="font-mono font-bold text-left ml-4">MENU</SheetTitle>
                </SheetHeader>
              <div className="flex flex-col space-y-4 py-4 pl-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary"
                        : "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}