'use client';

import Image from 'next/image';

type FallbackProps = {
  onOpen: (key: string) => void;
};

const fallbackHotspots = [
  { key: 'projects', label: 'PC', x: 70, y: 55 },
  { key: 'experience', label: 'Monitor', x: 38, y: 24 },
  { key: 'tech-stack', label: 'Keyboard', x: 38, y: 76 },
  { key: 'ai-upbeater', label: 'Laptop', x: 52, y: 63 },
  { key: 'about', label: 'Plant', x: 19, y: 64 },
  { key: 'contact', label: 'Clock', x: 17, y: 20 },
  { key: 'builder-story', label: 'Astronauts', x: 78, y: 70 }
];

export function EngineeringDeskFallback({ onOpen }: FallbackProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-rgb">
      <Image src="/pc-setup.jpg" alt="Engineering Desk fallback" fill className="object-cover" />
      {fallbackHotspots.map((spot) => (
        <button key={spot.key} onClick={() => onOpen(spot.key)} className="group absolute" style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
          <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-cyan-100/70 bg-cyan-200/20 shadow-hotspot transition group-hover:scale-110" />
          <span className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-zinc-950/90 px-3 py-1 text-xs text-zinc-100 group-hover:block">
            {spot.label}
          </span>
        </button>
      ))}
    </div>
  );
}
