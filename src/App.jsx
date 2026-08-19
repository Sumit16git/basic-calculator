import React from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import Navbar from "./components/Navbar";
import Totalizer from "./components/Calculator";

function App() {
  const scrollToCalculator = () => {
    const calcSection = document.getElementById("Totalizer-section");
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Landing Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-125 h-75 sm:h-125 bg-teal-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6 z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-cyan-500/10 border border-teal-200/50 dark:border-cyan-500/20 text-teal-600 dark:text-cyan-400 text-xs sm:text-sm font-medium">
            <Sparkles size={15} />
            <span>Smart & Free Online Calculator</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            The Ultimate Free <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-600 dark:from-cyan-400 dark:to-teal-400">
              Daily Calculator
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-normal">
            A lightning-fast, beautifully designed calculation tool built for
            your everyday math needs. Clean interface, responsive layout, and
            zero clutter.
          </p>

          <div className="pt-4">
            <button
              onClick={scrollToCalculator}
              className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white font-semibold shadow-lg shadow-teal-600/25 dark:shadow-cyan-500/25 transition-all duration-300 cursor-pointer active:scale-95 group"
            >
              <span>Launch Calculator</span>
              <ArrowDown
                size={18}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Totalizer Calculator Section */}
      <Totalizer />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
