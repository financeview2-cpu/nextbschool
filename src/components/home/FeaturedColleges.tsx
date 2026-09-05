"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, DollarSign, Award, Target } from "lucide-react";
import { COLLEGES_DATA } from "@/data/colleges";
import CollegeCard from "@/components/colleges/CollegeCard";

export default function FeaturedColleges() {
  const [activeTab, setActiveTab] = useState<"all" | "roi" | "marketing" | "finance" | "consulting">("all");

  let displayedColleges = COLLEGES_DATA;

  if (activeTab === "roi") {
    // Colleges with fees < 18L or highest ROI ratio
    displayedColleges = COLLEGES_DATA.filter((c) =>
      ["fms-delhi", "jbims-mumbai", "iit-bombay-sjmsom", "iim-ahmedabad", "iim-calcutta"].includes(c.id)
    );
  } else if (activeTab === "marketing") {
    displayedColleges = COLLEGES_DATA.filter((c) =>
      ["fms-delhi", "spjimr-mumbai", "sibm-pune", "imt-ghaziabad", "iim-lucknow"].includes(c.id)
    );
  } else if (activeTab === "finance") {
    displayedColleges = COLLEGES_DATA.filter((c) =>
      ["iim-calcutta", "iim-ahmedabad", "jbims-mumbai", "nmims-mumbai", "tapmi-manipal"].includes(c.id)
    );
  } else if (activeTab === "consulting") {
    displayedColleges = COLLEGES_DATA.filter((c) =>
      ["iim-ahmedabad", "iim-bangalore", "iim-calcutta", "iim-lucknow", "iim-kozhikode", "xlri-jamshedpur"].includes(c.id)
    );
  } else {
    // All featured
    displayedColleges = COLLEGES_DATA.slice(0, 6);
  }

  const tabs = [
    { id: "all", label: "All Top Rated", icon: Award },
    { id: "roi", label: "High ROI Powerhouses", icon: TrendingUp },
    { id: "consulting", label: "Consulting Giants", icon: Target },
    { id: "marketing", label: "Marketing Mecca", icon: Sparkles },
    { id: "finance", label: "Finance & IB", icon: DollarSign },
  ] as const;

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Verified Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Top MBA Colleges in India
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Compare actual placements, fees, real student reviews, and NIRF rankings.
            </p>
          </div>

          <Link
            href="/colleges"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>Explore All 25+ Colleges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-200"
          >
            <span>View Full Directory with Advanced Filters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
