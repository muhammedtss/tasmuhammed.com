import { getProfile } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Coffee, Music } from "lucide-react";
import Link from "next/link";

// Profil verisinin yapısını tanımlayarak tür güvenliği sağlıyoruz.
type Profile = {
  spotifySong?: string | null;
  spotifyArtist?: string | null;
  spotifyUrl?: string | null;
  buyMeACoffeeUrl?: string | null;
};

export async function SupportWidget() {
  // Veritabanından profili çekmeye çalış
  let profile: Profile | null = null;
  
  try {
    profile = await getProfile();
  } catch (error) {
    // Hata ayıklama için hatayı konsola yazdırıyoruz.
    console.error("Destek widget'ı için profil verisi çekilemedi:", error);
    return null;
  }

  // Profil yoksa veya hiçbir widget bilgisi girilmemişse gösterme
  if (!profile) return null;
  
  const hasSpotify = profile.spotifySong && profile.spotifyUrl;
  const hasCoffee = profile.buyMeACoffeeUrl;

  if (!hasSpotify && !hasCoffee) return null;

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center py-8 border-t border-primary/10 mt-12">
      
      {/* SPOTIFY KARTI */}
      {hasSpotify && (
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
          <Music className="h-4 w-4 animate-pulse shrink-0" />
          <div className="text-xs flex flex-col sm:flex-row sm:gap-1">
            <span className="opacity-70">Dinliyorum: </span>
            <div className="flex gap-1">
                <Link href={profile.spotifyUrl ?? "#"} target="_blank" className="font-bold hover:underline line-clamp-1 max-w-[150px]">
                {profile.spotifySong}
                </Link>
                <span className="opacity-50 line-clamp-1 max-w-[100px]"> - {profile.spotifyArtist}</span>
            </div>
          </div>
        </div>
      )}

      {/* KAHVE BUTONU */}
      {hasCoffee && (
        <Button asChild variant="secondary" size="sm" className="gap-2 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border border-yellow-500/20 dark:text-yellow-400">
          <Link href={profile.buyMeACoffeeUrl ?? "#"} target="_blank">
            <Coffee className="h-4 w-4" /> Bana Bir Kahve Ismarla
          </Link>
        </Button>
      )}
    </div>
  );
}