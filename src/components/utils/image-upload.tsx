"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  name: string; // Form input adı (örn: imageUrl)
  defaultValue?: string; // Varsa eski resim
}

export function ImageUpload({ name, defaultValue = "" }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue);

  // Resim varsa Önizleme Modu
  if (imageUrl) {
    return (
      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-primary/20 group">
        <Image 
          src={imageUrl} 
          alt="Uploaded image" 
          fill 
          className="object-cover"
        />
        {/* Resmi Kaldır Butonu */}
        <button
          type="button"
          onClick={() => setImageUrl("")}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
        
        {/* Gizli Input (Forma URL'i gönderir) */}
        <input type="hidden" name={name} value={imageUrl} />
      </div>
    );
  }

  // Resim yoksa Yükleme Modu
  return (
    <div className="w-full border-2 border-dashed border-primary/20 rounded-lg p-4 flex justify-center bg-background/50">
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            setImageUrl(res[0].url);
            console.log("Dosya URL:", res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`Hata: ${error.message}`);
        }}
        appearance={{
          button: "bg-primary text-primary-foreground hover:bg-primary/90",
          allowedContent: "text-muted-foreground text-xs"
        }}
      />
    </div>
  );
}