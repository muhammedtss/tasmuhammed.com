"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react"; // <-- GARANTİ İKON
import { clapPost, clapProject } from "@/lib/actions";
import { motion } from "framer-motion";

interface ClapButtonProps {
  id: string;
  initialClaps: number;
  type: "post" | "project";
}

export function ClapButton({ id, initialClaps, type }: ClapButtonProps) {
  const [claps, setClaps] = useState(initialClaps);
  const [isClicked, setIsClicked] = useState(false);

  const handleClap = async () => {
    // Optimistic update
    setClaps((prev) => prev + 1);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);

    if (type === "post") {
      await clapPost(id);
    } else {
      await clapProject(id);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div whileTap={{ scale: 0.8 }}>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleClap}
          className={`gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all ${isClicked ? "bg-primary/20 scale-110" : ""}`}
        >
          {/* İkonu Heart yaptık */}
          <Heart className={`h-5 w-5 ${isClicked ? "fill-primary text-primary" : ""}`} />
          <span>Beğen</span>
        </Button>
      </motion.div>
      
      <div className="text-sm font-mono text-muted-foreground">
        <span className="font-bold text-foreground">{claps}</span> kişi beğendi
      </div>
    </div>
  );
}