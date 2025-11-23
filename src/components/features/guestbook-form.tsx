"use client"; 

import { createGuestbookEntry } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

// Form Gönderim Butonu
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full mt-4 gap-2">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Gönderiliyor...
        </>
      ) : (
        <>
          <Send className="h-4 w-4" /> Not Bırak
        </>
      )}
    </Button>
  );
}

// Ana Form Bileşeni
export function GuestbookForm() {
  const [key, setKey] = useState(0); // Formu sıfırlamak için anahtar

  // TypeScript hatasını çözen ara fonksiyon
  async function handleAction(formData: FormData) {
    await createGuestbookEntry(formData);
    setKey((prev) => prev + 1); // İşlem bitince formu temizle (yeniden render et)
  }

  return (
    <Card className="w-full bg-card/50 backdrop-blur border-primary/20"> 
      <CardHeader>
        <CardTitle>Bana Bir Not Bırakın</CardTitle>
        <CardDescription>
          Mesajınız yönetici tarafından onaylandıktan sonra herkese görünür olacaktır.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* key={key} sayesinde form her gönderimde sıfırlanır */}
        <form key={key} action={handleAction} className="space-y-4">
          <Input 
            name="author" 
            placeholder="Mahlasınız (Nickname)" 
            required 
            className="bg-background/50" 
          />
          <Textarea 
            name="content" 
            placeholder="Buraya mesajınızı yazın..." 
            required 
            rows={4}
            className="bg-background/50" 
          />
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}