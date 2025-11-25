import prisma from "@/lib/prisma";
import { PostForm } from "@/components/admin/post-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Yazıyı veritabanından çekiyoruz
  const post = await prisma.post.findUnique({
    where: { id }
  });

  if (!post) {
    return <div>Yazı bulunamadı.</div>;
  }

  return (
    <div className="container py-10 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link href="/admin">
          <Button variant="ghost" className="gap-2 pl-0">
            <ArrowLeft className="w-4 h-4" /> Admin Paneline Dön
          </Button>
        </Link>
      </div>
      
      {/* Formu "post" verisiyle besliyoruz, böylece düzenleme modunda açılıyor */}
      <PostForm post={post} />
    </div>
  );
}