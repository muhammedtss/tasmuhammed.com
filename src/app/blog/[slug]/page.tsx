import { getPost, clapPost } from "@/lib/actions"; // clapPost eklendi
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ClapButton } from "@/components/features/clap-button"; 
import { SupportWidget } from "@/components/features/support-widget";

// Dinamik Metadata (SEO için)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) return { title: "Yazı Bulunamadı" };
  
  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15 zorunluluğu: params'ı await etmek
  const { slug } = await params;
  
  const post = await getPost(slug);

  if (!post || !post.published) {
    notFound();
  }

  const readTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <article className="container min-h-screen py-24 px-4 max-w-3xl mx-auto relative">
      <ProgressBar />

      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="-ml-4 text-muted-foreground hover:text-primary gap-2">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" /> Blog'a Dön
          </Link>
        </Button>
      </div>

      <header className="mb-10 border-b border-primary/10 pb-10 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            {new Date(post.createdAt).toLocaleDateString('tr-TR', { dateStyle: 'long' })}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            {readTime} dk okuma
          </div>
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-card prose-pre:border prose-pre:border-primary/10 prose-img:rounded-xl prose-img:border prose-img:border-primary/10 prose-li:text-muted-foreground">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* ETKİLEŞİM ALANI */}
      <div className="mt-16 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-muted-foreground">Beğendin mi?</span>
            <ClapButton id={post.id} initialClaps={post.claps} type="post" />
        </div>
        <SupportWidget />
      </div>

    </article>
  );
}