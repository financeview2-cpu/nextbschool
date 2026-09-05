"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Award, 
  MapPin, 
  TrendingUp, 
  IndianRupee, 
  Scale, 
  Bookmark, 
  Star, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { College } from "@/types";
import { useCompare } from "@/context/CompareContext";
import { useShortlist } from "@/context/ShortlistContext";
import { formatCurrencyLakhs, getCutoffBadgeColor } from "@/lib/utils";

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { addToCompare, isComparing } = useCompare();
  const { toggleShortlist, isShortlisted } = useShortlist();

  const comparing = isComparing(college.id);
  const shortlisted = isShortlisted(college.id);

  // Primary exam cutoff
  const primaryCutoff = college.cutoffs[0];

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Banner Image with Quick Actions */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        <img
          src={college.coverImageUrl}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent"></div>

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-400" />
            NIRF #{college.nirfRank2024}
          </span>
          {college.featured && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
          {college.accreditations.slice(0, 2).map((acc) => (
            <span
              key={acc}
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 backdrop-blur-md text-slate-800"
            >
              {acc}
            </span>
          ))}
        </div>

        {/* Quick Action Top Right: Shortlist & Compare */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleShortlist(college.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
              shortlisted
                ? "bg-amber-500 text-white shadow-md"
                : "bg-black/40 text-white hover:bg-black/60"
            }`}
            title={shortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
            aria-label="Shortlist college"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Bottom Banner Info: City & Ratings */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div className="flex items-center gap-1 text-xs text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="font-medium">{college.city}, {college.state}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-semibold text-white border border-white/20">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{college.overallRating}</span>
            <span className="text-[10px] text-slate-300">({college.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* College Name */}
          <Link href={`/colleges/${college.slug}`} className="block group-hover:text-blue-600 transition-colors">
            <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1">
              {college.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Est. {college.establishedYear} • {college.ownership}
            </p>
          </Link>

          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                Avg / Median CTC
              </p>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                {formatCurrencyLakhs(college.placements.averageCTC)}{" "}
                <span className="text-[11px] text-slate-400 font-normal">/ {college.placements.medianCTC}L</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <IndianRupee className="w-3 h-3 text-blue-600" />
                Total Course Fee
              </p>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                {formatCurrencyLakhs(college.fees.totalCourseFeeLakhs)}
              </p>
            </div>
          </div>

          {/* Cutoffs & Exam Tags */}
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Cutoff:</span>
            <div className="flex flex-wrap items-center gap-1.5 justify-end">
              {college.cutoffs.map((co) => (
                <span
                  key={co.exam}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded-md border ${getCutoffBadgeColor(
                    co.general
                  )}`}
                >
                  {co.exam}: {co.general}{co.exam === "NMAT" ? " Marks" : "%ile"}
                </span>
              ))}
            </div>
          </div>

          {/* AI Snapshot Pill */}
          <div className="mt-3 p-2 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900 flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-2">
              <span className="font-bold">AI Insight: </span>
              {college.aiSummary.verdict}
            </p>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Compare Toggle */}
          <button
            onClick={() => addToCompare(college.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              comparing
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{comparing ? "Comparing" : "Compare"}</span>
          </button>

          {/* View Details Link */}
          <Link
            href={`/colleges/${college.slug}`}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-all"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
