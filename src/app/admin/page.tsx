import { 
  createProject, deleteProject, getProjects, 
  getGuestbookEntriesAdmin, deleteGuestbookEntry, toggleGuestbookEntry,
  deletePost, getPostsAdmin, updatePost,
  getProfile, updateProfile,
  createTimelineItem, deleteTimelineItem, getTimeline, 
  createStackItem, deleteStackItem, getStack,
  createSupporter, deleteSupporter, getSupporters,
  getMaintenanceStatus
} from "@/lib/actions";

import { MaintenanceToggle } from "@/components/admin/maintenance-toggle";
import { PostForm } from "@/components/admin/post-form"; 
import { logout } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageUpload } from "@/components/utils/image-upload";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Trash2, LayoutDashboard, LogOut, MessageSquare, 
  FlaskConical, FileText, User,
  Waypoints, Layers, Heart, 
  Eye, Edit 
} from "lucide-react";
import Image from "next/image";

export default async function AdminDashboard() {
  // Tüm verileri paralel çekiyoruz (getMaintenanceStatus eklendi)
  const [projects, guestbookEntries, posts, profile, timeline, stack, supporters, isMaintenance] = await Promise.all([
    getProjects(),
    getGuestbookEntriesAdmin(),
    getPostsAdmin(),
    getProfile(),
    getTimeline(),
    getStack(),
    getSupporters(),
    getMaintenanceStatus()
  ]);

  return (
    <div className="container min-h-screen py-12 px-4 max-w-7xl mx-auto">
      
      {/* HEADER / MISSION CONTROL */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-card/40 p-6 rounded-2xl border border-primary/10 backdrop-blur-md shadow-sm gap-4">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-primary/10 rounded-xl border border-primary/10">
             <LayoutDashboard className="h-8 w-8 text-primary" />
           </div>
           <div>
             <h1 className="text-2xl font-bold text-foreground tracking-tight">Mission Control</h1>
             <p className="text-xs text-muted-foreground font-mono flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> 
               SYSTEM STATUS: ONLINE
             </p>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
            {/* --- BAKIM MODU SWITCH --- */}
            <MaintenanceToggle initialStatus={isMaintenance} />

            <form action={logout}>
              <Button variant="destructive" size="sm" className="gap-2 shadow-md hover:shadow-lg transition-all">
                <LogOut className="h-4 w-4" /> Çıkış Yap
              </Button>
            </form>
        </div>
      </div>

      <Tabs defaultValue="blog" className="space-y-8">
        {/* TABS MENU */}
        <TabsList className="grid w-full h-auto grid-cols-3 md:grid-cols-7 bg-muted/30 p-1.5 rounded-xl gap-1">
          <TabsTrigger value="blog" className="gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><FileText className="h-4 w-4"/> Blog</TabsTrigger>
          <TabsTrigger value="projects" className="gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><FlaskConical className="h-4 w-4"/> Projeler</TabsTrigger>
          <TabsTrigger value="roadmap" className="gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Waypoints className="h-4 w-4"/> Yol Hrt.</TabsTrigger>
          <TabsTrigger value="stack" className="gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Layers className="h-4 w-4"/> Stack</TabsTrigger>
          <TabsTrigger value="guestbook" className="gap-2 py-2.5 relative data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <MessageSquare className="h-4 w-4" /> Ziyaretçi
            {guestbookEntries.some(e => !e.approved) && <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse border border-background" />}
          </TabsTrigger>
          <TabsTrigger value="credits" className="gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Heart className="h-4 w-4"/> Destek</TabsTrigger>
          <TabsTrigger value="profile" className="gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"><User className="h-4 w-4"/> Profil</TabsTrigger>
        </TabsList>

        {/* ======================= 
            1. BLOG SEKMESİ
           ======================= */}
        <TabsContent value="blog" className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
            <div className="border border-primary/10 rounded-xl overflow-hidden shadow-sm">
                <PostForm />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary"/> Kütüphane ({posts.length})
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border bg-card/40 hover:bg-card/60 transition-colors gap-4">
                            <div className="flex items-center gap-4">
                                {post.coverImage && (
                                    <div className="relative w-16 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-bold text-base line-clamp-1">{post.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant={post.published ? "default" : "secondary"} className="text-[10px] h-5">
                                            {post.published ? "Yayında" : "Taslak"}
                                        </Badge>
                                        <Badge variant="outline" className="text-[10px] h-5">
                                            {post.category}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground ml-1 hidden sm:inline">
                                            {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 self-end md:self-center">
                                {/* Button asChild kullanarak Link hatasını çözdük */}
                                <Button variant="outline" size="icon" title="Sitede Gör" asChild>
                                    <Link href={`/blog/${post.slug}`} target="_blank">
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </Button>

                                <Button variant="outline" size="icon" title="Düzenle" asChild>
                                    <Link href={`/admin/blog/${post.id}`}>
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                </Button>

                                <form action={deletePost.bind(null, post.id)}>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" title="Sil">
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <div className="p-8 text-center border border-dashed rounded-xl text-muted-foreground">
                            Henüz yazı yok. Yukarıdaki formdan ekleyebilirsin.
                        </div>
                    )}
                </div>
            </div>
        </TabsContent>

        {/* ======================= 
            2. PROJELER SEKMESİ
           ======================= */}
        <TabsContent value="projects" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 h-fit lg:sticky lg:top-24">
              <CardHeader><CardTitle className="text-primary flex items-center gap-2"><FlaskConical className="w-5 h-5"/> Yeni Proje</CardTitle></CardHeader>
              <CardContent>
                <form action={createProject} className="space-y-4">
                  <Input name="title" placeholder="Proje Adı" required className="bg-background/50" />
                  <Textarea name="description" placeholder="Açıklama" required className="bg-background/50" />
                  <Input name="tags" placeholder="Etiketler (Virgülle ayır)" required className="bg-background/50" />
                  <div className="grid grid-cols-2 gap-4">
                      <Input name="repoUrl" placeholder="Github URL" className="bg-background/50" />
                      <Input name="demoUrl" placeholder="Demo URL" className="bg-background/50" />
                  </div>
                  <div className="space-y-1"><label className="text-xs ml-1 font-medium">Görsel</label><ImageUpload name="imageUrl" /></div>
                  <Button type="submit" className="w-full">Projeyi Ekle</Button>
                </form>
              </CardContent>
            </Card>
            <div className="lg:col-span-2 space-y-4">
               {projects.map((project) => (
                 <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border bg-card/40 hover:bg-card/60 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden relative border flex-shrink-0">
                            {project.imageUrl ? <Image src={project.imageUrl} alt={project.title} fill className="object-cover"/> : <div className="w-full h-full flex items-center justify-center bg-secondary">P</div>}
                        </div>
                        <div><h3 className="font-bold">{project.title}</h3><p className="text-xs text-muted-foreground">{project.tags}</p></div>
                    </div>
                    <form action={deleteProject.bind(null, project.id)}><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-5 w-5" /></Button></form>
                 </div>
               ))}
            </div>
          </div>
        </TabsContent>

        {/* ======================= 
            3. ROADMAP SEKMESİ
           ======================= */}
        <TabsContent value="roadmap" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 h-fit">
              <CardHeader><CardTitle className="text-primary flex items-center gap-2"><Waypoints className="w-5 h-5"/> Yol Haritası</CardTitle></CardHeader>
              <CardContent>
                <form action={createTimelineItem} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="year" placeholder="Yıl (2024)" required className="bg-background/50" />
                    <Input name="order" type="number" placeholder="Sıra (1,2,3)" required className="bg-background/50" />
                  </div>
                  <Input name="title" placeholder="Başlık" required className="bg-background/50" />
                  <Textarea name="description" placeholder="Açıklama" required className="bg-background/50" />
                  <Button type="submit" className="w-full">Ekle</Button>
                </form>
              </CardContent>
            </Card>
            <div className="lg:col-span-2 space-y-3">
               {timeline.map((item) => (
                 <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border bg-card/40 hover:bg-card/60">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono bg-primary/10 px-2 py-1 rounded text-primary border border-primary/10">{item.year}</span>
                            <h3 className="font-bold">{item.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 ml-1">{item.description}</p>
                    </div>
                    <form action={deleteTimelineItem.bind(null, item.id)}><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-5 w-5" /></Button></form>
                 </div>
               ))}
            </div>
          </div>
        </TabsContent>

        {/* ======================= 
            4. STACK SEKMESİ
           ======================= */}
        <TabsContent value="stack" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 h-fit">
              <CardHeader><CardTitle className="text-primary flex items-center gap-2"><Layers className="w-5 h-5"/> Teknoloji</CardTitle></CardHeader>
              <CardContent>
                <form action={createStackItem} className="space-y-4">
                  <Input name="name" placeholder="Teknoloji (React)" required className="bg-background/50" />
                  <Input name="category" placeholder="Kategori (Frontend)" required className="bg-background/50" />
                  <div className="space-y-1">
                    <label className="text-xs ml-1">Seviye</label>
                    <select name="level" className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm"><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option><option value="Expert">Expert</option></select>
                  </div>
                  <Button type="submit" className="w-full">Ekle</Button>
                </form>
              </CardContent>
            </Card>
            <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stack.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/40 hover:bg-card/60">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{item.level}</span>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">{item.category}</span>
                            </div>
                            <form action={deleteStackItem.bind(null, item.id)}><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button></form>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </TabsContent>

        {/* ======================= 
            5. GUESTBOOK SEKMESİ
           ======================= */}
        <TabsContent value="guestbook" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <Card className="bg-card/50 backdrop-blur border-primary/10">
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5"/> Ziyaretçi Defteri</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {guestbookEntries.length === 0 && <p className="text-muted-foreground text-center py-8">Henüz mesaj yok.</p>}
                {guestbookEntries.map((entry) => (
                    <div key={entry.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border bg-card/60 gap-4">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarFallback className="bg-primary/10 text-primary">{entry.author.substring(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-bold text-sm flex items-center gap-2">
                                    {entry.author}
                                    {!entry.approved && <Badge variant="destructive" className="text-[10px] h-5">Onay Bekliyor</Badge>}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">{entry.content}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 self-end md:self-center">
                            <form action={toggleGuestbookEntry.bind(null, entry.id, entry.approved)}>
                                <Button size="sm" variant={entry.approved ? "secondary" : "default"}>{entry.approved ? "Gizle" : "Onayla"}</Button>
                            </form>
                            <form action={deleteGuestbookEntry.bind(null, entry.id)}>
                                <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                            </form>
                        </div>
                    </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ======================= 
            6. CREDITS (SUPPORT) SEKMESİ
           ======================= */}
        <TabsContent value="credits" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 h-fit">
              <CardHeader><CardTitle className="text-primary flex items-center gap-2"><Heart className="w-5 h-5"/> Destekçi Ekle</CardTitle></CardHeader>
              <CardContent>
                <form action={createSupporter} className="space-y-4">
                  <Input name="name" placeholder="Ad Soyad" required className="bg-background/50" />
                  <Input name="note" placeholder="Not / Ünvan (Opsiyonel)" className="bg-background/50" />
                  <Input name="link" placeholder="Link (Opsiyonel)" className="bg-background/50" />
                  <Button type="submit" className="w-full">Ekle</Button>
                </form>
              </CardContent>
            </Card>
            <div className="lg:col-span-2 space-y-4">
               {supporters.map((supporter) => (
                 <div key={supporter.id} className="flex items-center justify-between p-4 rounded-xl border bg-card/40 hover:bg-card/60">
                    <div>
                        <h3 className="font-bold">{supporter.name}</h3>
                        {supporter.note && <p className="text-xs text-muted-foreground">{supporter.note}</p>}
                    </div>
                    <form action={deleteSupporter.bind(null, supporter.id)}><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-5 w-5" /></Button></form>
                 </div>
               ))}
            </div>
          </div>
        </TabsContent>

        {/* ======================= 
            7. PROFIL SEKMESİ
           ======================= */}
        <TabsContent value="profile" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <Card className="bg-card/50 backdrop-blur border-primary/20 max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User className="w-5 h-5"/> Profil Düzenle</CardTitle>
                    <CardDescription>Anasayfa, Footer ve iletişim bilgilerini buradan yönetebilirsin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={updateProfile} className="space-y-6">
                        <div className="space-y-4">
                             <div className="space-y-2">
                                <label className="text-sm font-medium">Unvan (Headline)</label>
                                <Input name="headline" defaultValue={profile?.headline || ""} placeholder="Örn: Full Stack Developer" className="bg-background/50"/>
                             </div>
                             <div className="space-y-2">
                                <label className="text-sm font-medium">Biyografi</label>
                                <Textarea name="bio" defaultValue={profile?.bio || ""} placeholder="Kısa biyografi..." rows={4} className="bg-background/50"/>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-primary border-b border-primary/20 pb-1">Sosyal Medya</h3>
                                <Input name="githubUrl" defaultValue={profile?.githubUrl || ""} placeholder="GitHub URL" className="bg-background/50"/>
                                <Input name="linkedinUrl" defaultValue={profile?.linkedinUrl || ""} placeholder="LinkedIn URL" className="bg-background/50"/>
                                <Input name="twitterUrl" defaultValue={profile?.twitterUrl || ""} placeholder="Twitter/X URL" className="bg-background/50"/>
                                <Input name="instagramUrl" defaultValue={profile?.instagramUrl || ""} placeholder="Instagram URL" className="bg-background/50"/>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-primary border-b border-primary/20 pb-1">Widget & Medya</h3>
                                <Input name="buyMeACoffeeUrl" defaultValue={profile?.buyMeACoffeeUrl || ""} placeholder="Buy Me A Coffee Link" className="bg-background/50"/>
                                <div className="p-3 bg-secondary/20 rounded-lg space-y-2 border border-secondary/20">
                                    <p className="text-xs font-semibold text-muted-foreground">Spotify Durumu</p>
                                    <Input name="spotifySong" defaultValue={profile?.spotifySong || ""} placeholder="Şarkı Adı" className="bg-background/50 text-sm h-8"/>
                                    <Input name="spotifyArtist" defaultValue={profile?.spotifyArtist || ""} placeholder="Sanatçı" className="bg-background/50 text-sm h-8"/>
                                    <Input name="spotifyUrl" defaultValue={profile?.spotifyUrl || ""} placeholder="Şarkı Linki" className="bg-background/50 text-sm h-8"/>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <Input name="location" defaultValue={profile?.location || ""} placeholder="Konum" className="bg-background/50"/>
                            <div className="space-y-1">
                                <label className="text-xs font-medium ml-1">Profil Fotoğrafı</label>
                                <ImageUpload name="imageUrl" defaultValue={profile?.imageUrl || ""} />
                            </div>
                        </div>
                        
                        <Button type="submit" size="lg" className="w-full font-bold">Profili Güncelle</Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}