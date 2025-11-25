import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Resim Yükleyici (Maksimum 4MB, sadece resim)
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Yükleme tamamlandı:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;