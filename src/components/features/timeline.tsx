"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";

// Veritabanından gelen tip tanımı
type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
  order: number;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-12 py-8">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 md:pl-12 group"
        >
          {/* Sol Taraftaki Nokta/İkon */}
          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-background border-2 border-primary ring-4 ring-background group-hover:scale-125 transition-transform duration-300 flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>

          {/* İçerik Kartı */}
          <div className="flex flex-col gap-2">
            {/* Yıl ve İkon */}
            <div className="flex items-center gap-2 text-sm font-mono text-primary/80">
              <Calendar className="h-3 w-3" />
              <span>{item.year}</span>
            </div>

            {/* Başlık */}
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>

            {/* Açıklama */}
            <p className="text-muted-foreground text-sm md:text-base max-w-prose leading-relaxed border-l-2 border-muted pl-4 mt-1">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Bitiş Noktası (Gelecek) */}
      <div className="relative pl-8 md:pl-12 opacity-50">
         <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-muted-foreground" />
         <p className="text-sm text-muted-foreground font-mono">To be continued...</p>
      </div>
    </div>
  );
}