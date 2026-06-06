'use client';

export function Footer() {
  return (
    <footer className="mt-auto py-8 text-xs text-muted-foreground no-print">
      <div className="mx-auto max-w-5xl px-4">
        <div className="border-t border-border/60 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-medium text-foreground/70">
            MPM Distrik TIK — IKM PNJ 2025/2026
          </p>
          <p>
            Berdasarkan TAP 008/TAP/MPM PNJ/VII/2025 · Parameter Penilaian Rapat
            100 Hari Kerja
          </p>
        </div>
      </div>
    </footer>
  );
}
