"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Code2, Terminal, Cpu, Coffee } from "lucide-react";
import { ParticleBackground } from "@/components/ui/particle-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Sağdaki kod görseli için animasyon
  const codeBlockVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }
    }
  };

  return (
    <section className="relative flex min-h-[90vh] w-full items-center overflow-hidden py-20 lg:py-0">
      {/* Arka Plan */}
      <ParticleBackground />
      
      <div className="container relative z-10 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* --- SOL TARAF (Metin & Daktilo) --- */}
          <motion.div
            className="flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Etiket */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
            >
              <span className="mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              INTERMEDIATE ENGINEER & DRONE PILOT
            </motion.div>

            {/* Başlık ve Daktilo Efekti */}
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
            >
              Architecting <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent h-[1.2em] block">
                <TypeAnimation
                  sequence={[
                    'the Digital Garden', 2000,
                    'Web Applications', 2000,
                    'Drone Systems', 2000,
                    'Smart Contracts', 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.h1>

            {/* Açıklama */}
            <motion.p
              variants={itemVariants}
              className="mb-10 max-w-[500px] text-lg text-muted-foreground md:text-xl leading-relaxed"
            >
              FREEDOM IN THE SKY & OBSESSION OF CODING
            </motion.p>

            {/* Butonlar */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base">
                <Link href="/lab">
                  Explore my projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="gap-2 border-primary/20 bg-background/50 backdrop-blur-sm h-12 px-8 text-base hover:bg-primary/5">
                <Link href="/roadmap">
                  Roadmap <BookOpen className="h-4 w-4" />
                </Link>
              </Button>

              {/* Buy Me a Coffee Button - EKLENDİ */}
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="gap-2 h-12 px-6 text-base border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 dark:border-orange-900/40 dark:text-orange-400 dark:hover:bg-orange-900/20 backdrop-blur-sm transition-all"
              >
                <a 
                    href="https://buymeacoffee.com/muhammedtss" // <-- BURAYI KENDİ ADINLA DEĞİŞTİR
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                  <Coffee className="h-4 w-4" />
                  <span className="hidden xl:inline">Buy me a Coffee</span>
                  <span className="xl:hidden">Support</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>


          {/* --- SAĞ TARAF (Kod Penceresi Görseli) --- */}
          <motion.div
            variants={codeBlockVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:block relative"
          >
            {/* Arka plan bulanıklık efekti */}
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-30 -z-10" />
            
            {/* Kod Penceresi */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-primary/10 rounded-2xl overflow-hidden shadow-2xl relative transform rotate-2 hover:rotate-0 transition-all duration-500 group">
                
                {/* Pencere Başlığı */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10 bg-card/50">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <Terminal className="h-3 w-3" /> source.tsx
                    </div>
                    <div />
                </div>

                {/* Kod İçeriği */}
                <div className="p-6 text-sm font-mono leading-relaxed relative">
                    <Code2 className="absolute top-4 right-4 h-10 w-10 text-primary/10 group-hover:text-primary/30 transition-colors" />
                    <Cpu className="absolute bottom-4 right-10 h-16 w-16 text-purple-500/10 group-hover:text-purple-500/30 transition-colors" />

                    <div className="flex gap-4">
                        <div className="flex flex-col text-muted-foreground select-none pr-4 border-r border-primary/10 text-right">
                            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                        </div>
                        <div className="text-blue-300">
                            <span className="text-pink-400">const</span> <span className="text-yellow-300">developer</span> = <span className="text-pink-400">{`{`}</span><br />
                            &nbsp;&nbsp;<span className="text-foreground">name:</span> <span className="text-green-300">&apos;Muhammed Taş&apos;</span>,<br />
                            &nbsp;&nbsp;<span className="text-foreground">role:</span> <span className="text-green-300">[&apos;Programmer&apos;, &apos;Drone Pilot&apos;]</span>,<br />
                            &nbsp;&nbsp;<span className="text-foreground">stack:</span> <span className="text-pink-400">{`{`}</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-foreground">frontend:</span> <span className="text-green-300">&apos;Next.js 15&apos;</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-foreground">backend:</span> <span className="text-green-300">&apos;Node & Prisma&apos;</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-foreground">blockchain:</span> <span className="text-green-300">&apos;Fırat Blockchain&apos;</span><br />
                            &nbsp;&nbsp;<span className="text-pink-400">{`}`}</span>,<br />
                            &nbsp;&nbsp;<span className="text-yellow-300">buildFuture</span>: () <span className="text-pink-400">=&gt;</span> <span className="text-green-300">&apos;Loading...&apos;</span><br />
                            <span className="text-pink-400">{`}`}</span>;
                        </div>
                    </div>
                    
                    {/* İmleç Efekti */}
                    <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute bottom-[4.5rem] left-[15.5rem] h-4 w-2 bg-primary hidden md:block"
                    />
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
