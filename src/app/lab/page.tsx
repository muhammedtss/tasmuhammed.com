import { getProjects } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, FlaskConical, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // <-- YENİ

export default async function LabPage() {
  const projects = await getProjects();

  return (
    <div className="container min-h-screen py-24 px-4 md:px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
            <FlaskConical className="h-8 w-8 text-primary" /> 
            The Lab
          </h1>
          <p className="text-muted-foreground md:text-lg max-w-[600px]">
            Experiments, prototypes, and proof of concepts. 
            <span className="block text-xs text-primary/60 mt-1 font-mono">// Veritabanından Canlı Veri</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const mainLink = project.demoUrl || project.repoUrl;

          return (
            <Card 
              key={project.id} 
              className="bg-card/30 backdrop-blur-md border-primary/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
            >
              <CardHeader className="p-0">
                <div className="h-48 w-full bg-muted/20 rounded-t-lg relative overflow-hidden">
                  {/* Link varsa tıklandığında git */}
                  {mainLink ? (
                    <Link href={mainLink} target="_blank" className="block h-full w-full cursor-pointer">
                      <Image 
                          src={project.imageUrl || `https://placehold.co/600x400/0f172a/f1f5f9?text=${project.title.substring(0,10)}...`} 
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>
                  ) : (
                    <Image 
                        src={project.imageUrl || `https://placehold.co/600x400/0f172a/f1f5f9?text=${project.title.substring(0,10)}...`} 
                        alt={project.title}
                        fill
                        className="object-cover opacity-90"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  
                  {project.featured && (
                      <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-lg z-10">
                          FEATURED
                      </span>
                  )}
                </div>
              </CardHeader>
              
              <div className="p-6 flex flex-col flex-1">
                  {mainLink ? (
                    <Link href={mainLink} target="_blank" className="hover:underline decoration-primary underline-offset-4">
                      <CardTitle className="text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                      </CardTitle>
                    </Link>
                  ) : (
                    <CardTitle className="text-xl text-foreground mb-2">
                        {project.title}
                    </CardTitle>
                  )}

                  <CardDescription className="text-muted-foreground line-clamp-3 min-h-[60px]">
                      {project.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mt-4 mb-6">
                      {project.tags.split(",").map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-mono bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                          {tag}
                      </Badge>
                      ))}
                  </div>

                  <CardFooter className="p-0 flex justify-between gap-3 mt-auto">
                    {project.repoUrl ? (
                        <Button variant="outline" size="sm" asChild className="flex-1 border-primary/20 hover:bg-primary/10">
                        <Link href={project.repoUrl} target="_blank">
                            <Github className="mr-2 h-4 w-4" /> Code
                        </Link>
                        </Button>
                    ) : (
                        <Button variant="outline" size="sm" disabled className="flex-1 opacity-50">
                            <Lock className="mr-2 h-4 w-4" /> Private
                        </Button>
                    )}
                    
                    {/* DEMO BUTONU - SADECE VARSA GÖSTERİLİR */}
                    {project.demoUrl && (
                        <Button size="sm" asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href={project.demoUrl} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live
                        </Link>
                        </Button>
                    )}
                  </CardFooter>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}