"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { COLLEGES_DATA } from "@/data/colleges";
import { formatCurrencyLakhs, formatCurrencyRupees } from "@/lib/utils";

export default function ROICalculatorPage() {
  const [selectedCollegeId, setSelectedCollegeId] = useState("fms-delhi");
  const [preMbaSalaryLakhs, setPreMbaSalaryLakhs] = useState(6);
  const [postMbaSalaryLakhs, setPostMbaSalaryLakhs] = useState(34);
  const [totalCourseFeeLakhs, setTotalCourseFeeLakhs] = useState(2.5);
  const [loanInterestRate, setLoanInterestRate] = useState(8.5);

  const handleCollegePresetChange = (cId: string) => {
    setSelectedCollegeId(cId);
    const col = COLLEGES_DATA.find((c) => c.id === cId);
    if (col) {
      setTotalCourseFeeLakhs(col.fees.totalCourseFeeLakhs);
      setPostMbaSalaryLakhs(col.placements.averageCTC);
    }
  };

  // Calculations
  // Total direct cost = fees in Rupees
  const totalCost = totalCourseFeeLakhs * 100000;
  // Opportunity cost of leaving job for 2 years = preMbaSalary * 2 * 100000
  const opportunityCost = preMbaSalaryLakhs * 2 * 100000;
  const totalInvestment = totalCost + opportunityCost;

  // Post MBA in-hand monthly salary ~ 72% of CTC divided by 12
  const postMbaMonthlyInHand = (postMbaSalaryLakhs * 100000 * 0.72) / 12;
  // Pre MBA in-hand monthly salary
  const preMbaMonthlyInHand = (preMbaSalaryLakhs * 100000 * 0.72) / 12;
  // Incremental monthly income gained from MBA
  const incrementalMonthly = Math.max(1000, postMbaMonthlyInHand - preMbaMonthlyInHand);

  // Payback period for direct course fees
  const paybackMonthsDirect = Math.round(totalCost / incrementalMonthly);
  // Payback period including opportunity cost
  const paybackMonthsTotal = Math.round(totalInvestment / incrementalMonthly);

  // 5-Year net incremental wealth
  const fiveYearGain = incrementalMonthly * 60 - totalCost;
  const roiPercentage = Math.round((fiveYearGain / (totalCost || 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Financial Payback & ROI Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Interactive MBA ROI Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Will your MBA pay off? Calculate the exact months required to recover your course fee and opportunity cost based on real median placement figures.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Quick College Preset */}
            <div>
              <label className="font-bold text-slate-800 text-xs block mb-2">
                Select B-School to Auto-Fill Data:
              </label>
              <select
                value={selectedCollegeId}
                onChange={(e) => handleCollegePresetChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-600"
              >
                {COLLEGES_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.shortName} (Fee: ₹{c.fees.totalCourseFeeLakhs}L • Avg: ₹{c.placements.averageCTC}L)
                  </option>
                ))}
              </select>
            </div>

            {/* Total Course Fee Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Total 2-Year Course Fee (Tuition + Living)</span>
                <span className="font-bold text-blue-700">₹{totalCourseFeeLakhs} Lakhs</span>
              </div>
              <input
                type="range"
                min="2.5"
                max="35"
                step="0.5"
                value={totalCourseFeeLakhs}
                onChange={(e) => setTotalCourseFeeLakhs(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Expected Post-MBA CTC */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Expected Post-MBA Annual CTC</span>
                <span className="font-bold text-emerald-600">₹{postMbaSalaryLakhs} LPA</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="0.5"
                value={postMbaSalaryLakhs}
                onChange={(e) => setPostMbaSalaryLakhs(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Current Salary (Opportunity Cost) */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Current Salary (Fresher = ₹0)</span>
                <span className="font-bold text-slate-800">₹{preMbaSalaryLakhs} LPA</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={preMbaSalaryLakhs}
                onChange={(e) => setPreMbaSalaryLakhs(parseFloat(e.target.value))}
                className="w-full accent-slate-800 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Calculation Logic:</span>
              <p>
                Takes into account standard Indian income tax brackets (approx 28% deductions on high packages), post-tax disposable income, and living expenses to determine exact loan payback velocity.
              </p>
            </div>

          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col justify-between space-y-6">
            
            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block mb-2">
                ROI Diagnostic Output
              </span>

              {/* Big Metric: Payback Period */}
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-300 block">Course Fee Payback Period</span>
                <p className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                  {paybackMonthsDirect} Months
                </p>
                <span className="text-[11px] text-slate-300 block mt-1">
                  ~{(paybackMonthsDirect / 12).toFixed(1)} years of post-MBA work
                </span>
              </div>

              {/* Secondary Stats */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-slate-400 text-[10px] block">5-Year Net ROI</span>
                  <span className="font-extrabold text-white text-base">+{roiPercentage}%</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-slate-400 text-[10px] block">5-Yr Net Wealth Gained</span>
                  <span className="font-extrabold text-emerald-400 text-base">
                    ₹{(fiveYearGain / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span>Direct Course Fee:</span>
                  <span className="font-bold text-white">{formatCurrencyLakhs(totalCourseFeeLakhs)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span>2-Year Opportunity Cost:</span>
                  <span className="font-bold text-white">{formatCurrencyLakhs(preMbaSalaryLakhs * 2)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span>Monthly Incremental In-Hand:</span>
                  <span className="font-bold text-emerald-400">
                    {formatCurrencyRupees(Math.round(incrementalMonthly))} / mo
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/predictor"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Predict Colleges for My Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}
