import { getPosts } from "@/lib/actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Sparkles, Hash } from "lucide-react";

export default async function BlogPage() {
  // DİKKAT: Burası getPost değil, getPosts (Çoğul)
  const posts = await getPosts();

  // Okuma süresi hesaplama
  const calculateReadTime = (text: string) => {
    if (!text) return 1;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Arkaplan Efekti */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="container py-24 px-4 max-w-7xl mx-auto">
        
        {/* Header Alanı */}
        <div className="flex flex-col items-center text-center gap-6 mb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary backdrop-blur-sm gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Digital Garden
          </Badge>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            Keşfet & Öğren
          </h1>
          
          <p className="text-muted-foreground md:text-xl max-w-2xl leading-relaxed text-balance">
            Yazılım mimarisi, SUI blockchain ekosistemi ve havacılık teknolojileri üzerine aldığım teknik notlar.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32 border border-dashed border-primary/10 rounded-3xl bg-card/30 backdrop-blur-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Henüz içerik eklenmedi</h3>
              <p className="text-muted-foreground mt-2 text-center max-w-md">
                Admin panelinden ilk yazını oluşturarak dijital bahçeni yeşertmeye başla.
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`} 
                className="group flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                <Card className="h-full bg-card/50 backdrop-blur-md border-primary/10 overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col rounded-2xl group-hover:-translate-y-1">
                  
                  {/* Görsel Alanı */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/50 to-background border-b border-primary/5">
                         <Hash className="w-12 h-12 text-muted-foreground/10" />
                      </div>
                    )}
                    
                    {/* Kategori Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-background/90 backdrop-blur-md text-foreground border-none shadow-sm hover:bg-background">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="flex-1 p-6 space-y-4">
                    {/* Meta Bilgiler */}
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {new Date(post.createdAt).toLocaleDateString('tr-TR', { 
                          month: 'long', day: 'numeric', year: 'numeric' 
                        })}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-primary/30" />
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {calculateReadTime(post.content)} dk
                      </div>
                    </div>

                    {/* Başlık & Özet */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.description || post.content.replace(/[#*_`\[\]]/g, '').substring(0, 120) + "..."}
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 mt-auto">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                      Okumaya Devam Et 
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}