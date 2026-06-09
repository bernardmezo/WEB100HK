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
    min: 91, max: 100,
    label: 'Sangat Baik',
    color: 'from-emerald-500 to-emerald-400',
    bgColor: 'bg-emerald-500/20',
    textColor: 'text-emerald-400',
    interpretation: 'Seluruh atau hampir seluruh parameter terpenuhi dengan optimal.',
  },
  {
    min: 76, max: 90,
    label: 'Baik',
    color: 'from-blue-500 to-blue-400',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    interpretation: 'Sebagian besar parameter terpenuhi; terdapat ruang perbaikan minor.',
  },
  {
    min: 61, max: 75,
    label: 'Cukup',
    color: 'from-amber-500 to-amber-400',
    bgColor: 'bg-amber-500/20',
    textColor: 'text-amber-400',
    interpretation: 'Parameter terpenuhi secara moderat; perlu perbaikan pada beberapa aspek.',
  },
  {
    min: 46, max: 60,
    label: 'Kurang',
    color: 'from-orange-500 to-orange-400',
    bgColor: 'bg-orange-500/20',
    textColor: 'text-orange-400',
    interpretation: 'Parameter banyak tidak terpenuhi; perlu perhatian dan tindak lanjut MPM.',
  },
  {
    min: 25, max: 45,
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
 * Formula: Nilai Akhir = Σ (Skor_i × Bobot_i) / Σ Bobot_aktif
 * This ensures proportional redistribution of weights as per documentation.
 */
export function calculateScore(activity: Activity): CalculationResult {
  const parameters = activity.type === 'proker' ? PROKER_PARAMETERS : AGENDA_PARAMETERS;
  const activeCodes = getActiveParameterCodes(activity.type, activity.stage);
  
  // Calculate total weight of active parameters for redistribution
  const totalActiveWeight = parameters
    .filter(p => activeCodes.has(p.code))
    .reduce((sum, p) => sum + p.weight, 0);

  const parameterResults: ParameterResult[] = parameters.map((param) => {
    // Default to 50 if no score provided
    const score: ScoreValue = (activity.scores[param.code] ?? 50) as ScoreValue;
    
    // Contribution is calculated normally for each parameter
    const contribution = (score * param.weight) / 100;

    return {
      code: param.code,
      name: param.name,
      weight: param.weight,
      score,
      contribution: Math.round(contribution * 100) / 100, // round to 2 decimals
    };
  });

  // Sum contributions of ONLY active parameters
  const activeContributionSum = parameterResults
    .filter(r => activeCodes.has(r.code))
    .reduce((sum, r) => sum + r.contribution, 0);

  // Redistribute: (Sum of Active Contributions / Sum of Active Weights) * 100
  const finalScore = totalActiveWeight > 0 
    ? (activeContributionSum * 100) / totalActiveWeight 
    : 0;
    
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
