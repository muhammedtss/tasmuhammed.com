"use client";

import { useActionState } from "react"; // Next.js 15 için doğrusu budur
import { login } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyhole, Loader2 } from "lucide-react";

// Başlangıç durumu
const initialState = {
  error: "",
};

export default function LoginPage() {
  // useActionState: [state, action, isPending] döndürür
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Girişi</CardTitle>
          <CardDescription>
            Kokpite girmek için gizli şifreyi girin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
            
            {/* Hata Mesajı */}
            {state?.error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center animate-in fade-in slide-in-from-top-1">
                {state.error}
              </div>
            )}

            {/* Buton (isPending direkt burada kullanılabilir) */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Giriş Yapılıyor...
                </>
              ) : (
                "Giriş Yap"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}