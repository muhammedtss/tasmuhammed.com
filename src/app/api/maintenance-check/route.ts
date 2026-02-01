import prisma from "@/lib/prisma"; // Süslü parantez YOK, actions.ts ile aynı.
import { NextResponse } from "next/server";

// Bu satır kritik: Veritabanı yanıtını cache'lememesi için şart
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { key: "maintenance_mode" },
    });
    
    // Config yoksa veya false ise site açık demektir
    const isMaintenance = config?.value === "true";
    
    return NextResponse.json({ isMaintenance }, { status: 200 });
  } catch (error) {
    console.error("Maintenance API Error:", error);
    // Hata durumunda sistemi açık tut (False dön)
    return NextResponse.json({ isMaintenance: false }, { status: 200 });
  }
}