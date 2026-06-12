import { Activity, CalculationResult, ParameterResult, ScoreValue } from './types';
import { PROKER_PARAMETERS, AGENDA_PARAMETERS } from './parameters';
import { getActiveParameterCodes } from './stages';

// ===== Predicate Configuration =====

interface Predicate {
  min: number;
  max: number;
  label: string;
  color: string;         // Tailwind gradient class
  bgColor: string;       // Background class
  textColor: string;     // Text class
  interpretation: string;
}

const PREDICATES: Predicate[] = [
  {
    min: 86, max: 100,
    label: 'Sangat Baik',
    color: 'from-emerald-500 to-emerald-400',
    bgColor: 'bg-emerald-500/20',
    textColor: 'text-emerald-400',
    interpretation: 'Seluruh atau hampir seluruh parameter terpenuhi dengan optimal.',
  },
  {
    min: 71, max: 85,
    label: 'Baik',
    color: 'from-blue-500 to-blue-400',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    interpretation: 'Sebagian besar parameter terpenuhi; terdapat ruang perbaikan minor.',
  },
  {
    min: 56, max: 70,
    label: 'Cukup',
    color: 'from-amber-500 to-amber-400',
    bgColor: 'bg-amber-500/20',
    textColor: 'text-amber-400',
    interpretation: 'Parameter terpenuhi secara moderat; perlu perbaikan pada beberapa aspek.',
  },
  {
    min: 41, max: 55,
    label: 'Kurang',
    color: 'from-orange-500 to-orange-400',
    bgColor: 'bg-orange-500/20',
    textColor: 'text-orange-400',
    interpretation: 'Parameter banyak tidak terpenuhi; perlu perhatian dan tindak lanjut MPM.',
  },
  {
    min: 25, max: 40,
    label: 'Tidak Memenuhi',
    color: 'from-rose-500 to-rose-400',
    bgColor: 'bg-rose-500/20',
    textColor: 'text-rose-400',
    interpretation: 'Parameter tidak terpenuhi; MPM berhak menggunakan hak interpelasi.',
  },
];

/**
 * Get predicate info for a given final score.
 */
export function getPredicate(score: number): Predicate {
  for (const p of PREDICATES) {
    if (score >= p.min && score <= p.max) {
      return p;
    }
  }
  return PREDICATES[PREDICATES.length - 1]; // fallback to lowest
}

/**
 * Calculate the final score and breakdown for an activity.
 *
 * Formula: Nilai Akhir = Σ (Skor_i × Bobot_i) / 100
 * Inactive parameters based on stage contribute 0.
 */
export function calculateScore(activity: Activity): CalculationResult {
  const parameters = activity.type === 'proker' ? PROKER_PARAMETERS : AGENDA_PARAMETERS;
  const activeCodes = getActiveParameterCodes(activity.type, activity.stage);

  // 1. Calculate total weight of active parameters to redistribute
  const activeParameters = parameters.filter(p => activeCodes.has(p.code));
  const totalActiveWeight = activeParameters.reduce((sum, p) => sum + p.weight, 0);

  const parameterResults: ParameterResult[] = parameters.map((param) => {
    const isActive = activeCodes.has(param.code);
    
    // Active parameters default to 50 if no score provided.
    // Inactive parameters have score 0 and won't contribute to normalized final score.
    const score: ScoreValue = isActive 
      ? ((activity.scores[param.code] ?? 50) as ScoreValue) 
      : 0 as unknown as ScoreValue; 
    
    // Normalized contribution: (score * weight / totalActiveWeight)
    const contribution = isActive && totalActiveWeight > 0
      ? (score * param.weight) / totalActiveWeight
      : 0;

    return {
      code: param.code,
      name: param.name,
      weight: param.weight,
      score,
      contribution: Math.round(contribution * 100) / 100, // round to 2 decimals
    };
  });

  // Sum contributions (will be normalized to 100 scale because of totalActiveWeight)
  const finalScore = parameterResults.reduce((sum, r) => sum + r.contribution, 0);
    
  const roundedScore = Math.round(finalScore * 100) / 100;
  const predicate = getPredicate(roundedScore);

  return {
    parameterResults,
    finalScore: roundedScore,
    predicate: predicate.label,
    predicateColor: predicate.color,
    interpretation: predicate.interpretation,
  };
}

/**
 * Get score color class for display.
 */
export function getScoreColor(score: ScoreValue): string {
  switch (score) {
    case 100: return 'text-emerald-400';
    case 75: return 'text-blue-400';
    case 50: return 'text-amber-400';
    case 25: return 'text-rose-400';
  }
}

/**
 * Get score background color class.
 */
export function getScoreBgColor(score: ScoreValue): string {
  switch (score) {
    case 100: return 'bg-emerald-500/20 border-emerald-500/30';
    case 75: return 'bg-blue-500/20 border-blue-500/30';
    case 50: return 'bg-amber-500/20 border-amber-500/30';
    case 25: return 'bg-rose-500/20 border-rose-500/30';
  }
}

export { PREDICATES };
export type { Predicate };
