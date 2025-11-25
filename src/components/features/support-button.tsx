  "use client";

  import { Coffee } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { cn } from "@/lib/utils";
  import Link from "next/link"; // Next.js link importu, asChild ile uyumluluk için

  interface SupportButtonProps {
    className?: string;
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
    minimal?: boolean; // Sadece ikon göstermek için
  }

  export function SupportButton({ 
    className, 
    variant = "outline", 
    size = "default",
    minimal = false 
  }: SupportButtonProps) {
    // 👇 BURAYI KENDİ KULLANICI ADINLA DEĞİŞTİR
    const username = "muhammedtss"; 

    return (
      <Button 
        variant={variant}
        size={size}
        className={cn(
          "gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 dark:border-orange-900/40 dark:text-orange-400 dark:hover:bg-orange-900/20 transition-all",
          className
        )}
        asChild
      >
        <Link 
          href={`https://buymeacoffee.com/${username}`} 
          target="_blank" 
          // Dış linkler için güvenlik (referrer policy)
          rel="noopener noreferrer"
          aria-label="Buy me a coffee"
        >
          <Coffee className="h-4 w-4" />
          {!minimal && <span>Buy me a Coffee</span>}
        </Link>
      </Button>
    );
  }