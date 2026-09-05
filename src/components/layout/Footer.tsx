import React from "react";
import Link from "next/link";
import { GraduationCap, Sparkles, ShieldCheck, Heart, Award, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner: NextBschool vs Legacy Competitors */}
      <div className="bg-blue-950/60 border-b border-blue-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">The Zero-Spam Promise</h4>
              <p className="text-xs text-slate-400">
                Unlike Collegedunia and Shiksha, NextBschool will NEVER sell your phone number to telemarketing call centers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
              ✓ Verified Alumni Reviews
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              ✓ Real CTC & Placements
            </span>
            <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              ✓ 100% Free AI Tools
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Next<span className="text-blue-400">Bschool</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India&apos;s most advanced AI-powered MBA decision engine. Helping 500,000+ CAT, XAT, SNAP & NMAT aspirants discover the right business school with authentic data, verified reviews, and intelligent predictors.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] text-slate-400">Powered by Next-Gen LLM & Analytics</span>
            </div>
          </div>

          {/* Quick AI Tools */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              AI Decision Tools
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/predictor" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  AI College Predictor <Sparkles className="w-3 h-3 text-amber-400" />
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-blue-400 transition-colors">
                  Side-by-Side Comparison
                </Link>
              </li>
              <li>
                <Link href="/counselor" className="hover:text-blue-400 transition-colors">
                  B-Bot AI Counselor
                </Link>
              </li>
              <li>
                <Link href="/roi-calculator" className="hover:text-blue-400 transition-colors">
                  MBA ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/colleges#reviews" className="hover:text-blue-400 transition-colors">
                  AI Review Summarizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Top B-Schools */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Top B-Schools
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/colleges/iim-ahmedabad" className="hover:text-white transition-colors">
                  IIM Ahmedabad
                </Link>
              </li>
              <li>
                <Link href="/colleges/iim-bangalore" className="hover:text-white transition-colors">
                  IIM Bangalore
                </Link>
              </li>
              <li>
                <Link href="/colleges/fms-delhi" className="hover:text-white transition-colors">
                  FMS Delhi (High ROI)
                </Link>
              </li>
              <li>
                <Link href="/colleges/xlri-jamshedpur" className="hover:text-white transition-colors">
                  XLRI Jamshedpur
                </Link>
              </li>
              <li>
                <Link href="/colleges/spjimr-mumbai" className="hover:text-white transition-colors">
                  SPJIMR Mumbai
                </Link>
              </li>
              <li>
                <Link href="/colleges/iit-bombay-sjmsom" className="hover:text-white transition-colors">
                  SJMSOM IIT Bombay
                </Link>
              </li>
            </ul>
          </div>

          {/* Exams & Hubs */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Entrance Exams
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/exams#cat" className="hover:text-white transition-colors">
                  CAT 2024 / 2025
                </Link>
              </li>
              <li>
                <Link href="/exams#xat" className="hover:text-white transition-colors">
                  XAT 2025 (XLRI)
                </Link>
              </li>
              <li>
                <Link href="/exams#snap" className="hover:text-white transition-colors">
                  SNAP (Symbiosis)
                </Link>
              </li>
              <li>
                <Link href="/exams#nmat" className="hover:text-white transition-colors">
                  NMAT by GMAC (NMIMS)
                </Link>
              </li>
              <li>
                <Link href="/exams#cmat" className="hover:text-white transition-colors">
                  CMAT & MAH-CET
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NextBschool. All rights reserved. Made with ❤️ for Indian MBA Aspirants.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">College Listing Request</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
