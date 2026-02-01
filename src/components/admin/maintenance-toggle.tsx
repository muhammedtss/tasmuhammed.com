"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toggleMaintenanceMode } from "@/lib/actions";

interface MaintenanceToggleProps {
  initialStatus: boolean;
}

export function MaintenanceToggle({ initialStatus }: MaintenanceToggleProps) {
  const [isMaintenance, setIsMaintenance] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      // Optimistic update
      const newState = !isMaintenance;
      setIsMaintenance(newState);
      
      // Server action call
      await toggleMaintenanceMode(isMaintenance);
    } catch (error) {
      console.error(error);
      setIsMaintenance(!isMaintenance); // Revert on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-background/50 p-2 rounded-lg border border-input">
      <Switch 
        id="maintenance-mode" 
        checked={isMaintenance}
        onCheckedChange={handleToggle}
        disabled={loading}
      />
      <Label 
        htmlFor="maintenance-mode" 
        className={`text-xs font-mono font-bold ${isMaintenance ? "text-red-500 animate-pulse" : "text-green-500"}`}
      >
        {isMaintenance ? "BAKIM MODU: AKTİF" : "SİTE YAYINDA"}
      </Label>
    </div>
  );
}