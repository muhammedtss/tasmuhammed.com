import { getPost, clapPost } from "@/lib/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { MarkdownRenderer } from "@/components/features/markdown-renderer";
import { ClapButton } from "@/components/features/clap-button";

type Props = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  const calculateReadTime = (text: string) => {
    if (!text) return 1;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <article className="min-h-screen pb-20 bg-background">
      
      {/* --- HERO / KAPAK BÖLÜMÜ (YENİLENMİŞ YAPI) --- */}
      {/* flex ve min-h kullanarak içeriğin taşmasını engelliyoruz */}
      <div className="relative w-full min-h-[60vh] flex flex-col justify-end overflow-hidden">
        
        {/* 1. Arkaplan Resmi (En altta sabit) */}
        <div className="absolute inset-0 z-0">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover brightness-[0.3]" 
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-primary/20 via-background to-background" />
          )}
          {/* Ekstra karartma gradienti (yazıların okunması için) */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* 2. İçerik Alanı (Relative - Yani yazı uzadıkça alan da uzar) */}
        <div className="relative z-10 container max-w-4xl mx-auto px-4 pb-16 pt-32 md:pt-40">
            
            {/* Geri Dön Butonu */}
            <div className="mb-8">
                <Link href="/blog">
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 pl-0 gap-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Blog'a Dön
                    </Button>
                </Link>
            </div>

            {/* Meta Bilgiler ve Başlık */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
                
                {/* Kategori ve Süre */}
                <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 text-sm font-medium">
                        {post.category}
                    </Badge>
                    <span className="text-white/80 text-sm font-medium flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-md backdrop-blur-sm">
                         <Clock className="w-3.5 h-3.5" /> {calculateReadTime(post.content)} dk okuma
                    </span>
                </div>
                
                {/* Başlık */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] shadow-sm text-balance">
                    {post.title}
                </h1>
                
                {/* Açıklama (Description) */}
                {post.description && (
                  <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-light border-l-2 border-primary/50 pl-4">
                      {post.description}
                  </p>
                )}

                {/* Tarih */}
                <div className="flex items-center gap-2 text-white/60 text-sm font-mono pt-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.createdAt.toISOString()}>
                        {new Date(post.createdAt).toLocaleDateString('tr-TR', { 
                            year: 'numeric', month: 'long', day: 'numeric' 
                        })}
                    </time>
                </div>
            </div>
        </div>
      </div>

      {/* --- İÇERİK BÖLÜMÜ --- */}
      <div className="container max-w-3xl mx-auto px-4 mt-16">
        
        {/* Markdown İçerik */}
        <MarkdownRenderer content={post.content} />

        {/* --- ALKIŞ BUTONU --- */}
        <div className="mt-20 mb-10 flex flex-col items-center gap-4 py-10 border-t border-b border-primary/10 bg-gradient-to-b from-secondary/5 to-transparent rounded-2xl">
           <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
              <span className="animate-pulse">✨</span> Bu yazıyı faydalı buldun mu?
           </p>
           <ClapButton 
              id={post.id} 
              initialCount={post.claps} 
              onClap={clapPost} 
            />
        </div>

        {/* Etiketler */}
        {post.tags && (
            <div className="flex flex-wrap gap-2 pb-10">
                {post.tags.split(',').map(tag => (
                    <div key={tag} className="flex items-center text-xs font-medium text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full border border-secondary hover:border-primary/40 hover:text-primary transition-all cursor-default">
                        <Tag className="w-3 h-3 mr-1.5" />
                        {tag.trim()}
                    </div>
                ))}
            </div>
        )}
      </div>
    </article>
  );
}