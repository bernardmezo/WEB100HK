import { ActivityType } from './types';

// ===== Stage-to-Active-Parameter Mappings =====

// For Program Kerja (Proker): 5 stages
// Each stage defines the LAST active parameter code number.
// e.g., stage 1 → A1–A4 active, A5–A14 baseline
const PROKER_ACTIVE_THROUGH: Record<number, number> = {
  1: 4,   // A1–A4 active
  2: 6,   // A1–A6 active
  3: 10,  // A1–A10 active
  4: 12,  // A1–A12 active
  5: 14,  // A1–A14 all active
};

// For Agenda: 3 stages
const AGENDA_ACTIVE_THROUGH: Record<number, number> = {
  1: 4,  // B1–B4 active
  2: 6,  // B1–B6 active
  3: 9,  // B1–B9 all active
};

/**
 * Returns the set of active parameter codes for a given activity type and stage.
 */
export function getActiveParameterCodes(type: ActivityType, stage: number): Set<string> {
  const prefix = type === 'proker' ? 'A' : 'B';
  const mapping = type === 'proker' ? PROKER_ACTIVE_THROUGH : AGENDA_ACTIVE_THROUGH;
  const activeThrough = mapping[stage];

  if (activeThrough === undefined) {
    return new Set();
  }

  const codes = new Set<string>();
  for (let i = 1; i <= activeThrough; i++) {
    codes.add(`${prefix}${i}`);
  }
  return codes;
}

/**
 * Checks if a specific parameter is baseline (auto score 50) for the given type and stage.
 */
export function isBaseline(type: ActivityType, stage: number, paramCode: string): boolean {
  const activeCodes = getActiveParameterCodes(type, stage);
  return !activeCodes.has(paramCode);
}

/**
 * Returns human-readable description of what's active vs baseline for a given stage.
 */
export function getStageDescription(type: ActivityType, stage: number): { active: string; baseline: string | null } {
  const prefix = type === 'proker' ? 'A' : 'B';
  const mapping = type === 'proker' ? PROKER_ACTIVE_THROUGH : AGENDA_ACTIVE_THROUGH;
  const totalParams = type === 'proker' ? 14 : 9;
  const activeThrough = mapping[stage];

  if (activeThrough === undefined) {
    return { active: 'Tidak ada', baseline: `${prefix}1–${prefix}${totalParams}` };
  }

  const active = `${prefix}1–${prefix}${activeThrough}`;

  if (activeThrough >= totalParams) {
    return { active: `${prefix}1–${prefix}${totalParams} (semua)`, baseline: null };
  }

  const baseline = `${prefix}${activeThrough + 1}–${prefix}${totalParams}`;
  return { active, baseline };
}
