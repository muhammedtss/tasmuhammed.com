import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Önce temizlik
  await prisma.project.deleteMany()
  await prisma.timelineItem.deleteMany()

  // 1. Projeler Ekle
  await prisma.project.createMany({
    data: [
      {
        title: "SkyPulse Drone Controller",
        description: "MQTT tabanlı gerçek zamanlı drone telemetri sistemi.",
        tags: "IoT,Python,MQTT",
        featured: true,
        repoUrl: "https://github.com/muhammedtss",
      },
      {
        title: "SUI Blockchain Marketplace",
        description: "Move dili ile yazılmış merkeziyetsiz NFT pazarı.",
        tags: "Move,Blockchain,React",
        featured: true,
      },
      {
        title: "Portfolio V1",
        description: "Kişisel dijital bahçem ve blog sitem.",
        tags: "Next.js,Tailwind,Prisma",
      }
    ]
  })

  // 2. Timeline Ekle
  await prisma.timelineItem.createMany({
    data: [
      {
        year: "2025",
        title: "Fırat Üniversitesi",
        description: "Havacılık Elektrik ve Elektroniği bölümüne başladım.",
        order: 1,
      },
      {
        year: "2025",
        title: "Fırat Blockchain",
        description: "Yönetim ekibine katıldım ve Workshoplar düzenledim.",
        order: 2,
      }
    ]
  })

  console.log('🌱 Tohumlama başarılı! Veritabanı şenlendi.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })