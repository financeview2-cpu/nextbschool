"use client";

import React from "react";
import Link from "next/link";
import { X, Scale, ArrowRight, Trash2 } from "lucide-react";
import { useCompare } from "@/context/CompareContext";

export default function CompareDrawer() {
  const { comparedColleges, removeFromCompare, clearCompare, isDrawerOpen, setIsDrawerOpen } = useCompare();

  if (!isDrawerOpen || comparedColleges.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mr-2 flex-shrink-0">
          <Scale className="w-4 h-4" />
          <span>Compare ({comparedColleges.length}/3):</span>
        </div>

        {comparedColleges.map((college) => (
          <div
            key={college.id}
            className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs flex-shrink-0"
          >
            <span className="font-medium text-slate-200 truncate max-w-[120px]">
              {college.shortName}
            </span>
            <button
              onClick={() => removeFromCompare(college.id)}
              className="text-slate-400 hover:text-red-400 transition-colors"
              title="Remove"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {Array.from({ length: 3 - comparedColleges.length }).map((_, idx) => (
          <div
            key={idx}
            className="hidden md:flex items-center justify-center border border-dashed border-slate-700 rounded-lg px-3 py-1 text-[11px] text-slate-500"
          >
            + Add College
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={clearCompare}
          className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors rounded-lg text-xs"
          title="Clear all"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsDrawerOpen(false)}
          className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors rounded-lg text-xs"
          title="Minimize dock"
        >
          <X className="w-4 h-4" />
        </button>

        <Link
          href="/compare"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md hover:shadow-blue-500/25 flex-shrink-0"
        >
          <span>Compare Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
