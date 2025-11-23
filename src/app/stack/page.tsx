import { getStack } from "@/lib/actions";
import { Card } from "@/components/ui/card";
import { Cpu, Layers } from "lucide-react";

// Seviyeye göre renkler
const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "Advanced": return "bg-green-500/10 text-green-400 border-green-500/20";
    case "Intermediate": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "Beginner": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    default: return "bg-primary/10 text-primary border-primary/20";
  }
};

export default async function StackPage() {
  // Veritabanından yetenekleri çek
  const stackItems = await getStack();

  // Verileri kategoriye göre grupla
  // TypeScript'e bu objenin yapısını açıkça belirtiyoruz
  const categories = stackItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push({ name: item.name, level: item.level });
    return acc;
  }, {} as Record<string, { name: string, level: string }[]>);

  return (
    <div className="container min-h-screen py-24 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center gap-3">
          <Cpu className="h-8 w-8 text-primary" /> 
          Tech Stack
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
          Dijital bahçemi inşa ederken kullandığım araçlar ve uzmanlık seviyelerim.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([category, skills]) => (
          <Card 
            key={category} 
            className="p-6 bg-card/30 backdrop-blur border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-primary/10 pb-4">
              <div className="p-2 bg-background/50 rounded-lg border border-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{category}</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background/40 border border-border/50 transition-colors hover:border-primary/30"
                >
                  <span className="text-sm font-medium text-foreground/90">
                    {skill.name}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
        
        {Object.keys(categories).length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed rounded-lg">
                Henüz yetenek eklenmemiş. Admin panelinden ekleyin.
            </div>
        )}
      </div>
    </div>
  );
}