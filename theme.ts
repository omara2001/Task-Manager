export interface Theme {
  colors: {
    background: string
    surface: string
    primary: string
    primaryDisabled: string
    text: string
    textSecondary: string
    textDisabled: string
    border: string
    success: string
    danger: string
    shadow: string
  }
}

export const lightTheme: Theme = {
  colors: {
    background: "#F9FAFB",
    surface: "#FFFFFF",
    primary: "#3B82F6",
    primaryDisabled: "#E5E7EB",
    text: "#111827",
    textSecondary: "#6B7280",
    textDisabled: "#9CA3AF",
    border: "#E5E7EB",
    success: "#10B981",
    danger: "#EF4444",
    shadow: "#000000",
  },
}

export const darkTheme: Theme = {
  colors: {
    background: "#0F172A",
    surface: "#1E293B",
    primary: "#3B82F6",
    primaryDisabled: "#374151",
    text: "#F8FAFC",
    textSecondary: "#94A3B8",
    textDisabled: "#64748B",
    border: "#334155",
    success: "#10B981",
    danger: "#EF4444",
    shadow: "#000000",
  },
}

export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme
}