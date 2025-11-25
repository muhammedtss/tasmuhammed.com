import { getPost } from "@/lib/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

// Next.js 15: params artık bir Promise, bu yüzden tipi böyle tanımlıyoruz
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  // 1. params'ı await ediyoruz (Next.js 15 kuralı)
  const { slug } = await params; 
  
  // 2. Veriyi çekiyoruz
  const post = await getPost(slug);

  // 3. Post yoksa 404 sayfasına at
  if (!post) {
    notFound();
  }

  // Okuma süresi hesaplama
  const calculateReadTime = (text: string) => {
    if (!text) return 1;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <article className="min-h-screen pb-20 bg-background">
      {/* Hero / Kapak Görseli */}
      <div className="relative w-full h-[40vh] md:h-[50vh] min-h-[400px]">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
        )}
        
        {/* Üst Bilgiler */}
        <div className="absolute inset-0 flex flex-col justify-end container max-w-4xl mx-auto pb-12 px-4 z-10">
            <Link href="/blog">
                <Button variant="ghost" className="text-white/80 hover:text-white mb-6 pl-0 hover:bg-transparent group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Blog'a Dön
                </Button>
            </Link>
            
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {post.category}
                    </Badge>
                    <span className="text-white/80 text-sm font-medium flex items-center gap-1">
                         <Clock className="w-3.5 h-3.5" /> {calculateReadTime(post.content)} dk okuma
                    </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight shadow-sm">
                    {post.title}
                </h1>
                
                {post.description && (
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-light">
                      {post.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-white/70 text-sm pt-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString('tr-TR', { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                </div>
            </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="container max-w-3xl mx-auto px-4 mt-12">
        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed font-normal text-foreground/90">
                {post.content}
            </div>
        </div>

        {/* Etiketler */}
        {post.tags && (
            <div className="mt-12 pt-8 border-t flex flex-wrap gap-2">
                {post.tags.split(',').map(tag => (
                    <div key={tag} className="flex items-center text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-md border border-secondary">
                        <Tag className="w-3 h-3 mr-2" />
                        {tag.trim()}
                    </div>
                ))}
            </div>
        )}
      </div>
    </article>
  );
}