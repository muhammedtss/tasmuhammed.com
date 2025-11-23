import { getTimeline } from "@/lib/actions";
import { Timeline } from "@/components/features/timeline";
import { Waypoints } from "lucide-react";

export default async function RoadmapPage() {
  // Veriyi Server-Side çekiyoruz
  const timelineItems = await getTimeline();

  return (
    <div className="container min-h-screen py-24 px-4 md:px-6 max-w-4xl mx-auto">
      {/* Başlık */}
      <div className="mb-16 space-y-4 text-center md:text-left animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center md:justify-start gap-3">
          <Waypoints className="h-8 w-8 text-primary" />
          The Roadmap
        </h1>
        <p className="text-muted-foreground md:text-lg">
          A chronological log of my journey, milestones, and pivotal moments.
        </p>
      </div>

      {/* Timeline Bileşeni */}
      <Timeline items={timelineItems} />
    </div>
  );
}