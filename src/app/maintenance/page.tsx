import { Wrench } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 font-mono">
      <div className="max-w-md text-center space-y-6 border border-zinc-800 p-8 rounded-2xl bg-zinc-900/50 backdrop-blur">
        <div className="flex justify-center">
           <Wrench className="h-16 w-16 text-yellow-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Sistem Bakımda
        </h1>
        <p className="text-zinc-400">
          Digital Garden şu anda güncelleniyor. 
          Kısa süre sonra yeni özelliklerle döneceğiz.
        </p>
        <div className="pt-4">
            <span className="inline-block px-3 py-1 text-[10px] text-zinc-600 border border-zinc-800 rounded-full">
                STATUS: 503_SERVICE_UNAVAILABLE
            </span>
        </div>
      </div>
    </div>
  );
}