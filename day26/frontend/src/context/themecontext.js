import React, { createContext, useContext, useState, useEffect } from "react";

// Define theme type for better type safety
const themes = {
  light: {
    colors: {
      primary: "#6f42c1",
      background: "#ffffff",
      text: "#212529",
      secondary: "#6c757d",
      surface: "#f8f9fa",
      border: "#dee2e6",
      hover: "#e9ecef",
    },
  },
  dark: {
    colors: {
      primary: "#f39c12",
      background: "#212529",
      text: "#f8f9fa",
      secondary: "#adb5bd",
      surface: "#343a40",
      border: "#495057",
      hover: "#1a1e21",
    },
  },
};

// Create Context with default values
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  currentTheme: themes.light,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Apply CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme];

    // Apply all color variables
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Update document meta theme-color for mobile devices
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", currentTheme.colors.background);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    currentTheme: themes[theme],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook with error handling
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};