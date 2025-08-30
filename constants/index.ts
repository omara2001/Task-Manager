export const APP_CONFIG = {
  MAX_TASK_LENGTH: 200,
  ANIMATION_DURATION: {
    SHORT: 200,
    MEDIUM: 400,
    LONG: 800,
  },
  HAPTIC_PATTERNS: {
    LIGHT: "light",
    MEDIUM: "medium",
    HEAVY: "heavy",
  },
} as const

export const COLORS = {
  PRIMARY: "#3B82F6",
  SUCCESS: "#10B981",
  DANGER: "#EF4444",
  WARNING: "#F59E0B",
} as const

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
} as const

export const FONT_SIZES = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 20,
  XL: 24,
  XXL: 32,
} as const