import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useColorScheme } from "react-native"
import { getTheme, type Theme } from "../theme"

interface ThemeContextType {
  theme: Theme
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme()
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark")

  useEffect(() => {
    setIsDarkMode(systemColorScheme === "dark")
  }, [systemColorScheme])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const theme = getTheme(isDarkMode)

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}