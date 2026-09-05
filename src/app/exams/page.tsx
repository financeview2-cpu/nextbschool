"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CalendarDays, 
  Clock, 
  IndianRupee, 
  FileText, 
  CheckCircle2, 
  GraduationCap, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { EXAMS_DATA } from "@/data/exams";

export default function ExamsPage() {
  const [selectedExamId, setSelectedExamId] = useState(EXAMS_DATA[0].id);
  const currentExam = EXAMS_DATA.find((e) => e.id === selectedExamId) || EXAMS_DATA[0];

  return (
    <div className="min-h-screen bg-slate-50 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold shadow-xs">
            <CalendarDays className="w-3.5 h-3.5 text-blue-600" />
            <span>2024 - 2025 MBA Admissions Calendar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Indian MBA Entrance Exams Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Key dates, marking patterns, duration, syllabus structure, and top business schools accepting each entrance exam across India.
          </p>
        </div>

        {/* Exam Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none justify-start lg:justify-center">
          {EXAMS_DATA.map((exam) => {
            const isSelected = exam.id === selectedExamId;
            return (
              <button
                key={exam.id}
                onClick={() => setSelectedExamId(exam.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{exam.shortName}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    exam.status === "Registration Open"
                      ? isSelected ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-800"
                      : isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {exam.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Exam Detailed Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Conducted by {currentExam.conductingBody}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    {currentExam.name} ({currentExam.shortName})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Accepted by {currentExam.acceptedByCollegesCount}+ colleges across India
                  </p>
                </div>

                <a
                  href={currentExam.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200 self-start sm:self-auto"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>

              {/* Sections & Time Limit Breakdown */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Exam Structure & Sectional Breakdown
                </h3>

                <div className="space-y-3">
                  {currentExam.sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800 block">{sec.name}</span>
                        <span className="text-slate-500 text-[11px]">{sec.questions} Questions</span>
                      </div>
                      <div className="text-right font-bold text-blue-700">
                        <Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        {sec.timeLimitMinutes} Mins
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marking Scheme */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Marking Scheme & Rules:
                </span>
                <p>{currentExam.markingScheme}</p>
              </div>

            </div>

          </div>

          {/* Sidebar Column: Important Dates & Top Colleges */}
          <div className="space-y-6">
            
            {/* Dates Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-blue-600" />
                Important Milestones
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Exam Date</span>
                  <span className="font-bold text-slate-800 text-sm">{currentExam.examDate}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Registration Deadline</span>
                  <span className="font-bold text-slate-800 text-sm">{currentExam.registrationDeadline}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Result Declaration</span>
                  <span className="font-bold text-slate-800 text-sm">{currentExam.resultsDate}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 font-semibold">Application Fee</span>
                  <span className="font-bold text-blue-700 text-sm">₹{currentExam.applicationFee}</span>
                </div>
              </div>
            </div>

            {/* Top Colleges Accepting */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                Premier Colleges Accepting {currentExam.shortName}
              </h3>

              <div className="flex flex-wrap gap-2">
                {currentExam.topCollegesAccepting.map((cName) => (
                  <Link
                    key={cName}
                    href={`/colleges?search=${encodeURIComponent(cName)}`}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-colors"
                  >
                    {cName}
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
