"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClapButtonProps {
  id: string;
  initialCount: number;
  onClap: (id: string) => Promise<void>;
}

export function ClapButton({ id, initialCount, onClap }: ClapButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [pending, startTransition] = useTransition();
  const [hasClapped, setHasClapped] = useState(false);

  const handleClap = () => {
    // Optimistic Update: Hemen arayüzü güncelle, bekleme yapma
    setCount((prev) => prev + 1);
    setHasClapped(true);

    startTransition(async () => {
      await onClap(id);
    });
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleClap}
      disabled={pending}
      className={cn(
        "group relative flex items-center gap-2 transition-all duration-300 rounded-full border-primary/20",
        hasClapped 
          ? "bg-primary/10 text-primary border-primary/50" 
          : "hover:bg-primary/5 hover:border-primary/50 hover:scale-105"
      )}
    >
      <div className={cn(
        "p-1 rounded-full transition-transform duration-300",
        hasClapped ? "scale-110" : "group-hover:scale-110"
      )}>
        <Hand className={cn("w-5 h-5", hasClapped && "fill-current")} />
      </div>
      
      <span className="font-bold font-mono text-base">
        {count}
      </span>

      {/* Tıklanınca çıkan +1 animasyonu */}
      {hasClapped && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary font-bold animate-out fade-out slide-out-to-top-4 duration-1000">
          +1
        </span>
      )}
    </Button>
  );
}