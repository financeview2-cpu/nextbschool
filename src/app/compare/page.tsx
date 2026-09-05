"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Scale, 
  Sparkles, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Trophy, 
  Award, 
  TrendingUp, 
  IndianRupee, 
  X,
  ArrowRight
} from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { COLLEGES_DATA } from "@/data/colleges";
import { College } from "@/types";
import { formatCurrencyLakhs } from "@/lib/utils";

export default function ComparePage() {
  const { compareIds, comparedColleges, addToCompare, removeFromCompare, clearCompare } = useCompare();
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<{
    aiVerdict: string;
    winners: { roiWinner: string; placementWinner: string; lowestFeeWinner: string };
    domainBreakdown: { finance: string; consulting: string; marketing: string };
  } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Initialize with at least 2 default colleges if none selected
  useEffect(() => {
    if (comparedColleges.length >= 2) {
      setSelectedColleges(comparedColleges);
    } else if (comparedColleges.length === 1) {
      // Pick FMS Delhi or IIM Ahmedabad as peer
      const peer = COLLEGES_DATA.find((c) => c.id !== comparedColleges[0].id) || COLLEGES_DATA[1];
      setSelectedColleges([comparedColleges[0], peer]);
    } else {
      // Default comparison: IIM Ahmedabad vs FMS Delhi vs XLRI Jamshedpur
      const defaults = [COLLEGES_DATA[0], COLLEGES_DATA[1], COLLEGES_DATA[3]];
      setSelectedColleges(defaults);
    }
  }, [comparedColleges]);

  // Fetch AI comparison verdict whenever selectedColleges change
  useEffect(() => {
    if (selectedColleges.length >= 2) {
      setLoadingAi(true);
      fetch("/api/ai/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeIds: selectedColleges.map((c) => c.id) }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAiAnalysis(data);
        })
        .catch((err) => console.error("AI Compare fetch error:", err))
        .finally(() => setLoadingAi(false));
    }
  }, [selectedColleges]);

  const handleCollegeChange = (index: number, newId: string) => {
    const found = COLLEGES_DATA.find((c) => c.id === newId);
    if (!found) return;
    const updated = [...selectedColleges];
    updated[index] = found;
    setSelectedColleges(updated);
  };

  const handleAddThirdSlot = () => {
    if (selectedColleges.length >= 3) return;
    const remaining = COLLEGES_DATA.find((c) => !selectedColleges.some((sc) => sc.id === c.id));
    if (remaining) {
      setSelectedColleges([...selectedColleges, remaining]);
    }
  };

  const handleRemoveSlot = (index: number) => {
    if (selectedColleges.length <= 2) {
      alert("At least 2 colleges are required for comparison.");
      return;
    }
    const updated = selectedColleges.filter((_, idx) => idx !== index);
    setSelectedColleges(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Side-by-Side Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              3-Way B-School Comparison
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Compare actual fees, placements, NIRF ranks, cutoffs, and AI domain winners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedColleges.length < 3 && (
              <button
                onClick={handleAddThirdSlot}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add 3rd College</span>
              </button>
            )}

            <button
              onClick={clearCompare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-red-600 text-xs font-bold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* AI Head-to-Head Verdict Box */}
        {aiAnalysis && (
          <div className="mb-8 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>NextBschool AI Head-to-Head Comparative Verdict</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-medium">
              {aiAnalysis.aiVerdict}
            </p>

            {/* Winner Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10 text-xs">
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-3">
                <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">ROI Champion</span>
                  <span className="font-extrabold text-white text-sm">{aiAnalysis.winners.roiWinner}</span>
                </div>
              </div>

              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Highest Earning Velocity</span>
                  <span className="font-extrabold text-white text-sm">{aiAnalysis.winners.placementWinner}</span>
                </div>
              </div>

              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-3">
                <IndianRupee className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Lowest Total Fee</span>
                  <span className="font-extrabold text-white text-sm">{aiAnalysis.winners.lowestFeeWinner}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Matrix Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              {/* Header: College Selector Dropdowns */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 w-1/4 font-bold text-slate-500 uppercase tracking-wider">
                    Parameters
                  </th>
                  {selectedColleges.map((college, idx) => (
                    <th key={college.id + idx} className="p-4 w-1/4 border-l border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          College #{idx + 1}
                        </span>
                        {selectedColleges.length > 2 && (
                          <button
                            onClick={() => handleRemoveSlot(idx)}
                            className="p-1 text-slate-400 hover:text-red-500"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <select
                        value={college.id}
                        onChange={(e) => handleCollegeChange(idx, e.target.value)}
                        className="w-full p-2 text-xs font-bold text-slate-900 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 bg-white"
                      >
                        {COLLEGES_DATA.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.shortName} ({c.city})
                          </option>
                        ))}
                      </select>
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline mt-2"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-slate-100 font-medium">
                {/* NIRF Rank */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">NIRF Rank 2024</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 font-extrabold text-slate-900">
                      #{c.nirfRank2024} (Management)
                    </td>
                  ))}
                </tr>

                {/* Average CTC */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Average CTC</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 font-black text-emerald-600 text-sm">
                      {formatCurrencyLakhs(c.placements.averageCTC)}
                    </td>
                  ))}
                </tr>

                {/* Median CTC */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Median CTC</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 font-bold text-slate-800">
                      {formatCurrencyLakhs(c.placements.medianCTC)}
                    </td>
                  ))}
                </tr>

                {/* Highest CTC */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Highest Domestic CTC</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 font-bold text-slate-800">
                      {formatCurrencyLakhs(c.placements.highestDomesticCTC)}
                    </td>
                  ))}
                </tr>

                {/* Total Course Fees */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Total 2-Year Course Fee</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 font-black text-blue-700 text-sm">
                      {formatCurrencyLakhs(c.fees.totalCourseFeeLakhs)}
                    </td>
                  ))}
                </tr>

                {/* Primary Cutoff */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Exam & Cutoff</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100">
                      {c.cutoffs.map((co) => (
                        <div key={co.exam} className="font-bold text-slate-900">
                          {co.exam}: {co.general}{co.exam === "NMAT" ? " Score" : "%ile"}
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Batch Size */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Batch Size</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 font-semibold text-slate-800">
                      {c.placements.batchSize} Students
                    </td>
                  ))}
                </tr>

                {/* Ownership */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Ownership & Type</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 font-semibold text-slate-800">
                      {c.ownership}
                    </td>
                  ))}
                </tr>

                {/* Location */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Campus Location</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 text-slate-700">
                      {c.city}, {c.state} ({c.campusAreaAcres} Acres)
                    </td>
                  ))}
                </tr>

                {/* Accreditations */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Accreditations</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 text-slate-800 font-medium">
                      {c.accreditations.join(", ")}
                    </td>
                  ))}
                </tr>

                {/* Top Recruiters */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Top Recruiters</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 text-slate-700 leading-relaxed">
                      {c.placements.topRecruiters.slice(0, 5).join(", ")}
                    </td>
                  ))}
                </tr>

                {/* Student Rating */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Student Review Rating</td>
                  {selectedColleges.map((c, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 font-bold text-amber-600">
                      ★ {c.overallRating} / 5.0 ({c.reviewsCount} reviews)
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
