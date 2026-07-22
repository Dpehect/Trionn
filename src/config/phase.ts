export const PHASE_NUMBER = 14;

export const features = {
  shell: PHASE_NUMBER >= 2,
  mosaic: PHASE_NUMBER >= 3,
  coordinateEngine: PHASE_NUMBER >= 4,
  hover: PHASE_NUMBER >= 5,
  flipMotion: PHASE_NUMBER >= 6,
  focusMode: PHASE_NUMBER >= 6,
  projectCompositions: PHASE_NUMBER >= 7,
  splitTypography: PHASE_NUMBER >= 8,
  customCursor: PHASE_NUMBER >= 9,
  projectDetails: PHASE_NUMBER >= 10,
  secondaryPages: PHASE_NUMBER >= 11,
  responsive: PHASE_NUMBER >= 12,
  performance: PHASE_NUMBER >= 13,
  finalPolish: PHASE_NUMBER >= 14,
} as const;
