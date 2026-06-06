'use client';

import { ClipboardList } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur no-print">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-700/30 bg-emerald-700/10">
            <ClipboardList className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              MPM Distrik TIK
            </p>
            <h1 className="text-lg font-semibold font-heading text-foreground">
              Kalkulator Penilaian R100HK
            </h1>
            <p className="text-xs text-muted-foreground">
              Rapat 100 Hari Kerja — IKM PNJ 2025/2026
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-[11px] text-muted-foreground">
          Evaluasi Paruh Periode
        </div>
      </div>
    </header>
  );
}
