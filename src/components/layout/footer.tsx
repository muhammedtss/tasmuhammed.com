import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container py-10 px-4 md:px-8 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* SOL TARAF: Marka ve Açıklama */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <h3 className="font-mono text-lg font-bold tracking-tighter text-foreground">
              DIGITAL HANGAR
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Yazılım mimarisi ve havacılık teknolojilerinin kesişim noktası.
              
            </p>
            <p className="text-xs text-muted-foreground/60 mt-4">
              © {currentYear} Muhammed Taş. Tüm hakları saklıdır.
            </p>
          </div>

          {/* SAĞ TARAF: Linkler ve Teknoloji İmzası */}
          <div className="flex flex-col items-center md:items-end gap-4">
            
            {/* Sosyal İkonlar */}
            <div className="flex items-center gap-4">
                <Link href="https://github.com/muhammedtss" target="_blank" className="p-2 rounded-full bg-muted/50 hover:bg-foreground hover:text-background transition-all duration-300">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                </Link>
                <Link href="https://www.linkedin.com/in/muhammed-taş-9a6376329" target="_blank" className="p-2 rounded-full bg-muted/50 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="https://twitter.com/ichbinmamy" target="_blank" className="p-2 rounded-full bg-muted/50 hover:bg-sky-500 hover:text-white transition-all duration-300">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                </Link>
                <Link href="mailto:muhammed0tas@gmail.com" className="p-2 rounded-full bg-muted/50 hover:bg-red-500 hover:text-white transition-all duration-300">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                </Link>
            </div>

            {/* Teknoloji İmzası */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Built with</span>
              <a href="https://nextjs.org" target="_blank" className="font-medium hover:text-foreground transition-colors underline underline-offset-2">Next.js 15</a>
              <span>&</span>
              <a href="https://tailwindcss.com" target="_blank" className="font-medium hover:text-foreground transition-colors underline underline-offset-2">Tailwind</a>
              <span className="mx-1">in Elazığ ✈️</span>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}