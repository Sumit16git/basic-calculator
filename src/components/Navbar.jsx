import React, { useState, useEffect } from "react";
import { Sun, Moon, Calculator as CalcIcon } from "lucide-react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? savedTheme === "dark" : false;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left Side: Icon + Logo */}
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-cyan-500/10 text-teal-600 dark:text-cyan-400">
              <CalcIcon size={24} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white select-none">
              Calculator
            </h1>
          </div>

          {/* Right Side: Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer active:scale-95 shadow-sm"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun
                size={20}
                className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
              />
            ) : (
              <Moon size={20} className="text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
