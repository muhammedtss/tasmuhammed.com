import { getGuestbookEntriesPublic } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export async function HomeGuestbookSection() {
  // Veritabanından mesajları çek
  const messages = await getGuestbookEntriesPublic();
  const recentMessages = messages.slice(0, 3); // Sadece en son 3 mesajı al

  return (
    <section className="py-24 px-4 border-t border-primary/10 bg-background/50 backdrop-blur-sm relative overflow-hidden">
      {/* Arka plan süslemesi */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container max-w-6xl mx-auto">
        {/* Başlık ve Buton */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter flex items-center gap-3 justify-center md:justify-start">
              <MessageSquare className="text-primary h-6 w-6" />
              Visitor Notes
            </h2>
            <p className="text-muted-foreground">
              Dijital bahçemden geçenlerin bıraktığı izler.
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2 border-primary/20 hover:bg-primary/10">
            <Link href="/guestbook">
              Mesaj Bırak / Tümünü Gör <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mesaj Kartları Grid'i */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentMessages.length === 0 ? (
            // Eğer hiç mesaj yoksa bu görünür
            <div className="col-span-3 text-center py-16 border border-dashed border-primary/20 rounded-xl bg-card/30">
              <p className="text-muted-foreground text-lg mb-4">Henüz kimse bir not bırakmamış.</p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/guestbook">İlk Yazan Sen Ol ✨</Link>
              </Button>
            </div>
          ) : (
            // Mesajlar varsa bunlar görünür
            recentMessages.map((msg) => (
              <Card key={msg.id} className="p-6 bg-card/40 border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-1 group">
                <Quote className="h-8 w-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
                <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed mb-6 min-h-[80px]">
                  "{msg.content}"
                </p>
                <div className="flex items-center gap-3 border-t border-primary/5 pt-4">
                  <Avatar className="h-8 w-8 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {msg.author.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{msg.author}</h4>
                    <p className="text-[10px] text-muted-foreground">Ziyaretçi</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}