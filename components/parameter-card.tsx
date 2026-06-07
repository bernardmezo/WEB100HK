'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Parameter, ScoreValue, SCORE_VALUES } from '@/lib/types';
import { getScoreColor, getScoreBgColor } from '@/lib/calculator';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ParameterCardProps {
  parameter: Parameter;
  score: ScoreValue;
  onScoreChange: (score: ScoreValue) => void;
  index: number;
  displayMode: 'score' | 'predicate';
}

export function ParameterCard({
  parameter,
  score,
  onScoreChange,
  index,
  displayMode,
}: ParameterCardProps) {
  const [expanded, setExpanded] = useState(false);
  const contribution = (score * parameter.weight) / 100;

  return (
    <Card
      className="transition-all duration-300 animate-fade-in border-border/50 bg-card/50 hover:border-border"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="shrink-0 font-mono text-xs border-emerald-600/30 text-emerald-700 bg-emerald-600/10"
              >
                {parameter.code}
              </Badge>
              <Badge
                variant="outline"
                className="shrink-0 text-xs border-border/50 text-muted-foreground"
              >
                Bobot {parameter.weight}%
              </Badge>
            </div>
            <h3 className="mt-1.5 text-sm font-medium leading-snug">
              {parameter.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
              {parameter.description}
            </p>
          </div>

          {/* Contribution Display */}
          <div className="text-right shrink-0">
            <p className={`text-lg font-bold tabular-nums ${getScoreColor(score)}`}>
              {contribution.toFixed(2)}
            </p>
            <p className="text-[10px] text-muted-foreground">kontribusi</p>
          </div>
        </div>

        {/* Score Selection */}
        <RadioGroup
          value={score.toString()}
          onValueChange={(v) => v && onScoreChange(parseInt(v) as ScoreValue)}
          className="grid grid-cols-4 gap-2"
        >
          {SCORE_VALUES.map((val) => {
            const desc = parameter.scoreDescriptions.find(
              (d) => d.score === val
            );
            const isSelected = score === val;
            return (
              <Tooltip key={val}>
                <TooltipTrigger>
                  <Label
                    htmlFor={`${parameter.code}-${val}`}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? `${getScoreBgColor(val)} scale-[1.02]`
                        : 'border-border/30 bg-secondary/20 hover:bg-secondary/40 hover:border-border/50'
                    }`}
                  >
                    <RadioGroupItem
                      value={val.toString()}
                      id={`${parameter.code}-${val}`}
                      className="sr-only"
                    />
                    {displayMode === 'predicate' ? (
                      <>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${
                            isSelected ? 'text-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          {desc?.label}
                        </span>
                        <span
                          className={`text-[10px] mt-1 tabular-nums ${
                            isSelected ? getScoreColor(val) : 'text-muted-foreground/60'
                          }`}
                        >
                          Skor {val}
                        </span>
                      </>
                    ) : (
                      <>
                        <span
                          className={`text-lg font-bold tabular-nums ${
                            isSelected ? getScoreColor(val) : 'text-muted-foreground'
                          }`}
                        >
                          {val}
                        </span>
                        <span
                          className={`text-[10px] mt-0.5 ${
                            isSelected ? 'text-foreground/70' : 'text-muted-foreground/60'
                          }`}
                        >
                          {desc?.label}
                        </span>
                      </>
                    )}
                  </Label>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs text-xs">
                  <p className="font-medium">{desc?.label}</p>
                  <p className="mt-0.5 text-muted-foreground">
                    {desc?.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </RadioGroup>

        {/* Expand/Collapse for score descriptions */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-full justify-center pt-1"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Sembunyikan deskripsi
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Lihat deskripsi skor
            </>
          )}
        </button>

        {expanded && (
          <div className="space-y-2 animate-fade-in">
            {parameter.scoreDescriptions.map((desc) => (
              <div
                key={desc.score}
                className={`flex gap-3 p-2.5 rounded-lg text-xs ${
                  score === desc.score
                    ? `${getScoreBgColor(desc.score)}`
                    : 'bg-secondary/20'
                }`}
              >
                <Badge
                  variant="outline"
                  className={`shrink-0 h-6 font-mono tabular-nums ${
                    score === desc.score ? getScoreColor(desc.score) : ''
                  }`}
                >
                  {desc.score}
                </Badge>
                <div>
                  <span className="font-medium">{desc.label}: </span>
                  <span className="text-muted-foreground">{desc.description}</span>
                </div>
              </div>
            ))}
            <p className="text-[10px] text-muted-foreground px-1">
              📜 {parameter.legalBasis}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
