import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedColleges from "@/components/home/FeaturedColleges";
import AIFeaturesBanner from "@/components/home/AIFeaturesBanner";
import ReviewHighlights from "@/components/home/ReviewHighlights";
import Link from "next/link";
import { Sparkles, Scale, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Colleges Bento Grid */}
      <FeaturedColleges />

      {/* 3. AI Features Showcase */}
      <AIFeaturesBanner />

      {/* 4. Student Reviews Showcase */}
      <ReviewHighlights />

      {/* 5. Competitor Comparison Table Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              NextBschool vs Traditional Portals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              See why hundreds of thousands of Indian MBA aspirants are switching to our AI platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-4">Key Feature</th>
                  <th className="p-4 bg-blue-700 text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300" /> NextBschool AI
                  </th>
                  <th className="p-4 text-slate-300">Collegedunia / Zollege</th>
                  <th className="p-4 text-slate-300">MBAUniverse</th>
                  <th className="p-4 text-slate-300">Shiksha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">Phone Number Trap / Lead Reselling</td>
                  <td className="p-4 font-bold text-emerald-600 bg-blue-50/50">Zero Popups (100% Private)</td>
                  <td className="p-4 text-red-600">Forces OTP before showing cutoffs</td>
                  <td className="p-4 text-amber-600">Sponsored lead forms</td>
                  <td className="p-4 text-red-600">Frequent telecaller sharing</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">AI Profile Evaluator</td>
                  <td className="p-4 font-bold text-blue-700 bg-blue-50/50">Acads + WorkEx + Gender/Category</td>
                  <td className="p-4 text-slate-500">Only basic percentile input</td>
                  <td className="p-4 text-slate-500">No dynamic profile matcher</td>
                  <td className="p-4 text-slate-500">Static single-exam filter</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">3-Way Side-by-Side Comparison</td>
                  <td className="p-4 font-bold text-blue-700 bg-blue-50/50">15+ Metrics + AI Head-to-Head</td>
                  <td className="p-4 text-slate-500">Cluttered 2-column table</td>
                  <td className="p-4 text-slate-500">Articles only</td>
                  <td className="p-4 text-slate-500">Basic comparison with ads</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">AI Student Review Summarizer</td>
                  <td className="p-4 font-bold text-blue-700 bg-blue-50/50">Synthesized Pros, Cons & Hard Truths</td>
                  <td className="p-4 text-slate-500">Unfiltered sponsored reviews</td>
                  <td className="p-4 text-slate-500">No review synthesis</td>
                  <td className="p-4 text-slate-500">Manual review walls</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">24/7 AI Admission Counselor</td>
                  <td className="p-4 font-bold text-blue-700 bg-blue-50/50">B-Bot AI Chat Assistant</td>
                  <td className="p-4 text-slate-500">Human sales telecallers</td>
                  <td className="p-4 text-slate-500">None</td>
                  <td className="p-4 text-slate-500">Generic Q&A Forum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. High-Impact Predictor CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for CAT / XAT 2024-2025?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            See Exactly Where You Stand in Under 60 Seconds
          </h2>

          <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto">
            Calculate your Dream, Target, and Safe B-Schools across India using our proprietary composite scoring model.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/predictor"
              className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-blue-700 font-extrabold text-sm shadow-xl transition-all hover:scale-105"
            >
              Start Free AI Evaluation
            </Link>
            <Link
              href="/colleges"
              className="px-6 py-3.5 rounded-2xl bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Browse All Colleges
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
