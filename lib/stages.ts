import { ActivityType } from './types';

/**
 * Stage descriptions for informational context.
 */
export function getStageDescription(type: ActivityType, stage: number): { active: string; baseline: string | null } {
  const prefix = type === 'proker' ? 'A' : 'B';
  const codes = getActiveParameterCodes(type, stage);
  const max = Array.from(codes).length;
  
  return { 
    active: `${prefix}1–${prefix}${max}`, 
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
 * Returns a set of parameter codes that are active for a given stage.
 * Based on docs/Landasan_Parameter_R100HK_Final.md
 */
export function getActiveParameterCodes(type: ActivityType, stage: number): Set<string> {
  const codes = new Set<string>();
  const prefix = type === 'proker' ? 'A' : 'B';
  
  let activeCount = 0;
  
  if (type === 'proker') {
    switch (stage) {
      case 1: activeCount = 4; break;  // A1-A4
      case 2: activeCount = 6; break;  // A1-A6
      case 3: activeCount = 10; break; // A1-A10
      case 4: activeCount = 12; break; // A1-A12
      case 5: activeCount = 14; break; // A1-A14
      default: activeCount = 4;
    }
  } else {
    switch (stage) {
      case 1: activeCount = 4; break; // B1-B4
      case 2: activeCount = 6; break; // B1-B6
      case 3: activeCount = 9; break; // B1-B9
      default: activeCount = 4;
    }
  }

  for (let i = 1; i <= activeCount; i++) {
    codes.add(`${prefix}${i}`);
  }
  
  return codes;
}
