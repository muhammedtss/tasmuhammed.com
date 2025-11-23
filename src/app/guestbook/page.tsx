import { getGuestbookEntriesPublic } from "@/lib/actions";
// DİKKAT: Süslü parantez { } içinde import ediyoruz.
import { GuestbookForm } from "@/components/features/guestbook-form"; 
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default async function GuestbookPage() {
  const messages = await getGuestbookEntriesPublic();

  return (
    <div className="container min-h-screen py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center gap-3">
          <MessageSquare className="h-8 w-8" /> Hatıra Defteri
        </h1>
        <p className="text-muted-foreground mt-2">
          Ziyaretçilerin bırakmış olduğu notlar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <GuestbookForm /> 
        </div>

        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold border-b border-primary/20 pb-2 mb-4">Onaylı Mesajlar ({messages.length})</h2>
          
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Henüz onaylanmış mesaj yok.</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="flex items-start gap-4 p-4 rounded-lg bg-card/40 border border-border/50">
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary">{message.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-foreground">{message.author}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{message.content}</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}