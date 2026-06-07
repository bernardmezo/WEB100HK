'use client';

import { useMemo, useState } from 'react';
import { Activity, ScoreValue } from '@/lib/types';
import { PROKER_PARAMETERS, AGENDA_PARAMETERS } from '@/lib/parameters';
import { calculateScore, getPredicate } from '@/lib/calculator';
import { ParameterCard } from './parameter-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3 } from 'lucide-react';

interface ScoringFormProps {
  activity: Activity;
  onScoreChange: (paramCode: string, score: ScoreValue) => void;
  onBack: () => void;
  onViewResults: () => void;
}

export function ScoringForm({
  activity,
  onScoreChange,
  onBack,
  onViewResults,
}: ScoringFormProps) {
  const parameters =
    activity.type === 'proker' ? PROKER_PARAMETERS : AGENDA_PARAMETERS;

  const result = useMemo(() => calculateScore(activity), [activity]);
  const predicate = useMemo(() => getPredicate(result.finalScore), [result.finalScore]);
  const [inputMode, setInputMode] = useState<'predicate' | 'score'>('predicate');

  const scoredParams = parameters.filter(
    (p) => activity.scores[p.code] !== undefined
  );
  const progressPercent =
    parameters.length > 0
      ? (scoredParams.length / parameters.length) * 100
      : 100;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border/50 bg-secondary/30 p-1">
            <Button
              type="button"
              size="sm"
              variant={inputMode === 'predicate' ? 'default' : 'ghost'}
              className="h-7 px-2 text-xs"
              onClick={() => setInputMode('predicate')}
            >
              Predikat
            </Button>
            <Button
              type="button"
              size="sm"
              variant={inputMode === 'score' ? 'default' : 'ghost'}
              className="h-7 px-2 text-xs"
              onClick={() => setInputMode('score')}
            >
              Skor
            </Button>
          </div>
          <button
            onClick={onViewResults}
            className="flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-600 transition-colors font-medium"
          >
            <BarChart3 className="h-4 w-4" />
            Lihat Hasil
          </button>
        </div>
      </div>

      {/* Activity Info */}
      <div className="glass-card rounded-xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-base">{activity.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {activity.type === 'proker' ? 'Program Kerja' : 'Agenda'}
              </Badge>
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Tahap {activity.stage}
              </Badge>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {scoredParams.length}/{parameters.length} parameter dinilai
            </span>
            <span className="text-muted-foreground">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>
      </div>

      {/* Parameter Cards */}
      <div className="space-y-3">
        {parameters.map((param, i) => {
          const score: ScoreValue = activity.scores[param.code] ?? 50;

          return (
            <ParameterCard
              key={param.code}
              parameter={param}
              score={score}
              onScoreChange={(s) => onScoreChange(param.code, s)}
              index={i}
              displayMode={inputMode}
            />
          );
        })}
      </div>

      {/* Sticky Bottom Score Bar */}
      <div className="sticky bottom-0 z-40 -mx-4 px-4 pb-4 pt-2 no-print">
        <div className="glass rounded-xl p-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Nilai Akhir</p>
            <p
              className={`text-2xl font-bold tabular-nums bg-gradient-to-r ${predicate.color} bg-clip-text text-transparent`}
            >
              {result.finalScore.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <Badge
              className={`${predicate.bgColor} ${predicate.textColor} border-0 text-sm px-3 py-1`}
            >
              {result.predicate}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
