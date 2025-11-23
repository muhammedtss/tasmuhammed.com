import { getPosts } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { FileText, Calendar } from "lucide-react";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container min-h-screen py-24 px-4 max-w-5xl mx-auto">
      {/* Başlık */}
      <div className="flex flex-col items-start gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" /> 
          Blog & Notlar
        </h1>
        <p className="text-muted-foreground md:text-lg max-w-[600px]">
          Yazılım, havacılık ve teknoloji üzerine düşüncelerim.
        </p>
      </div>

      {/* Yazı Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <div className="col-span-full text-center py-20 border border-dashed border-primary/20 rounded-lg text-muted-foreground bg-card/30">
            Henüz yayınlanmış bir yazı yok. Admin panelinden ekleyebilirsiniz.
          </div>
        ) : (
          posts.map((post) => (
// Doğrusu bu:
<Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-xl">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.createdAt).toLocaleDateString('tr-TR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {/* Markdown sembollerini basitçe temizleyip özet gösteriyoruz */}
                    {post.content.replace(/[#*_`\[\]]/g, '').substring(0, 120)}...
                  </p>
                  <div className="text-xs font-medium text-primary group-hover:underline underline-offset-4 flex items-center gap-1">
                    Devamını Oku →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}