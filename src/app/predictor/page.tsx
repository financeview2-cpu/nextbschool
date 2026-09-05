"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Send, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  BookOpen,
  Scale,
  RotateCcw
} from "lucide-react";
import { CandidateProfile, PredictionResult } from "@/types";
import CollegeCard from "@/components/colleges/CollegeCard";

export default function PredictorPage() {
  const [profile, setProfile] = useState<CandidateProfile>({
    targetYear: 2025,
    category: "General",
    gender: "Male",
    academicStream: "Engineering",
    score10th: 88,
    score12th: 86,
    scoreGrad: 78,
    workExperienceMonths: 24,
    budgetMaxLakhs: 30,
    preferredSpecialization: "Any",
    examScores: {
      cat: 97.5,
      xat: 94.0,
      snap: 95.0,
      nmat: 235,
    },
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/ai/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Prediction failed");
      const data: PredictionResult = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Failed to compute predictions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Proprietary IIM-Style Composite Algorithm</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            AI MBA College Predictor & Matcher
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Enter your academic scores, category, work-ex, and entrance exam percentiles. Our AI calculates your composite score and segregates colleges into <strong>Dream, Target, and Safe</strong> tiers.
          </p>
        </div>

        {/* Predictor Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8"
        >
          {/* Section 1: Academic & Diversity Background */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              1. Candidate Profile & Diversity Factors
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {/* Category */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Reservation Category</label>
                <select
                  value={profile.category}
                  onChange={(e: any) => setProfile({ ...profile, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="General">General / Unreserved (UR)</option>
                  <option value="NC-OBC">OBC-Non Creamy Layer</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e: any) => setProfile({ ...profile, gender: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="Male">Male (GEM / Non-GEM)</option>
                  <option value="Female">Female (Diversity Bonus Eligible)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Academic Stream */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Undergrad Discipline</label>
                <select
                  value={profile.academicStream}
                  onChange={(e: any) => setProfile({ ...profile, academicStream: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="Engineering">Engineering (B.Tech / B.E.)</option>
                  <option value="Commerce">Commerce (B.Com / CA / CFA)</option>
                  <option value="Management/BBA">Management (BBA / BMS)</option>
                  <option value="Arts/Humanities">Arts / Humanities / Law</option>
                  <option value="Science">Pure Science / Medicine</option>
                </select>
              </div>

              {/* Work Experience */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">Work Ex (Months)</label>
                  <span className="font-bold text-blue-600">{profile.workExperienceMonths}m</span>
                </div>
                <input
                  type="number"
                  min="0"
                  max="80"
                  value={profile.workExperienceMonths}
                  onChange={(e) =>
                    setProfile({ ...profile, workExperienceMonths: parseInt(e.target.value) || 0 })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-[10px] text-slate-400">Sweet spot: 24-36 months</span>
              </div>
            </div>

            {/* Academic Marks (10th / 12th / Grad) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mt-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Class 10th Marks (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={profile.score10th}
                  onChange={(e) => setProfile({ ...profile, score10th: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Class 12th Marks (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={profile.score12th}
                  onChange={(e) => setProfile({ ...profile, score12th: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Graduation Marks (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={profile.scoreGrad}
                  onChange={(e) => setProfile({ ...profile, scoreGrad: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Entrance Exam Scores */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              2. Entrance Exam Percentiles / Scores
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">CAT Percentile</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={profile.examScores.cat || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      examScores: { ...profile.examScores, cat: parseFloat(e.target.value) || 0 },
                    })
                  }
                  placeholder="e.g. 98.5"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-blue-700 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">XAT Percentile</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={profile.examScores.xat || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      examScores: { ...profile.examScores, xat: parseFloat(e.target.value) || 0 },
                    })
                  }
                  placeholder="e.g. 95.0"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-blue-700 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">SNAP Percentile</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={profile.examScores.snap || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      examScores: { ...profile.examScores, snap: parseFloat(e.target.value) || 0 },
                    })
                  }
                  placeholder="e.g. 98.2"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-blue-700 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">NMAT Scaled Score</label>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={profile.examScores.nmat || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      examScores: { ...profile.examScores, nmat: parseFloat(e.target.value) || 0 },
                    })
                  }
                  placeholder="e.g. 235"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-blue-700 focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Preferences */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold text-slate-700 block mb-1">Max Course Budget</label>
              <select
                value={profile.budgetMaxLakhs}
                onChange={(e) => setProfile({ ...profile, budgetMaxLakhs: parseFloat(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value={10}>Under ₹10 Lakhs (FMS, JBIMS)</option>
                <option value={20}>Under ₹20 Lakhs (SJMSOM, IITs)</option>
                <option value={30}>Under ₹30 Lakhs (Most IIMs, MDI, SPJIMR)</option>
                <option value={40}>No Budget Constraints (Any Fee)</option>
              </select>
            </div>

            <div className="w-full sm:w-auto self-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-600 hover:to-indigo-600 text-white font-extrabold text-sm shadow-xl hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>{loading ? "Evaluating 25+ Colleges..." : "Generate AI Predictions"}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Prediction Results Display */}
        {results && (
          <div className="mt-12 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-300">
            
            {/* Profile Intelligence Summary Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>AI Profile Composite Diagnostic</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Profile Composite Score: {results.profileAnalysis.compositeScore} / 45
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <span className="font-bold text-white block">Diversity Advantage:</span>
                  <p>{results.profileAnalysis.diversityAdvantage}</p>
                </div>
                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <span className="font-bold text-white block">Work-Ex Weightage:</span>
                  <p>{results.profileAnalysis.workExWeightageRemarks}</p>
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs">
                <span className="font-bold text-amber-400 block mb-2">AI Strategic Recommendations:</span>
                <ul className="space-y-1.5 text-slate-300">
                  {results.profileAnalysis.suggestedFocusAreas.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 1. DREAM COLLEGES */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-purple-500 animate-ping"></span>
                <h3 className="text-xl font-bold text-slate-900">
                  Dream Colleges ({results.dreamColleges.length})
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200">
                  Aspirational (25-45% Chance)
                </span>
              </div>

              {results.dreamColleges.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No colleges in this tier for the specified criteria.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.dreamColleges.map(({ college, convertProbability, matchReasons, gapAnalysis }) => (
                    <div key={college.id} className="relative">
                      <div className="absolute top-2 right-2 z-20 px-3 py-1 bg-purple-700 text-white rounded-xl text-xs font-black shadow-md">
                        {convertProbability}% Convert Chance
                      </div>
                      <CollegeCard college={college} />
                      <div className="mt-2 p-3 bg-purple-50 rounded-xl border border-purple-100 text-[11px] text-purple-900 space-y-1">
                        <span className="font-bold block">AI Gap Analysis:</span>
                        <p>{gapAnalysis}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. TARGET COLLEGES */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <h3 className="text-xl font-bold text-slate-900">
                  Target Colleges ({results.targetColleges.length})
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
                  Competitive Sweet Spot (50-75% Chance)
                </span>
              </div>

              {results.targetColleges.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No colleges in this tier for the specified criteria.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.targetColleges.map(({ college, convertProbability, matchReasons, gapAnalysis }) => (
                    <div key={college.id} className="relative">
                      <div className="absolute top-2 right-2 z-20 px-3 py-1 bg-blue-600 text-white rounded-xl text-xs font-black shadow-md">
                        {convertProbability}% Convert Chance
                      </div>
                      <CollegeCard college={college} />
                      <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-100 text-[11px] text-blue-900 space-y-1">
                        <span className="font-bold block">AI Match Verdict:</span>
                        <p>{gapAnalysis}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. SAFE COLLEGES */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <h3 className="text-xl font-bold text-slate-900">
                  Safe / Backup Colleges ({results.safeColleges.length})
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  High Probability (80-95% Chance)
                </span>
              </div>

              {results.safeColleges.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No colleges in this tier for the specified criteria.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.safeColleges.map(({ college, convertProbability, matchReasons, gapAnalysis }) => (
                    <div key={college.id} className="relative">
                      <div className="absolute top-2 right-2 z-20 px-3 py-1 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-md">
                        {convertProbability}% Convert Chance
                      </div>
                      <CollegeCard college={college} />
                      <div className="mt-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 space-y-1">
                        <span className="font-bold block">AI Backup Analysis:</span>
                        <p>{gapAnalysis}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
