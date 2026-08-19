import React, { useState, useEffect } from "react";
import { Calculator as CalcIcon, History, Trash2, Delete } from "lucide-react";

function Totalizer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");
  const [isCalculated, setIsCalculated] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleClick = (value) => {
    setAnimateResult(false);
    const isOperator = ["+", "-", "*", "/", "%"].includes(value);

    if (isCalculated) {
      if (isOperator) {
        setInput(result + value);
      } else {
        setInput(value);
      }
      setIsCalculated(false);
    } else {
      if (value === ".") {
        const parts = input.split(/[\+\-\*\/\%]/);
        const currentNumber = parts[parts.length - 1];
        if (currentNumber.includes(".")) return;
      }

      if (isOperator) {
        const lastChar = input.slice(-1);
        if (["+", "-", "*", "/", "%"].includes(lastChar)) {
          setInput((prev) => prev.slice(0, -1) + value);
          return;
        }
      }
      setInput((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("0");
    setIsCalculated(false);
    setAnimateResult(false);
  };

  const handleDelete = () => {
    if (isCalculated) return;
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      if (!input || input.trim() === "") return;

      let sanitizedInput = input
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100");

      // Basic safety check to allow only valid math characters
      if (/[^0-9+\-*/().\s]/g.test(sanitizedInput)) {
        throw new Error("Invalid Characters");
      }

      const evaluated = Function(`'use strict'; return (${sanitizedInput})`)();

      if (!isFinite(evaluated)) {
        throw new Error("Math Error");
      }

      const finalResult = Number(evaluated.toFixed(8)).toString();

      const historyItem = {
        expression: input,
        result: finalResult,
        id: Date.now(),
      };

      setHistory((prev) => [historyItem, ...prev.slice(0, 19)]);
      setResult(finalResult);
      setIsCalculated(true);
      setAnimateResult(true);
    } catch (error) {
      setResult("Error");
      setIsCalculated(true);
    }
  };

  const loadHistoryItem = (item) => {
    setInput(item.expression);
    setResult(item.result);
    setIsCalculated(true);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (
        (key >= "0" && key <= "9") ||
        key === "." ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
      ) {
        e.preventDefault();
        handleClick(key);
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        handleCalculate();
      } else if (key === "Backspace") {
        e.preventDefault();
        handleDelete();
      } else if (key === "Escape") {
        e.preventDefault();
        handleClear();
      } else if (key === "%") {
        e.preventDefault();
        handleClick("%");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, isCalculated, result]);

  return (
    <section
      id="Totalizer-section"
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-950"
    >
      <div className="w-full max-w-sm sm:max-w-xl lg:max-w-4xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 transition-colors duration-300">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <CalcIcon className="text-teal-600 dark:text-cyan-400" size={22} />
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-800 dark:text-white">
              Calculator
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              <History size={14} />
              <span>History ({history.length})</span>
            </button>
            <span className="text-xs text-teal-600 dark:text-cyan-400 font-semibold px-2.5 py-1 rounded-md bg-teal-50 dark:bg-cyan-500/10">
              Pro
            </span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div
          className={`grid grid-cols-1 ${showHistory ? "lg:grid-cols-3" : "lg:grid-cols-1"} gap-6 transition-all duration-300`}
        >
          {/* Calculator Section */}
          <div
            className={`${showHistory ? "lg:col-span-2" : "col-span-1"} transition-all`}
          >
            {/* Screen Display */}
            <div className="mb-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 text-right overflow-x-auto shadow-inner">
              <div className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 min-h-5 tracking-wide font-mono truncate">
                {input || "0"}
              </div>
              <div
                className={`text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight truncate font-mono transition-all duration-300 transform ${
                  animateResult
                    ? "scale-102 opacity-100 text-teal-600 dark:text-cyan-400"
                    : "scale-100 opacity-90"
                }`}
              >
                {result}
              </div>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              <button
                onClick={handleClear}
                className="py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-all cursor-pointer active:scale-95"
              >
                Clear
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95"
              >
                <Delete size={20} />
              </button>
              <button
                onClick={() => handleClick("%")}
                className="py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95"
              >
                %
              </button>
              <button
                onClick={() => handleClick("/")}
                className="py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg bg-teal-50 hover:bg-teal-100 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-teal-600 dark:text-cyan-400 transition-all cursor-pointer active:scale-95"
              >
                ÷
              </button>

              <button
                onClick={() => handleClick("7")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                7
              </button>
              <button
                onClick={() => handleClick("8")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                8
              </button>
              <button
                onClick={() => handleClick("9")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                9
              </button>
              <button
                onClick={() => handleClick("*")}
                className="py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg bg-teal-50 hover:bg-teal-100 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-teal-600 dark:text-cyan-400 transition-all cursor-pointer active:scale-95"
              >
                ×
              </button>

              <button
                onClick={() => handleClick("4")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                4
              </button>
              <button
                onClick={() => handleClick("5")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                5
              </button>
              <button
                onClick={() => handleClick("6")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                6
              </button>
              <button
                onClick={() => handleClick("-")}
                className="py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg bg-teal-50 hover:bg-teal-100 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-teal-600 dark:text-cyan-400 transition-all cursor-pointer active:scale-95"
              >
                -
              </button>

              <button
                onClick={() => handleClick("1")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                1
              </button>
              <button
                onClick={() => handleClick("2")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                2
              </button>
              <button
                onClick={() => handleClick("3")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                3
              </button>
              <button
                onClick={() => handleClick("+")}
                className="py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg bg-teal-50 hover:bg-teal-100 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-teal-600 dark:text-cyan-400 transition-all cursor-pointer active:scale-95"
              >
                +
              </button>

              <button
                onClick={() => handleClick("0")}
                className="py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95 col-span-2"
              >
                0
              </button>
              <button
                onClick={() => handleClick(".")}
                className="py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-all cursor-pointer active:scale-95"
              >
                .
              </button>
              <button
                onClick={handleCalculate}
                className="py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg bg-teal-600 hover:bg-teal-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white transition-all cursor-pointer active:scale-95 shadow-md shadow-teal-600/25 dark:shadow-cyan-500/25"
              >
                =
              </button>
            </div>
          </div>

          {/* History Sidebar Panel */}
          {showHistory && (
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col h-95 sm:h-105 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recent Calculations
                </span>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-rose-500 hover:text-rose-600 text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Clear</span>
                  </button>
                )}
              </div>
              <div className="overflow-y-auto flex-1 space-y-2 pr-1 scrollbar-none">
                {history.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400 text-center">
                    No history yet.
                    <br />
                    Perform a calculation to see it here.
                  </div>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => loadHistoryItem(item)}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-teal-500 dark:hover:border-cyan-500 transition cursor-pointer text-right group"
                    >
                      <div className="text-xs text-slate-400 font-mono">
                        {item.expression}
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-white font-mono group-hover:text-teal-600 dark:group-hover:text-cyan-400">
                        = {item.result}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Totalizer;
