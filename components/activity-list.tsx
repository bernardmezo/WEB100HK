'use client';

import { useMemo, useState } from 'react';
import { Activity, ActivityType } from '@/lib/types';
import { calculateScore, getPredicate } from '@/lib/calculator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Briefcase,
  CalendarDays,
  ChevronRight,
  Trash2,
  BarChart3,
  ListChecks,
  FileSpreadsheet,
  FileUp,
} from 'lucide-react';
import { exportToExcel } from '@/lib/excel-export';
import { ImportPdfModal } from './import-pdf-modal';

interface ActivityListProps {
  activities: Activity[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onImport: (items: { name: string; type: ActivityType; stage: number }[]) => void;
}

function ActivityCard({
  activity,
  onSelect,
  onDelete,
}: {
  activity: Activity;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const result = useMemo(() => calculateScore(activity), [activity]);
  const predicate = useMemo(() => getPredicate(result.finalScore), [result.finalScore]);

  return (
    <Card
      className="border-border/50 bg-card/50 hover:border-border/80 transition-all duration-300 cursor-pointer group hover:scale-[1.01]"
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                activity.type === 'proker'
                  ? 'bg-emerald-600/15 text-emerald-700'
                  : 'bg-amber-500/15 text-amber-700'
              }`}
            >
              {activity.type === 'proker' ? (
                <Briefcase className="h-5 w-5" />
              ) : (
                <CalendarDays className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate">{activity.name}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="outline" className="text-[10px]">
                  {activity.type === 'proker' ? 'Program Kerja' : 'Agenda'}
                </Badge>
                <Badge variant="outline" className="text-[10px] text-muted-foreground">
                  Tahap {activity.stage}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p
                className={`text-xl font-bold tabular-nums bg-gradient-to-r ${predicate.color} bg-clip-text text-transparent`}
              >
                {result.finalScore.toFixed(1)}
              </p>
              <Badge
                className={`${predicate.bgColor} ${predicate.textColor} border-0 text-[10px] px-2`}
              >
                {result.predicate}
              </Badge>
            </div>

            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-rose-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ActivityList({ activities, onSelect, onDelete, onImport }: ActivityListProps) {
  const [importModalOpen, setImportModalOpen] = useState(false);
  // Recap stats
  const stats = useMemo(() => {
    if (activities.length === 0) return null;

    const results = activities.map((a) => ({
      activity: a,
      result: calculateScore(a),
    }));

    const avgScore =
      results.reduce((sum, r) => sum + r.result.finalScore, 0) / results.length;
    const predicateCounts: Record<string, number> = {};
    results.forEach((r) => {
      const p = getPredicate(r.result.finalScore);
      predicateCounts[p.label] = (predicateCounts[p.label] || 0) + 1;
    });

    return {
      total: activities.length,
      avgScore,
      avgPredicate: getPredicate(avgScore),
      predicateCounts,
    };
  }, [activities]);

  if (activities.length === 0) {
    return (
      <div className="text-center py-12 space-y-3 animate-fade-in">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-secondary/50 flex items-center justify-center">
            <ListChecks className="h-8 w-8 text-muted-foreground/50" />
          </div>
        </div>
        <h3 className="text-sm font-medium text-muted-foreground">
          Belum ada kegiatan
        </h3>
        <p className="text-xs text-muted-foreground/70 mb-4">
          Tambahkan kegiatan baru atau import dari PDF Raker
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setImportModalOpen(true)}
          className="gap-1.5 text-xs"
        >
          <FileUp className="h-3.5 w-3.5" />
          Import dari PDF Raker
        </Button>
        <ImportPdfModal
          open={importModalOpen}
          onOpenChange={setImportModalOpen}
          onConfirm={onImport}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setImportModalOpen(true)}
          className="h-8 px-2 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <FileUp className="h-3.5 w-3.5" />
          Import dari PDF Raker
        </Button>
      </div>

      <ImportPdfModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onConfirm={onImport}
      />

      {/* Recap Card */}
      {stats && (
        <Card className="border-emerald-600/20 bg-emerald-600/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-700" />
                <h3 className="text-sm font-semibold">Rekapitulasi</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToExcel(activities)}
                className="h-7 px-2 text-[10px] gap-1 border-emerald-600/30 text-emerald-700 hover:bg-emerald-600/10"
              >
                <FileSpreadsheet className="h-3 w-3" />
                Export Excel
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.total}
                </p>
                <p className="text-[10px] text-muted-foreground">Kegiatan</p>
              </div>
              <div>
                <p
                  className={`text-2xl font-bold tabular-nums bg-gradient-to-r ${stats.avgPredicate.color} bg-clip-text text-transparent`}
                >
                  {stats.avgScore.toFixed(1)}
                </p>
                <p className="text-[10px] text-muted-foreground">Rata-rata</p>
              </div>
              <div>
                <Badge
                  className={`${stats.avgPredicate.bgColor} ${stats.avgPredicate.textColor} border-0 text-xs`}
                >
                  {stats.avgPredicate.label}
                </Badge>
                <p className="text-[10px] text-muted-foreground mt-1">Predikat</p>
              </div>
            </div>

            {Object.keys(stats.predicateCounts).length > 1 && (
              <>
                <Separator className="my-3 opacity-30" />
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(stats.predicateCounts).map(([label, count]) => {
                    const p = getPredicate(
                      label === 'Sangat Baik'
                        ? 90
                        : label === 'Baik'
                        ? 80
                        : label === 'Cukup'
                        ? 60
                        : label === 'Kurang'
                        ? 50
                        : 30
                    );
                    return (
                      <Badge
                        key={label}
                        variant="outline"
                        className={`text-[10px] ${p.textColor}`}
                      >
                        {label}: {count}
                      </Badge>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Activity List */}
      <div className="space-y-2">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onSelect={() => onSelect(activity.id)}
            onDelete={() => onDelete(activity.id)}
          />
        ))}
      </div>
    </div>
  );
}
