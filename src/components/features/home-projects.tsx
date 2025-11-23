import { getProjects } from "@/lib/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FlaskConical, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export async function HomeProjectsSection() {
  const allProjects = await getProjects();
  // Sadece ilk 3 projeyi al
  const projects = allProjects.slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-background/50 relative">
      <div className="container max-w-6xl mx-auto">
        {/* Başlık */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter flex items-center gap-3 justify-center md:justify-start">
              <FlaskConical className="text-primary h-6 w-6" />
              Son Çalışmalar
            </h2>
            <p className="text-muted-foreground">
              Laboratuvardan yeni çıkan projeler.
            </p>
          </div>
          <Button asChild variant="ghost" className="gap-2 hover:text-primary">
            <Link href="/lab">
              Tümünü Gör <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Proje Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => {
             const mainLink = project.demoUrl || project.repoUrl;
             
             return (
              <Card key={project.id} className="group flex flex-col bg-card/40 border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-1 overflow-hidden">
                <CardHeader className="p-0">
                   <div className="h-48 w-full bg-muted/20 relative overflow-hidden">
                      {mainLink ? (
                        <Link href={mainLink} target="_blank" className="block h-full w-full">
                           <Image 
                              src={project.imageUrl || "https://placehold.co/600"} 
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                           />
                        </Link>
                      ) : (
                        <Image 
                              src={project.imageUrl || "https://placehold.co/600"} 
                              alt={project.title}
                              fill
                              className="object-cover"
                           />
                      )}
                   </div>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                    <CardTitle className="mb-2 text-lg group-hover:text-primary transition-colors">
                        {project.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.split(',').slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[10px] bg-secondary/10">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between gap-2">
                    {project.repoUrl && (
                        <Link href={project.repoUrl} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="h-5 w-5" />
                        </Link>
                    )}
                    {project.demoUrl && (
                        <Link href={project.demoUrl} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <ExternalLink className="h-5 w-5" />
                        </Link>
                    )}
                </CardFooter>
              </Card>
             )
          })}
        </div>
      </div>
    </section>
  );
}