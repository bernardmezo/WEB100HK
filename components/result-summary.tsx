'use client';

import { useMemo, useRef } from 'react';
import { Activity } from '@/lib/types';
import { calculateScore, getPredicate, getScoreColor } from '@/lib/calculator';
import { getActiveParameterCodes } from '@/lib/stages';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Trophy, FileText, Printer, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultSummaryProps {
  activity: Activity;
  onBack: () => void;
}

export function ResultSummary({ activity, onBack }: ResultSummaryProps) {
  const result = useMemo(() => calculateScore(activity), [activity]);
  
  const activeCodes = useMemo(() => 
    getActiveParameterCodes(activity.type, activity.stage), 
    [activity.type, activity.stage]
  );
  
  const activeResults = useMemo(() => 
    result.parameterResults.filter(r => activeCodes.has(r.code)),
    [result.parameterResults, activeCodes]
  );

  const predicate = useMemo(() => getPredicate(result.finalScore), [result.finalScore]);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    if (!printRef.current) return;
    try {
      const html2canvas = (await import('html2canvas-pro')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        backgroundColor: '#1a1a2e',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Handle multi-page if content is long
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      if (pdfHeight <= pageHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      } else {
        while (position < pdfHeight) {
          pdf.addImage(imgData, 'PNG', 0, -position, pdfWidth, pdfHeight);
          position += pageHeight;
          if (position < pdfHeight) {
            pdf.addPage();
          }
        }
      }

      pdf.save(`Penilaian_R100HK_${activity.name.replace(/\s+/g, '_')}.pdf`);
    } catch {
      // Fallback to print
      handlePrint();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Nav */}
      <div className="flex items-center justify-between gap-3 no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Penilaian
        </button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-1.5 text-xs"
          >
            <Printer className="h-3.5 w-3.5" />
            Print
          </Button>
          <Button
            size="sm"
            onClick={handleExportPDF}
            className="gap-1.5 text-xs bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white"
          >
            <FileText className="h-3.5 w-3.5" />
            Export PDF
          </Button>
        </div>
      </div>

      <div ref={printRef} className="space-y-6">
        {/* Print Header */}
        <div className="print-only text-center mb-6">
          <h1 className="text-xl font-bold text-foreground">Sistem Penilaian R100HK IKM PNJ</h1>
          <p className="text-sm">
            Rapat 100 Hari Kerja — IKM PNJ 2026
          </p>
        </div>

        {/* Big Score Display */}
        <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 overflow-hidden">
          <CardContent className="p-6 text-center relative">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-600 to-teal-500 blur-3xl" />
            </div>

            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Hasil Penilaian
                </h2>
              </div>

              <h3 className="text-base font-semibold mb-1">{activity.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  {activity.type === 'proker' ? 'Program Kerja' : 'Agenda'}
                </Badge>
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Tahap {activity.stage}
                </Badge>
              </div>

              <p
                className={`text-6xl font-extrabold tabular-nums bg-gradient-to-r ${predicate.color} bg-clip-text text-transparent mb-2`}
              >
                {result.finalScore.toFixed(2)}
              </p>

              <Badge
                className={`${predicate.bgColor} ${predicate.textColor} border-0 text-base px-4 py-1.5 font-semibold`}
              >
                {result.predicate}
              </Badge>

              <p className="mt-3 text-xs text-muted-foreground max-w-sm mx-auto">
                {predicate.interpretation}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown Table */}
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Breakdown Per Parameter Aktif</h3>
              <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-500/30">
                Tahap {activity.stage}
              </Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                      Kode
                    </th>
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                      Parameter
                    </th>
                    <th className="text-center py-2 px-2 font-medium text-muted-foreground">
                      Bobot (Asli)
                    </th>
                    <th className="text-center py-2 px-2 font-medium text-muted-foreground">
                      Skor
                    </th>
                    <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                      Kontribusi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeResults.map((r) => (
                    <tr
                      key={r.code}
                      className="border-b border-border/20 last:border-0 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="py-2 px-2 font-mono text-emerald-700">
                        {r.code}
                      </td>
                      <td className="py-2 px-2 max-w-[200px] truncate">{r.name}</td>
                      <td className="py-2 px-2 text-center text-muted-foreground">
                        {r.weight}%
                      </td>
                      <td className={`py-2 px-2 text-center font-bold ${getScoreColor(r.score)}`}>
                        {r.score}
                      </td>
                      <td className="py-2 px-2 text-right font-bold tabular-nums">
                        {r.contribution.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border/50">
                    <td
                      colSpan={4}
                      className="py-3 px-2 font-semibold text-right"
                    >
                      Nilai Akhir (Tahap {activity.stage})
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-extrabold text-base tabular-nums bg-gradient-to-r ${predicate.color} bg-clip-text text-transparent`}
                    >
                      {result.finalScore.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mt-4 p-2.5 rounded-lg bg-secondary/30 text-[10px] leading-relaxed text-muted-foreground border border-border/30">
              <div className="flex gap-2">
                <Info className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                <p>
                  Sesuai <strong>Tahap {activity.stage}</strong>, parameter yang belum tercapai dikecualikan dari penilaian. 
                  Bobot parameter aktif didistribusikan secara proporsional sehingga Nilai Akhir tetap dalam skala 25-100.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual Bar Chart */}
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-3">Visualisasi Kontribusi Parameter Aktif</h3>
            <div className="space-y-2">
              {activeResults.map((r) => {
                const maxContrib = 100 * Math.max(...activeResults.map(p => p.weight)) / 100;
                const widthPercent = maxContrib > 0 ? (r.contribution / maxContrib) * 100 : 0;
                return (
                  <div key={r.code} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-700 w-7 shrink-0">
                      {r.code}
                    </span>
                    <div className="flex-1 h-5 bg-secondary/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          r.score === 100
                            ? 'from-emerald-500 to-emerald-400'
                            : r.score === 75
                            ? 'from-blue-500 to-blue-400'
                            : r.score === 50
                            ? 'from-amber-500 to-amber-400'
                            : 'from-rose-500 to-rose-400'
                        } transition-all duration-500`}
                        style={{ width: `${Math.max(widthPercent, 2)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono tabular-nums text-muted-foreground w-10 text-right shrink-0">
                      {r.contribution.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Formula Reference */}
        <Separator className="opacity-30" />
        <div className="text-center text-[10px] text-muted-foreground space-y-0.5">
          <p>Rumus: Nilai Akhir = Σ (Skor_i × Bobot_i) / Σ Bobot_aktif</p>
          <p>Skala skor: 25 / 50 / 75 / 100</p>
          <p>
            Dicetak pada:{' '}
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
