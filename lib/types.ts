// ===== Core Types for R100HK Assessment Calculator =====

export type ActivityType = 'proker' | 'agenda';

export type ScoreValue = 0 | 25 | 50 | 75;

export const SCORE_VALUES: ScoreValue[] = [0, 25, 50, 75];

export const SCORE_LABELS: Record<ScoreValue, string> = {
  0: 'Tidak Terpenuhi',
  25: 'Kurang',
  50: 'Cukup',
  75: 'Baik',
};

export interface ScoreDescription {
  score: ScoreValue;
  label: string;
  description: string;
}

export interface Parameter {
  code: string;
  name: string;
  weight: number; // percentage, e.g. 8 for 8%
  legalBasis: string;
  description: string;
  baselineNote?: string; // optional note about when baseline applies
  scoreDescriptions: ScoreDescription[];
}

export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  stage: number;
  scores: Record<string, ScoreValue>;
  createdAt: number;
}

export interface ParameterResult {
  code: string;
  name: string;
  weight: number;
  score: ScoreValue;
  isBaseline: boolean;
  contribution: number; // score * weight / 100
}

export interface CalculationResult {
  parameterResults: ParameterResult[];
  finalScore: number;
  predicate: string;
  predicateColor: string;
  interpretation: string;
}

export interface StageInfo {
  stage: number;
  label: string;
  description: string;
}

export const PROKER_STAGES: StageInfo[] = [
  { stage: 1, label: 'Tahap 1', description: 'Disahkan di Raker, proposal belum diajukan' },
  { stage: 2, label: 'Tahap 2', description: 'Proposal/KAK sudah diajukan, belum pelaksanaan' },
  { stage: 3, label: 'Tahap 3', description: 'Sedang dalam pelaksanaan / pleno berlangsung' },
  { stage: 4, label: 'Tahap 4', description: 'Selesai, LPJ belum diserahkan' },
  { stage: 5, label: 'Tahap 5', description: 'Selesai penuh termasuk LPJ dan administrasi' },
];

export const AGENDA_STAGES: StageInfo[] = [
  { stage: 1, label: 'Tahap 1', description: 'Tercantum di Raker, belum terlaksana' },
  { stage: 2, label: 'Tahap 2', description: 'Sedang berjalan' },
  { stage: 3, label: 'Tahap 3', description: 'Selesai, pelaporan dan administrasi lengkap' },
];
