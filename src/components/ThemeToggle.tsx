import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-foreground hover:bg-secondary transition-all duration-300 active:scale-95"
      aria-label="تبديل الوضع"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 transition-transform duration-300" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-300" />
      )}
    </button>
  );
}
