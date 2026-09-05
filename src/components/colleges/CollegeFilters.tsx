"use client";

import React from "react";
import { Filter, RotateCcw, Search, IndianRupee, GraduationCap, MapPin, Award } from "lucide-react";

interface FilterState {
  search: string;
  exam: string;
  location: string;
  maxFee: number;
  ownership: string;
  minCtc: number;
}

interface CollegeFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalCount: number;
}

const EXAMS = ["All", "CAT", "XAT", "SNAP", "NMAT", "CMAT", "MAH-CET"];
const LOCATIONS = [
  "All",
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Dehradun"
];
const OWNERSHIPS = ["All", "Government", "Private"];

export default function CollegeFilters({
  filters,
  onChange,
  onReset,
  totalCount,
}: CollegeFiltersProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filter B-Schools</span>
          <span className="text-xs font-normal text-slate-500">({totalCount} found)</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Search Name or Keyword
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="e.g. IIM, FMS, Consulting..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
          />
        </div>
      </div>

      {/* Exam Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Entrance Exam
        </label>
        <div className="flex flex-wrap gap-1.5">
          {EXAMS.map((exam) => {
            const isSelected = (filters.exam === "" && exam === "All") || filters.exam === exam;
            return (
              <button
                key={exam}
                onClick={() => onChange({ exam: exam === "All" ? "" : exam })}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {exam}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Course Fee Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <label className="font-semibold text-slate-700 flex items-center gap-1">
            <IndianRupee className="w-3 h-3 text-blue-600" />
            Max Total Fee
          </label>
          <span className="font-bold text-blue-600">
            {filters.maxFee >= 35 ? "Any (₹35L+)" : `₹${filters.maxFee} Lakhs`}
          </span>
        </div>
        <input
          type="range"
          min="2.5"
          max="35"
          step="2.5"
          value={filters.maxFee}
          onChange={(e) => onChange({ maxFee: parseFloat(e.target.value) })}
          className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹2.5L (FMS)</span>
          <span>₹15L</span>
          <span>₹35L+</span>
        </div>
      </div>

      {/* Min Average CTC Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <label className="font-semibold text-slate-700">
            Min Average CTC
          </label>
          <span className="font-bold text-emerald-600">
            {filters.minCtc === 0 ? "Any" : `₹${filters.minCtc} LPA`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="35"
          step="5"
          value={filters.minCtc}
          onChange={(e) => onChange({ minCtc: parseFloat(e.target.value) })}
          className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Any</span>
          <span>₹15L</span>
          <span>₹35L</span>
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-blue-600" />
          Location / State
        </label>
        <select
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value === "All" ? "" : e.target.value })}
          className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 bg-white"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc === "All" ? "" : loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Ownership */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          College Ownership
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {OWNERSHIPS.map((own) => {
            const isSelected =
              (filters.ownership === "" && own === "All") || filters.ownership === own;
            return (
              <button
                key={own}
                onClick={() => onChange({ ownership: own === "All" ? "" : own })}
                className={`px-2 py-1.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {own}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
