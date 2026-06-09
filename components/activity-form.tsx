'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ActivityType, PROKER_STAGES, AGENDA_STAGES } from '@/lib/types';
import { getStageDescription } from '@/lib/stages';
import { Briefcase, CalendarDays, ChevronRight, Sparkles } from 'lucide-react';

interface ActivityFormProps {
  onSubmitSingle: (name: string, type: ActivityType, stage: number) => void;
  onSubmitBatch: (names: string[], type: ActivityType, stage: number) => void;
}

export function ActivityForm({ onSubmitSingle, onSubmitBatch }: ActivityFormProps) {
  const [name, setName] = useState('');
  const [batchNames, setBatchNames] = useState('');
  const [type, setType] = useState<ActivityType | null>(null);
  const [stage, setStage] = useState<number | null>(null);
  const [mode, setMode] = useState<'single' | 'batch'>('single');

  const stages = type === 'proker' ? PROKER_STAGES : type === 'agenda' ? AGENDA_STAGES : [];
  const stageDesc = type && stage ? getStageDescription(type, stage) : null;

  const parsedBatchNames = useMemo(
    () =>
      batchNames
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    [batchNames]
  );

  const canSubmit =
    !!type &&
    !!stage &&
    (mode === 'single' ? !!name.trim() : parsedBatchNames.length > 0);

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (mode === 'single') {
      onSubmitSingle(name.trim(), type!, stage!);
      setName('');
    } else {
      onSubmitBatch(parsedBatchNames, type!, stage!);
      setBatchNames('');
    }
    setType(null);
    setStage(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-700" />
          <h2 className="text-xl font-bold tracking-tight">Tambah Kegiatan Baru</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Pilih jenis kegiatan dan tahap untuk memulai penilaian
        </p>
      </div>

      {/* Input Mode */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as 'single' | 'batch')}>
        <TabsList className="grid w-full grid-cols-2 bg-secondary/30">
          <TabsTrigger value="single" className="text-xs">
            Input Satu Kegiatan
          </TabsTrigger>
          <TabsTrigger value="batch" className="text-xs">
            Input Banyak Kegiatan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-2 pt-4">
          <Label htmlFor="activity-name" className="text-sm font-medium">
            Nama Kegiatan
          </Label>
          <Input
            id="activity-name"
            placeholder="Contoh: Seminar Nasional Teknologi..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 bg-secondary/50 border-border/50 focus:border-emerald-600/50 transition-colors"
          />
        </TabsContent>

        <TabsContent value="batch" className="space-y-2 pt-4">
          <Label htmlFor="activity-batch" className="text-sm font-medium">
            Daftar Kegiatan (1 baris = 1 kegiatan)
          </Label>
          <textarea
            id="activity-batch"
            placeholder="Contoh:\nSeminar Nasional Teknologi\nWorkshop UI/UX\nRapat Koordinasi Divisi"
            value={batchNames}
            onChange={(e) => setBatchNames(e.target.value)}
            rows={6}
            className="w-full rounded-md bg-secondary/50 border border-border/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40"
          />
          <p className="text-[11px] text-muted-foreground">
            Total terdeteksi: {parsedBatchNames.length} kegiatan
          </p>
        </TabsContent>
      </Tabs>

      {/* Activity Type Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Jenis Kegiatan</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Proker Card */}
          <button
            onClick={() => {
              setType('proker');
              setStage(null);
            }}
            className="group text-left"
          >
            <Card
              className={`transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                type === 'proker'
                  ? 'border-emerald-600/60 bg-emerald-600/10 shadow-lg shadow-emerald-600/10'
                  : 'border-border/50 bg-secondary/30 hover:border-emerald-600/30'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      type === 'proker'
                        ? 'bg-emerald-600/15 text-emerald-700'
                        : 'bg-secondary text-muted-foreground group-hover:text-emerald-700'
                    }`}
                  >
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Program Kerja</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      14 parameter · 5 tahap · Skala besar dengan kepanitiaan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </button>

          {/* Agenda Card */}
          <button
            onClick={() => {
              setType('agenda');
              setStage(null);
            }}
            className="group text-left"
          >
            <Card
              className={`transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                type === 'agenda'
                  ? 'border-amber-500/60 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                  : 'border-border/50 bg-secondary/30 hover:border-amber-500/30'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      type === 'agenda'
                        ? 'bg-amber-500/20 text-amber-700'
                        : 'bg-secondary text-muted-foreground group-hover:text-amber-700'
                    }`}
                  >
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Agenda</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      9 parameter · 3 tahap · Internal pengurus tanpa kepanitiaan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </button>
        </div>
      </div>

      {/* Stage Selection */}
      {type && (
        <div className="space-y-3 animate-fade-in">
          <Label className="text-sm font-medium">Tahap Kegiatan</Label>
          <Select
            value={stage?.toString() ?? ''}
            onValueChange={(v) => v && setStage(parseInt(v))}
          >
            <SelectTrigger className="h-11 bg-secondary/50 border-border/50">
              <SelectValue placeholder="Pilih tahap kegiatan saat R100HK..." />
            </SelectTrigger>
            <SelectContent>
              {stages.map((s) => (
                <SelectItem key={s.stage} value={s.stage.toString()}>
                  <span className="font-medium">{s.label}</span>
                  <span className="text-muted-foreground ml-2">— {s.description}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Stage Info */}
          {stageDesc && (
            <div className="rounded-lg bg-emerald-600/5 border border-emerald-600/10 p-3 text-xs animate-fade-in text-center">
              <p className="text-muted-foreground">
                Berdasarkan <strong>Tahap {stage}</strong>, parameter aktif adalah <strong>{stageDesc.active}</strong>. 
                Parameter lainnya bernilai 0 tanpa normalisasi, merepresentasikan capaian riil saat ini.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full h-11 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-medium shadow-lg shadow-emerald-700/20 disabled:opacity-40 disabled:shadow-none transition-all duration-300"
      >
        Mulai Penilaian
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
