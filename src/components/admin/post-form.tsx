"use client";

import { createPost, updatePost } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/utils/image-upload";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Save, Loader2 } from "lucide-react";
import { Post } from "@prisma/client"; // Prisma tipini kullanıyoruz

// Form artık opsiyonel olarak bir "post" verisi alabilir
interface PostFormProps {
  post?: Post | null; 
}

export function PostForm({ post }: PostFormProps) {
  // Düzenleme modu mu?
  const isEditing = !!post;
  
  // Hangi aksiyon çalışacak?
  const action = isEditing ? updatePost : createPost;

  return (
    <form action={action} className="space-y-8 bg-card border p-6 rounded-xl shadow-sm">
      
      {/* Güncelleme için ID'yi gizli olarak gönderiyoruz */}
      {isEditing && <input type="hidden" name="id" value={post.id} />}

      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {isEditing ? "Yazıyı Düzenle" : "Yeni Yazı Oluştur"}
        </h2>
        <Button type="submit" size="lg" className="gap-2">
          <Save className="w-4 h-4" />
          {isEditing ? "Güncelle" : "Kaydet & Yayınla"}
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* SOL KOLON */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">Başlık</Label>
            <Input 
              name="title" 
              id="title" 
              placeholder="Başlık..." 
              required 
              className="text-lg"
              defaultValue={post?.title || ""} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select name="category" defaultValue={post?.category || "Software"}>
                <SelectTrigger>
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Software">Yazılım</SelectItem>
                  <SelectItem value="Aviation">Havacılık</SelectItem>
                  <SelectItem value="Blockchain">Blockchain / SUI</SelectItem>
                  <SelectItem value="Electronics">Elektronik</SelectItem>
                  <SelectItem value="Personal">Kişisel</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="tags">Etiketler</Label>
                <Input 
                  name="tags" 
                  id="tags" 
                  placeholder="React, Tutorial..." 
                  defaultValue={post?.tags || ""} 
                />
             </div>
          </div>

          <div className="space-y-4 border rounded-lg p-4 bg-background/50">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="published" className="text-base">Yayınla</Label>
                <p className="text-xs text-muted-foreground">Aktif edilirse blog sayfasında görünür.</p>
              </div>
              {/* Switch defaultChecked özelliğini kullanır */}
              <Switch name="published" id="published" defaultChecked={post?.published || false} />
            </div>
            <div className="flex items-center justify-between">
               <div className="space-y-0.5">
                <Label htmlFor="featured" className="text-base">Öne Çıkar (Vitrin)</Label>
                <p className="text-xs text-muted-foreground">Listede en üstte vurgulu görünür.</p>
              </div>
              <Switch name="featured" id="featured" defaultChecked={post?.featured || false} />
            </div>
          </div>
        </div>

        {/* SAĞ KOLON */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-base">Kapak Görseli</Label>
            <div className="bg-background rounded-lg">
               {/* Resim varsa defaultValue ile yüklüyoruz */}
               <ImageUpload name="coverImage" defaultValue={post?.coverImage || ""} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Kısa Açıklama (SEO)</Label>
            <Textarea 
              name="description" 
              id="description" 
              placeholder="Özet..." 
              className="h-32 resize-none leading-relaxed" 
              defaultValue={post?.description || ""}
            />
          </div>
        </div>
      </div>

      {/* ALT KISIM */}
      <div className="space-y-2 pt-4 border-t">
        <Label htmlFor="content" className="text-lg">İçerik (Markdown)</Label>
        <Textarea 
          name="content" 
          id="content" 
          placeholder="# Merhaba Dünya..." 
          className="min-h-[500px] font-mono text-sm leading-relaxed p-6" 
          required
          defaultValue={post?.content || ""}
        />
      </div>
    </form>
  );
}