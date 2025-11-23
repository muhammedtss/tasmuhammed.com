"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// DİKKAT: İlk parametre 'prevState' eklendi. useActionState buna ihtiyaç duyar.
export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;

  // Şifre kontrolü (.env dosyasındaki ile eşleşiyor mu?)
  if (password === process.env.ADMIN_SECRET) {
    const cookieStore = await cookies();
    
    // 1 hafta geçerli cookie
    cookieStore.set("admin-token", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });

    // Başarılı olursa yönlendir (try-catch bloğuna gerek yok, redirect hata fırlatır)
  } else {
    // Yanlışsa hata mesajı dön
    return { error: "Hatalı şifre! Lütfen tekrar deneyin." };
  }
  
  // Redirect işlemi fonksiyonun en sonunda, try-catch dışında olmalı
  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
  redirect("/");
}