'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useState } from 'react';
import { EngineeringDeskFallback } from './engineering-desk-fallback';

const EngineeringDesk3D = dynamic(
  () => import('./engineering-desk-3d').then((m) => m.EngineeringDesk3D),
  { ssr: false }
);

const content: Record<string, { title: string; copy: string }> = {
  projects: { title: 'Projects', copy: 'Interactive case studies and production launches.' },
  experience: { title: 'Experience', copy: 'Career milestones and measurable impact.' },
  'tech-stack': { title: 'Tech Stack', copy: 'Languages, frameworks, and systems I use daily.' },
  'ai-upbeater': { title: 'AI / Upbeater', copy: 'Applied AI initiatives and product experiments.' },
  about: { title: 'About', copy: 'My philosophy, values, and engineering approach.' },
  contact: { title: 'Contact / Availability', copy: 'Collaboration, consulting, and current availability.' },
  'builder-story': { title: 'Builder Story', copy: 'The journey, curiosity, and habits behind my craft.' }
};

export function EngineeringDesk() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-[#05070d] to-black">
      <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-cyan-500/15 blur-[130px]" />
      <div className="absolute right-[8%] top-[18%] h-64 w-64 rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-10 px-6 py-10 lg:flex-row lg:gap-12 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="w-full max-w-md">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">The Engineering Desk</p>
          <h1 className="text-4xl font-semibold leading-tight text-zinc-100 sm:text-5xl">A fixed-camera 3D workspace portfolio scene.</h1>
          <p className="mt-5 text-zinc-400">Minimal, cinematic, and interactive — designed for elegant storytelling.</p>
        </motion.div>

        <div className="w-full max-w-3xl">
          <div className="hidden md:block">
            <EngineeringDesk3D onOpen={setActive} />
          </div>
          <div className="md:hidden">
            <EngineeringDeskFallback onOpen={setActive} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm" aria-label="Close panel" />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 30 }} className="fixed right-0 top-0 z-30 h-full w-full max-w-md border-l border-white/10 bg-panel/95 p-6 backdrop-blur-xl">
              <div className="mb-7 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Workspace Node</p>
                  <h2 className="mt-2 text-2xl font-semibold text-zinc-100">{content[active]?.title}</h2>
                </div>
                <button onClick={() => setActive(null)} className="rounded-lg border border-white/10 p-2 text-zinc-300 transition hover:border-white/20 hover:text-zinc-100" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <p className="text-zinc-300 leading-relaxed">{content[active]?.copy}</p>
              <a href={`#${active}`} className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 transition hover:bg-white/10">
                Go to section
                <ArrowUpRight size={16} />
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
