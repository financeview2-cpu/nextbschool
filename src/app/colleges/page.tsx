"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { COLLEGES_DATA } from "@/data/colleges";
import CollegeCard from "@/components/colleges/CollegeCard";
import CollegeFilters from "@/components/colleges/CollegeFilters";
import { useShortlist } from "@/context/ShortlistContext";
import { GraduationCap, Sparkles, Filter, Bookmark, SlidersHorizontal } from "lucide-react";

function CollegesDirectoryContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialFilter = searchParams.get("filter") || "";

  const { shortlistIds } = useShortlist();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: initialSearch,
    exam: "",
    location: "",
    maxFee: 35,
    ownership: "",
    minCtc: 0,
  });

  const [sortBy, setSortBy] = useState<"nirf" | "ctc" | "fees-low" | "rating">("nirf");
  const [onlyShortlisted, setOnlyShortlisted] = useState(initialFilter === "shortlisted");

  const filteredColleges = useMemo(() => {
    return COLLEGES_DATA.filter((college) => {
      // Shortlist filter
      if (onlyShortlisted && !shortlistIds.includes(college.id)) {
        return false;
      }

      // Search keyword
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matches =
          college.name.toLowerCase().includes(query) ||
          college.shortName.toLowerCase().includes(query) ||
          college.city.toLowerCase().includes(query) ||
          college.state.toLowerCase().includes(query) ||
          college.specializations.some((s) => s.toLowerCase().includes(query));
        if (!matches) return false;
      }

      // Exam filter
      if (filters.exam && !college.cutoffs.some((co) => co.exam.toUpperCase() === filters.exam.toUpperCase())) {
        return false;
      }

      // Location filter
      if (filters.location) {
        const loc = filters.location.toLowerCase();
        const cityLower = college.city.toLowerCase();
        const stateLower = college.state.toLowerCase();
        const matchesLoc =
          cityLower.includes(loc) ||
          stateLower.includes(loc) ||
          (loc === "delhi ncr" && (stateLower.includes("delhi") || cityLower.includes("delhi") || cityLower.includes("gurugram") || cityLower.includes("noida") || cityLower.includes("ghaziabad"))) ||
          (loc === "bangalore" && (cityLower.includes("bengaluru") || cityLower.includes("bangalore"))) ||
          (loc === "ahmedabad" && (cityLower.includes("ahmedabad") || cityLower.includes("ahemdabaad")));
        if (!matchesLoc) return false;
      }

      // Max Fee filter
      if (filters.maxFee < 35 && college.fees.totalCourseFeeLakhs > filters.maxFee) {
        return false;
      }

      // Min CTC filter
      if (filters.minCtc > 0 && college.placements.averageCTC < filters.minCtc) {
        return false;
      }

      // Ownership
      if (filters.ownership && college.ownership.toLowerCase() !== filters.ownership.toLowerCase()) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "nirf") return a.nirfRank2024 - b.nirfRank2024;
      if (sortBy === "ctc") return b.placements.averageCTC - a.placements.averageCTC;
      if (sortBy === "fees-low") return a.fees.totalCourseFeeLakhs - b.fees.totalCourseFeeLakhs;
      if (sortBy === "rating") return b.overallRating - a.overallRating;
      return 0;
    });
  }, [filters, sortBy, onlyShortlisted, shortlistIds]);

  const handleFilterChange = (updated: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      exam: "",
      location: "",
      maxFee: 35,
      ownership: "",
      minCtc: 0,
    });
    setOnlyShortlisted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>India&apos;s MBA Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Top MBA Colleges in India ({filteredColleges.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified stats, cutoff scores for CAT/XAT/SNAP/NMAT, fees, and authentic student reviews.
            </p>
          </div>

          {/* Right Controls: Sort & Shortlist Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Shortlist Toggle */}
            <button
              onClick={() => setOnlyShortlisted(!onlyShortlisted)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                onlyShortlisted
                  ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyShortlisted ? "fill-white" : "text-amber-500"}`} />
              <span>Saved Only ({shortlistIds.length})</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="nirf">NIRF Ranking (Top 1st)</option>
                <option value="ctc">Highest Average CTC</option>
                <option value="fees-low">Lowest Course Fees</option>
                <option value="rating">Highest Student Rating</option>
              </select>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Quick City Hub Pills */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 mr-1 flex-shrink-0">Hubs:</span>
          {["All Hubs", "Delhi NCR", "Mumbai", "Bangalore", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Chandigarh", "Dehradun"].map((cityHub) => {
            const isSelected =
              (filters.location === "" && cityHub === "All Hubs") ||
              filters.location.toLowerCase() === cityHub.toLowerCase();
            return (
              <button
                key={cityHub}
                onClick={() => setFilters((prev) => ({ ...prev, location: cityHub === "All Hubs" ? "" : cityHub }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex-shrink-0 ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cityHub}
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
          
          {/* Left Column: Filter Sidebar */}
          <div className={`lg:block ${mobileFiltersOpen ? "block" : "hidden"} lg:sticky lg:top-24 h-fit`}>
            <CollegeFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleReset}
              totalCount={filteredColleges.length}
            />
          </div>

          {/* Right Column: College Cards Grid */}
          <div className="lg:col-span-3 space-y-6">
            {filteredColleges.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">No Colleges Match Your Filters</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your exam, budget, or location filters to see more institutions.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function CollegesDirectoryPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-xs">Loading Colleges Directory...</div>}>
      <CollegesDirectoryContent />
    </Suspense>
  );
}
