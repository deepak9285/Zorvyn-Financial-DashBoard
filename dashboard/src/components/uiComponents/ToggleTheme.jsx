import React from "react";
import { useTheme } from "../../context/ThemeContext.tsx";
import { Moon, Sun } from "lucide-react";

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-border bg-card hover:bg-secondary transition-colors duration-200"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
      ) : (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
      )}
    </button>
  );
}

export default ToggleTheme;
