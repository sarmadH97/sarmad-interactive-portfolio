'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type Hotspot = {
  id: 'projects' | 'experience' | 'tech-stack' | 'how-i-build' | 'about' | 'contact';
  component: string;
  title: string;
  x: number;
  y: number;
  blurb: string;
};

const HOTSPOTS: Hotspot[] = [
  { id: 'projects', component: 'GPU', title: 'Projects', x: 37, y: 60, blurb: 'Case studies, shipped products, and measurable outcomes.' },
  { id: 'experience', component: 'RAM', title: 'Experience', x: 50, y: 44, blurb: 'Selected roles, scope, and impact across teams.' },
  { id: 'tech-stack', component: 'CPU Cooler', title: 'Tech Stack', x: 35, y: 40, blurb: 'Tools and platforms I use to build reliable software.' },
  { id: 'how-i-build', component: 'Motherboard', title: 'How I Build', x: 54, y: 53, blurb: 'Product thinking, architecture, and delivery workflow.' },
  { id: 'about', component: 'Astronauts', title: 'About', x: 29, y: 66, blurb: 'Who I am, what I value, and what I’m optimizing for.' },
  { id: 'contact', component: 'RGB Fans', title: 'Contact', x: 73, y: 54, blurb: 'Let’s collaborate on meaningful products and systems.' }
];

type PanelProps = {
  active: Hotspot | null;
  onClose: () => void;
};

function HotspotPanel({ active, onClose }: PanelProps) {
  return (
    <AnimatePresence>
      {active && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
            aria-label="Close hotspot panel"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-30 h-full w-full max-w-md border-l border-white/10 bg-panel/95 p-6 backdrop-blur-xl"
          >
            <div className="mb-7 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{active.component}</p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-100">{active.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg border border-white/10 p-2 text-zinc-300 transition hover:border-white/20 hover:text-zinc-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-zinc-300 leading-relaxed">{active.blurb}</p>

            <a
              href={`#${active.id}`}
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 transition hover:bg-white/10"
            >
              Go to section
              <ArrowUpRight size={16} />
            </a>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function EngineeringDesk() {
  const [activeId, setActiveId] = useState<Hotspot['id'] | null>(null);

  const active = useMemo(
    () => HOTSPOTS.find((spot) => spot.id === activeId) ?? null,
    [activeId]
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-[#05070d] to-black">
      <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-cyan-500/15 blur-[130px]" />
      <div className="absolute right-[8%] top-[18%] h-64 w-64 rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-10 px-6 py-10 lg:flex-row lg:gap-12 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">The Engineering Desk</p>
          <h1 className="text-4xl font-semibold leading-tight text-zinc-100 sm:text-5xl">
            A cinematic window into how I engineer products.
          </h1>
          <p className="mt-5 text-zinc-400">
            Explore the machine and jump to each section through precise component hotspots.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-full max-w-3xl"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 shadow-rgb lg:aspect-[16/10]">
            <Image
              src="/pc-setup.jpg"
              alt="The Engineering Desk custom PC setup"
              fill
              priority
              className="object-cover object-center opacity-92"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />

            {HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveId(spot.id)}
                className="group absolute"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                aria-label={`${spot.component} hotspot for ${spot.title}`}
              >
                <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-cyan-100/70 bg-cyan-200/20 shadow-hotspot transition duration-200 group-hover:scale-110 group-hover:bg-cyan-100/40" />
                <span className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-zinc-950/90 px-3 py-1 text-xs text-zinc-100 shadow-lg backdrop-blur group-hover:block">
                  {spot.component}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <HotspotPanel active={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
