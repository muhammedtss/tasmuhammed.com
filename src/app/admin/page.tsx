import { 
  createProject, deleteProject, getProjects, 
  getGuestbookEntriesAdmin, deleteGuestbookEntry, toggleGuestbookEntry,
  createPost, deletePost, getPostsAdmin,
  getProfile, updateProfile,
  createTimelineItem, deleteTimelineItem, getTimeline, 
  createStackItem, deleteStackItem, getStack,
  createSupporter, deleteSupporter, getSupporters
} from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageUpload } from "@/components/utils/image-upload";
import { 
  Trash2, PlusCircle, LayoutDashboard, LogOut, MessageSquare, 
  FlaskConical, CheckCircle2, XCircle, FileText, User,
  Waypoints, Layers, Heart
} from "lucide-react";
import { logout } from "@/lib/auth";

export default async function AdminDashboard() {
  const [projects, guestbookEntries, posts, profile, timeline, stack, supporters] = await Promise.all([
    getProjects(),
    getGuestbookEntriesAdmin(),
    getPostsAdmin(),
    getProfile(),
    getTimeline(),
    getStack(),
    getSupporters()
  ]);

  return (
    <div className="container min-h-screen py-12 px-4">
      <div className="flex justify-between items-center mb-8 bg-card/30 p-6 rounded-xl border border-primary/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-primary/10 rounded-lg"><LayoutDashboard className="h-8 w-8 text-primary" /></div>
           <div><h1 className="text-2xl font-bold text-foreground">Mission Control</h1><p className="text-xs text-muted-foreground font-mono">System Status: ONLINE</p></div>
        </div>
        <form action={logout}><Button variant="destructive" size="sm" className="gap-2"><LogOut className="h-4 w-4" /> Çıkış Yap</Button></form>
      </div>

      <Tabs defaultValue="projects" className="space-y-8">
        <TabsList className="grid w-full max-w-5xl grid-cols-3 md:grid-cols-7 bg-muted/20 p-1 h-auto">
          <TabsTrigger value="projects" className="gap-2"><FlaskConical className="h-4 w-4"/> Projeler</TabsTrigger>
          <TabsTrigger value="roadmap" className="gap-2"><Waypoints className="h-4 w-4"/> Yol Hrt.</TabsTrigger>
          <TabsTrigger value="stack" className="gap-2"><Layers className="h-4 w-4"/> Stack</TabsTrigger>
          <TabsTrigger value="blog" className="gap-2"><FileText className="h-4 w-4"/> Blog</TabsTrigger>
          <TabsTrigger value="guestbook" className="gap-2 relative">
            <MessageSquare className="h-4 w-4" /> Msj.
            {guestbookEntries.some(e => !e.approved) && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
          </TabsTrigger>
          <TabsTrigger value="credits" className="gap-2"><Heart className="h-4 w-4"/> Credits</TabsTrigger>
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4"/> Profil</TabsTrigger>
        </TabsList>

        {/* 1. PROJELER */}
        <TabsContent value="projects" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 h-fit lg:sticky lg:top-24">
              <CardHeader><CardTitle className="text-primary">Yeni Proje</CardTitle></CardHeader>
              <CardContent>
                <form action={createProject} className="space-y-4">
                  <Input name="title" placeholder="Proje Adı" required className="bg-background/50" />
                  <Textarea name="description" placeholder="Açıklama" required className="bg-background/50" />
                  <Input name="tags" placeholder="Etiketler" required className="bg-background/50" />
                  <div className="grid grid-cols-2 gap-4">
                      <Input name="repoUrl" placeholder="Github URL" className="bg-background/50" />
                      <Input name="demoUrl" placeholder="Demo URL" className="bg-background/50" />
                  </div>
                  <div className="space-y-1"><label className="text-xs ml-1">Görsel</label><ImageUpload name="imageUrl" /></div>
                  <Button type="submit" className="w-full">Ekle</Button>
                </form>
              </CardContent>
            </Card>
            <div className="lg:col-span-2 space-y-4">
               {projects.map((project) => (
                 <div key={project.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/40 hover:bg-card/60 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded bg-muted overflow-hidden relative"><img src={project.imageUrl || "https://placehold.co/100"} className="object-cover w-full h-full" /></div>
                        <div><h3 className="font-bold">{project.title}</h3><p className="text-xs text-muted-foreground">{project.tags}</p></div>
                    </div>
                    <form action={deleteProject.bind(null, project.id)}><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-5 w-5" /></Button></form>
                 </div>
               ))}
            </div>
          </div>
        </TabsContent>

        {/* 2. ROADMAP */}
        <TabsContent value="roadmap" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 h-fit">
              <CardHeader><CardTitle className="text-primary">Yol Haritası Ekle</CardTitle></CardHeader>
              <CardContent>
                <form action={createTimelineItem} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="year" placeholder="Yıl" required className="bg-background/50" />
                    <Input name="order" type="number" placeholder="Sıra" required className="bg-background/50" />
                  </div>
                  <Input name="title" placeholder="Başlık" required className="bg-background/50" />
                  <Textarea name="description" placeholder="Açıklama" required className="bg-background/50" />
                  <Button type="submit" className="w-full">Ekle</Button>
                </form>
              </CardContent>
            </Card>
            <div className="lg:col-span-2 space-y-4">
               {timeline.map((item) => (
                 <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/40 hover:bg-card/60">
                    <div><div className="flex items-center gap-2"><span className="text-xs font-mono bg-primary/10 px-2 py-1 rounded text-primary">{item.year}</span><h3 className="font-bold">{item.title}</h3></div><p className="text-xs text-muted-foreground mt-1">{item.description}</p></div>
                    <form action={deleteTimelineItem.bind(null, item.id)}><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-5 w-5" /></Button></form>
                 </div>
               ))}
            </div>
          </div>
        </TabsContent>

        {/* 3. STACK */}
        <TabsContent value="stack" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 h-fit">
              <CardHeader><CardTitle className="text-primary">Yetenek Ekle</CardTitle></CardHeader>
              <CardContent>
                <form action={createStackItem} className="space-y-4">
                  <Input name="name" placeholder="Teknoloji" required className="bg-background/50" />
                  <Input name="category" placeholder="Kategori" required className="bg-background/50" />
                  <div className="space-y-1">
                    <label className="text-xs ml-1">Seviye</label>
                    <select name="level" className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm"><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option><option value="Expert">Expert</option></select>
                  </div>
                  <Button type="submit" className="w-full">Ekle</Button>
                </form>
              </CardContent>
            </Card>
            <div className="lg:col-span-2"><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{stack.map((item) => (<div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/40"><div className="flex flex-col"><div className="flex items-center gap-2"><span className="font-medium">{item.name}</span><span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{item.level}</span></div><span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">{item.category}</span></div><form action={deleteStackItem.bind(null, item.id)}><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button></form></div>))}</div></div>
          </div>
        </TabsContent>

        {/* 4. BLOG */}
        <TabsContent value="blog" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="bg-card/50 backdrop-blur border-primary/20 h-fit">
                    <CardHeader><CardTitle className="text-primary">Yeni Yazı</CardTitle></CardHeader>
                    <CardContent>
                        <form action={createPost} className="space-y-4">
                            <Input name="title" placeholder="Başlık" required className="bg-background/50" />
                            <Textarea name="content" placeholder="İçerik (Markdown)" required rows={8} className="bg-background/50 font-mono" />
                            <div className="flex items-center space-x-2"><input type="checkbox" name="published" defaultChecked /><label>Yayınla</label></div>
                            <Button type="submit" className="w-full">Kaydet</Button>
                        </form>
                    </CardContent>
                </Card>
                <div className="lg:col-span-2 space-y-4">{posts.map((post) => (<div key={post.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/40"><div><h3 className="font-bold">{post.title}</h3><span className="text-xs text-muted-foreground">{post.published ? "Yayında" : "Taslak"}</span></div><form action={deletePost.bind(null, post.id)}><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-5 w-5" /></Button></form></div>))}</div>
            </div>
        </TabsContent>

        {/* 5. GUESTBOOK */}
        <TabsContent value="guestbook" className="space-y-8">
          <Card className="bg-card/50 backdrop-blur border-primary/10">
            <CardHeader><CardTitle>Mesajlar</CardTitle></CardHeader>
            <CardContent className="space-y-4">{guestbookEntries.map((entry) => (<div key={entry.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card/60 gap-4"><div className="flex items-start gap-4"><Avatar><AvatarFallback>{entry.author.substring(0,2)}</AvatarFallback></Avatar><div><h4 className="font-bold text-sm">{entry.author}</h4><p className="text-sm text-muted-foreground">{entry.content}</p></div></div><div className="flex gap-2"><form action={toggleGuestbookEntry.bind(null, entry.id, entry.approved)}><Button size="sm" variant={entry.approved ? "secondary" : "default"}>{entry.approved ? "Gizle" : "Onayla"}</Button></form><form action={deleteGuestbookEntry.bind(null, entry.id)}><Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button></form></div></div>))}</CardContent>
          </Card>
        </TabsContent>

        {/* 6. CREDITS (TEŞEKKÜRLER) - YENİ */}
        <TabsContent value="credits" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 h-fit">
              <CardHeader><CardTitle className="text-primary">Destekçi Ekle</CardTitle></CardHeader>
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
                 <div key={supporter.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/40 hover:bg-card/60">
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

        {/* 7. PROFIL */}
        <TabsContent value="profile" className="space-y-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 max-w-2xl mx-auto">
                <CardHeader><CardTitle>Profil Düzenle</CardTitle><CardDescription>Kişisel bilgiler ve sosyal medya.</CardDescription></CardHeader>
                <CardContent>
                    <form action={updateProfile} className="space-y-4">
                        <Input name="headline" defaultValue={profile?.headline} placeholder="Başlık" className="bg-background/50"/>
                        <Textarea name="bio" defaultValue={profile?.bio} placeholder="Biyografi" rows={4} className="bg-background/50"/>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Input name="githubUrl" defaultValue={profile?.githubUrl || ""} placeholder="GitHub" className="bg-background/50"/>
                            <Input name="linkedinUrl" defaultValue={profile?.linkedinUrl || ""} placeholder="LinkedIn" className="bg-background/50"/>
                            <Input name="twitterUrl" defaultValue={profile?.twitterUrl || ""} placeholder="Twitter" className="bg-background/50"/>
                            <Input name="instagramUrl" defaultValue={profile?.instagramUrl || ""} placeholder="Instagram" className="bg-background/50"/>
                        </div>
                        <div className="border-t border-primary/10 pt-4 mt-4">
                            <h3 className="text-sm font-bold mb-3 text-primary">Widgetlar</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input name="buyMeACoffeeUrl" defaultValue={profile?.buyMeACoffeeUrl || ""} placeholder="Buy Me A Coffee Link" className="bg-background/50"/>
                                <Input name="spotifySong" defaultValue={profile?.spotifySong || ""} placeholder="Spotify Şarkı" className="bg-background/50"/>
                                <Input name="spotifyArtist" defaultValue={profile?.spotifyArtist || ""} placeholder="Sanatçı" className="bg-background/50"/>
                                <Input name="spotifyUrl" defaultValue={profile?.spotifyUrl || ""} placeholder="Şarkı Linki" className="bg-background/50"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <Input name="location" defaultValue={profile?.location || ""} placeholder="Konum" className="bg-background/50"/>
                            <div className="space-y-1"><label className="text-xs">Profil Fotoğrafı</label><ImageUpload name="imageUrl" defaultValue={profile?.imageUrl || ""} /></div>
                        </div>
                        <Button type="submit" className="w-full">Güncelle</Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}