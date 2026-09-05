"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  Sparkles,
  Bot
} from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useShortlist } from "@/context/ShortlistContext";
import { COLLEGES_DATA } from "@/data/colleges";

export default function Navbar() {
  const pathname = usePathname();
  const { compareIds } = useCompare();
  const { shortlistCount } = useShortlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColleges = searchQuery.trim() === ""
    ? []
    : COLLEGES_DATA.filter((c) => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Colleges", href: "/colleges" },
    { name: "AI Predictor", href: "/predictor", hasAIBadge: true },
    { name: "Compare", href: "/compare", count: compareIds.length },
    { name: "Exams", href: "/exams" },
    { name: "ROI Calculator", href: "/roi-calculator" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* 1. Clean Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Next<span className="text-blue-600">Bschool</span>
                </span>
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200">
                  AI
                </span>
              </div>
            </Link>

            {/* 2. Simple, Clear Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "text-blue-600 font-bold bg-blue-50/70"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.hasAIBadge && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    )}
                    {typeof item.count === "number" && item.count > 0 && (
                      <span className="px-1.5 py-0.2 text-[11px] font-bold bg-blue-100 text-blue-700 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Clean Right Actions */}
            <div className="flex items-center gap-2.5">
              
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/70 rounded-xl transition-colors border border-slate-200/80"
                title="Search colleges"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Search...</span>
              </button>

              {/* Shortlist Bookmark */}
              <Link
                href="/colleges?filter=shortlisted"
                className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
                title="Shortlisted Colleges"
              >
                <Bookmark className="w-4 h-4" />
                {shortlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {shortlistCount}
                  </span>
                )}
              </Link>

              {/* Primary Action Button: B-Bot Counselor */}
              <Link
                href="/counselor"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask B-Bot</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Simple Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{item.name}</span>
                  {typeof item.count === "number" && item.count > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100">
              <Link
                href="/counselor"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                <Bot className="w-4 h-4" />
                <span>Ask B-Bot AI Counselor</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college, exam, city..."
                className="w-full text-sm bg-transparent border-0 focus:outline-none placeholder:text-slate-400 text-slate-800"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {searchQuery.trim() === "" ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  Search &quot;IIM&quot;, &quot;FMS&quot;, &quot;XLRI&quot;, &quot;Mumbai&quot;, or &quot;CAT&quot;
                </div>
              ) : filteredColleges.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No colleges found matching &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredColleges.map((college) => (
                    <Link
                      key={college.id}
                      href={`/colleges/${college.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{college.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {college.city} • Avg CTC: ₹{college.placements.averageCTC} LPA
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        NIRF #{college.nirfRank2024}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
