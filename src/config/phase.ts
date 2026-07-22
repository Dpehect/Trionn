export const PHASE_NUMBER = 14;

export const phaseFeatures = {
  foundation: PHASE_NUMBER >= 1,
  productNarrative: PHASE_NUMBER >= 2,
  designSystem: PHASE_NUMBER >= 3,
  gsapCore: PHASE_NUMBER >= 4,
  flipLab: PHASE_NUMBER >= 5,
  scrollStory: PHASE_NUMBER >= 6,
  splitTypography: PHASE_NUMBER >= 7,
  observerTour: PHASE_NUMBER >= 8,
  draggableWorkflow: PHASE_NUMBER >= 9,
  svgMotion: PHASE_NUMBER >= 10,
  conversionSystem: PHASE_NUMBER >= 11,
  socialProof: PHASE_NUMBER >= 12,
  productionHardening: PHASE_NUMBER >= 13,
  finalPolish: PHASE_NUMBER >= 14,
} as const;
