import { ActivityType } from './types';

/**
 * Stage descriptions for informational context.
 */
export function getStageDescription(type: ActivityType, _stage: number): { active: string; baseline: string | null } {
  const prefix = type === 'proker' ? 'A' : 'B';
  const totalParams = type === 'proker' ? 14 : 9;
  
  // All parameters are always active now
  return { 
    active: `${prefix}1–${prefix}${totalParams} (semua)`, 
    baseline: null 
  };
}

/**
 * Checks if a specific parameter is baseline.
 * Always returns false as baseline system is removed.
 */
export function isBaseline(_type: ActivityType, _stage: number, _paramCode: string): boolean {
  return false;
}

/**
 * Kept for backward compatibility if needed, but returns all codes.
 */
export function getActiveParameterCodes(type: ActivityType, _stage: number): Set<string> {
  const prefix = type === 'proker' ? 'A' : 'B';
  const totalParams = type === 'proker' ? 14 : 9;
  const codes = new Set<string>();
  for (let i = 1; i <= totalParams; i++) {
    codes.add(`${prefix}${i}`);
  }
  return codes;
}
