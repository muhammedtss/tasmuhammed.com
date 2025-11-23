import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <Frown className="h-16 w-16 text-primary" />
      </div>
      <h2 className="text-4xl font-bold tracking-tight mb-2">404 - Kaybolmuş Gibisin</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Aradığın sayfa bu dijital bahçenin sınırları dışında kalıyor veya taşınmış olabilir.
      </p>
      <Button asChild size="lg">
        <Link href="/">Ana Üsse Dön</Link>
      </Button>
    </div>
  );
}