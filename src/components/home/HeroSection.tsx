"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Scale, 
  IndianRupee 
} from "lucide-react";
import { COLLEGES_DATA } from "@/data/colleges";

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/colleges");
    }
  };

  const quickSearches = [
    { label: "IIM Ahmedabad", query: "IIM Ahmedabad" },
    { label: "FMS Delhi (Highest ROI)", query: "FMS Delhi" },
    { label: "XLRI Jamshedpur", query: "XLRI" },
    { label: "SPJIMR (Profile Call)", query: "SPJIMR" },
    { label: "SJMSOM IIT Bombay", query: "IIT Bombay" },
    { label: "SIBM Pune", query: "SIBM" },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-400/20 via-sky-300/20 to-purple-300/10 blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Top Pill: Competitor Contrast */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span>AI-Powered MBA Intelligence • Zero Spam Popups</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Find Your Dream <span className="gradient-text-blue">B-School in India</span> With Real AI Precision
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stop wading through cluttered, ad-heavy portals. Get verified student reviews, exact CAT/XAT cutoffs, genuine placement realities, and AI predictions tailored to your academic profile.
          </p>

          {/* Hero Search Bar */}
          <div className="max-w-2xl mx-auto mt-6">
            <form
              onSubmit={handleSearchSubmit}
              className="p-2 bg-white rounded-2xl shadow-xl border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all"
            >
              <div className="flex items-center gap-3 px-3 w-full sm:w-auto flex-1">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearchEvent(e.target.value)}
                  placeholder="Search college, exam, city, or specialization (e.g. FMS, CAT, Marketing)..."
                  className="w-full text-sm text-slate-800 placeholder:text-slate-400 bg-transparent border-0 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-blue-500/30 transition-all flex-shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Trending:</span>
              {quickSearches.map((item) => (
                <Link
                  key={item.label}
                  href={`/colleges?search=${encodeURIComponent(item.query)}`}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-colors shadow-2xs font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/predictor"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-sm shadow-xl hover:shadow-blue-500/25 transition-all group"
            >
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Predict Colleges from Your CAT Score</span>
            </Link>

            <Link
              href="/compare"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-300 shadow-sm hover:border-slate-400 transition-all"
            >
              <Scale className="w-4 h-4 text-slate-500" />
              <span>Side-by-Side 3-Way Compare</span>
            </Link>
          </div>

          {/* Live Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-200/80 mt-10">
            <div className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/60 shadow-2xs">
              <p className="text-2xl font-black text-blue-600">25+ Top</p>
              <p className="text-xs text-slate-500 font-medium">IIMs & Premier B-Schools</p>
            </div>

            <div className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/60 shadow-2xs">
              <p className="text-2xl font-black text-slate-900">₹34.1 LPA</p>
              <p className="text-xs text-slate-500 font-medium">Avg CTC (Top 10 Colleges)</p>
            </div>

            <div className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/60 shadow-2xs">
              <p className="text-2xl font-black text-emerald-600">100%</p>
              <p className="text-xs text-slate-500 font-medium">Verified Student Reviews</p>
            </div>

            <div className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/60 shadow-2xs">
              <p className="text-2xl font-black text-amber-600">0 Spam</p>
              <p className="text-xs text-slate-500 font-medium">Zero Telemarketing Calls</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  function setSearchEvent(val: string) {
    setSearch(val);
  }
}
