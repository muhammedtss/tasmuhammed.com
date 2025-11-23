import { getProfile, getSupporters } from "@/lib/actions";
import { Card } from "@/components/ui/card";
import { MapPin, Github, Linkedin, Twitter, Mail, Instagram, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export async function HomeAboutSection() {
  const [profile, supporters] = await Promise.all([
    getProfile(),
    getSupporters()
  ]);

  if (!profile) return null;

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto space-y-8">
        
        {/* ANA PROFİL KARTI */}
        <Card className="bg-card/30 backdrop-blur-sm border-primary/10 p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
            <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image src={profile.imageUrl || "https://placehold.co/400"} alt="Profile" fill className="object-cover" sizes="(max-width: 768px) 100vw, 300px" priority />
                </div>
                <div className="space-y-6 text-center md:text-left flex-1">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground">{profile.headline}</h2>
                        {profile.location && <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground text-sm font-mono"><MapPin className="h-4 w-4" /><span>{profile.location}</span></div>}
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                        {profile.githubUrl && <Link href={profile.githubUrl} target="_blank" className="p-2.5 bg-background/50 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all border border-primary/10"><Github className="h-5 w-5" /></Link>}
                        {profile.linkedinUrl && <Link href={profile.linkedinUrl} target="_blank" className="p-2.5 bg-background/50 rounded-full text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-all border border-primary/10"><Linkedin className="h-5 w-5" /></Link>}
                        {profile.twitterUrl && <Link href={profile.twitterUrl} target="_blank" className="p-2.5 bg-background/50 rounded-full text-muted-foreground hover:text-sky-500 hover:bg-sky-500/10 transition-all border border-primary/10"><Twitter className="h-5 w-5" /></Link>}
                        {profile.instagramUrl && <Link href={profile.instagramUrl} target="_blank" className="p-2.5 bg-background/50 rounded-full text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10 transition-all border border-primary/10"><Instagram className="h-5 w-5" /></Link>}
                        <Button asChild variant="outline" className="ml-2 border-primary/20 hover:bg-primary/10 gap-2"><Link href="mailto:contact@example.com"><Mail className="h-4 w-4" /> Bana Ulaşın</Link></Button>
                    </div>
                </div>
            </div>
        </Card>

        {/* TEŞEKKÜRLER (SUPPORTERS) KISMI */}
        {supporters.length > 0 && (
            <div className="flex flex-col items-center gap-4 pt-8 border-t border-primary/10 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-sm font-mono text-primary/70 uppercase tracking-widest flex items-center gap-2">
                    <Heart className="h-3 w-3" /> Special Thanks
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                    {supporters.map((person) => (
                        <div key={person.id} className="group relative cursor-default">
                            {person.link ? (
                                <Link href={person.link} target="_blank" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                    {person.name}
                                </Link>
                            ) : (
                                <span className="text-sm font-medium text-muted-foreground">{person.name}</span>
                            )}
                            
                            {person.note && (
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-primary/20 text-primary text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-10">
                                    {person.note}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </section>
  );
}