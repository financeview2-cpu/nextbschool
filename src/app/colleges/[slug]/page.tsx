"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { 
  Award, 
  MapPin, 
  TrendingUp, 
  IndianRupee, 
  Scale, 
  Bookmark, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  BookOpen, 
  Briefcase, 
  DollarSign, 
  Users, 
  ThumbsUp, 
  Plus, 
  ArrowLeft,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { COLLEGES_DATA } from "@/data/colleges";
import { useCompare } from "@/context/CompareContext";
import { useShortlist } from "@/context/ShortlistContext";
import { formatCurrencyLakhs, getCutoffBadgeColor } from "@/lib/utils";
import ReviewModal from "@/components/colleges/ReviewModal";

export default function CollegeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const college = COLLEGES_DATA.find((c) => c.slug === slug);
  if (!college) {
    notFound();
  }

  const { addToCompare, isComparing } = useCompare();
  const { toggleShortlist, isShortlisted } = useShortlist();
  const [activeTab, setActiveTab] = useState<"overview" | "cutoffs" | "fees" | "placements" | "reviews">("overview");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(college.reviews);

  const comparing = isComparing(college.id);
  const shortlisted = isShortlisted(college.id);

  const handleReviewAdded = (newReview: any) => {
    setReviewsList((prev) => [newReview, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/colleges" className="hover:text-blue-600">Colleges</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold truncate">{college.name}</span>
        </div>
      </div>

      {/* College Hero Header */}
      <div className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <img
            src={college.coverImageUrl}
            alt={college.name}
            className="w-full h-full object-cover blur-xs"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            <div className="space-y-3">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 shadow-md">
                  <Award className="w-3.5 h-3.5" />
                  NIRF Rank #{college.nirfRank2024} (Management 2024)
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {college.ownership}
                </span>
                {college.accreditations.map((acc) => (
                  <span
                    key={acc}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/30 backdrop-blur-md text-blue-200 border border-blue-400/30"
                  >
                    {acc}
                  </span>
                ))}
              </div>

              {/* Title & Location */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                {college.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {college.city}, {college.state}
                </span>
                <span>•</span>
                <span>Est. {college.establishedYear}</span>
                <span>•</span>
                <span>{college.campusAreaAcres} Acre Campus</span>
                <span>•</span>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{college.overallRating} / 5.0</span>
                  <span className="text-slate-400 font-normal">({reviewsList.length} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleShortlist(college.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs border transition-all ${
                  shortlisted
                    ? "bg-amber-500 text-white border-amber-500 shadow-md"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span>{shortlisted ? "Shortlisted" : "Save to Shortlist"}</span>
              </button>

              <button
                onClick={() => addToCompare(college.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs border transition-all ${
                  comparing
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-900 border-white hover:bg-slate-100"
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{comparing ? "Comparing" : "Compare College"}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Metric Highlights Strip */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Average CTC
              </p>
              <p className="text-xl font-extrabold text-slate-900 mt-1">
                {formatCurrencyLakhs(college.placements.averageCTC)}
              </p>
              <p className="text-[10px] text-slate-500">Median: {formatCurrencyLakhs(college.placements.medianCTC)}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                Total Course Fee
              </p>
              <p className="text-xl font-extrabold text-slate-900 mt-1">
                {formatCurrencyLakhs(college.fees.totalCourseFeeLakhs)}
              </p>
              <p className="text-[10px] text-slate-500">Tuition + Living included</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-purple-600" />
                Highest Domestic CTC
              </p>
              <p className="text-xl font-extrabold text-slate-900 mt-1">
                {formatCurrencyLakhs(college.placements.highestDomesticCTC)}
              </p>
              <p className="text-[10px] text-slate-500">100% Placement Record</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Primary Cutoff
              </p>
              <p className="text-xl font-extrabold text-slate-900 mt-1">
                {college.cutoffs[0]?.exam}: {college.cutoffs[0]?.general}{college.cutoffs[0]?.exam === "NMAT" ? " M" : "%ile"}
              </p>
              <p className="text-[10px] text-slate-500">General Category Threshold</p>
            </div>

          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto text-xs font-bold scrollbar-none">
            {[
              { id: "overview", label: "Overview & AI Verdict" },
              { id: "cutoffs", label: "Exam Cutoffs & Eligibility" },
              { id: "fees", label: "Fee Structure & Scholarships" },
              { id: "placements", label: "Placements & Recruiters" },
              { id: "reviews", label: `Student Reviews (${reviewsList.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-700 font-extrabold"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            
            {/* AI Summary Card */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>NextBschool AI Synthesized Verdict</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">{college.aiSummary.verdict}</h2>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                <span className="font-bold text-white">Ideal Candidate Profile: </span>
                {college.aiSummary.bestSuitedFor}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs">
                <div className="space-y-2">
                  <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> The High Points (Pros)
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    {college.aiSummary.keyPros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
                    <AlertCircle className="w-4 h-4" /> The Reality Checks (Cons)
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    {college.aiSummary.keyCons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Programs Offered & Specializations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Degrees & Programs Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {college.degreesOffered.map((deg) => (
                    <span
                      key={deg}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 font-bold text-xs"
                    >
                      {deg}
                    </span>
                  ))}
                </div>

                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mt-6 mb-3">
                  Key Specializations
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {college.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Campus & Institutional Info
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Established Year</span>
                    <span className="font-bold text-slate-800">{college.establishedYear}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Ownership</span>
                    <span className="font-bold text-slate-800">{college.ownership}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Campus Size</span>
                    <span className="font-bold text-slate-800">{college.campusAreaAcres} Acres</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Accreditations</span>
                    <span className="font-bold text-blue-700">{college.accreditations.join(", ")}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: CUTOFFS */}
        {activeTab === "cutoffs" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                Category-wise Expected Cutoff Scores
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Based on official shortlist cutoffs and RTI data from the latest admission cycles.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Exam</th>
                      <th className="p-3">General</th>
                      <th className="p-3">NC-OBC</th>
                      <th className="p-3">SC</th>
                      <th className="p-3">ST</th>
                      <th className="p-3">EWS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {college.cutoffs.map((co) => (
                      <tr key={co.exam} className="hover:bg-slate-50 font-medium">
                        <td className="p-3 font-bold text-blue-700">{co.exam}</td>
                        <td className="p-3 font-bold">{co.general}{co.exam === "NMAT" ? " Score" : "%ile"}</td>
                        <td className="p-3">{co.ncObc ? `${co.ncObc}%ile` : "N/A"}</td>
                        <td className="p-3">{co.sc ? `${co.sc}%ile` : "N/A"}</td>
                        <td className="p-3">{co.st ? `${co.st}%ile` : "N/A"}</td>
                        <td className="p-3">{co.ews ? `${co.ews}%ile` : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Selection Criteria Weightage */}
              <h4 className="font-bold text-slate-900 text-sm mt-8 mb-3">
                Final Selection Criteria Weightage Distribution
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { label: "Entrance Exam", val: college.admissionWeightage.entranceExam },
                  { label: "PI Round", val: college.admissionWeightage.personalInterview },
                  { label: "GD / WAT", val: college.admissionWeightage.groupDiscussionOrWat },
                  { label: "Past Academics", val: college.admissionWeightage.academicHistory },
                  { label: "Work Experience", val: college.admissionWeightage.workExperience },
                  { label: "Diversity Points", val: college.admissionWeightage.genderOrAcademicDiversity },
                ].map((crit) => (
                  <div key={crit.label} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-xl font-black text-blue-700">{crit.val}%</span>
                    <p className="text-[10px] font-semibold text-slate-500 mt-1">{crit.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FEES & SCHOLARSHIPS */}
        {activeTab === "fees" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  Fee Breakdown (2-Year Full-Time)
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Tuition & Academic Fees</span>
                    <span className="font-bold text-slate-800">
                      {formatCurrencyLakhs(college.fees.tuitionFeeLakhs)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Hostel & Living Expenses</span>
                    <span className="font-bold text-slate-800">
                      {formatCurrencyLakhs(college.fees.hostelFeeLakhs)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 border-slate-200 text-sm font-bold text-slate-900">
                    <span>Total Investment</span>
                    <span className="text-blue-700">
                      {formatCurrencyLakhs(college.fees.totalCourseFeeLakhs)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Scholarships & Financial Aid
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {college.fees.scholarshipDetails}
                </p>
                <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-900">
                  <span className="font-bold">Education Loan Tie-ups: </span>
                  Collateral-free loans up to 100% of the total course fees are offered by SBI Scholar Loan scheme, HDFC Credila, and Axis Bank for this institution.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: PLACEMENTS */}
        {activeTab === "placements" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                Placements & Top Recruiters
              </h3>

              {/* Recruiter Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {college.placements.topRecruiters.map((rec) => (
                  <span
                    key={rec}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
                  >
                    {rec}
                  </span>
                ))}
              </div>

              {/* Sector-wise breakdown */}
              <h4 className="font-bold text-slate-900 text-sm mb-3">
                Sector-wise Offer Distribution
              </h4>
              <div className="space-y-3">
                {college.placements.topSectors.map((sec) => (
                  <div key={sec.sector}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700">{sec.sector}</span>
                      <span className="text-blue-700 font-bold">{sec.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${sec.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Student & Alumni Reviews ({reviewsList.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Unfiltered opinions on hostel food, academics, and actual placement packages.
                </p>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Write Verified Review</span>
              </button>
            </div>

            <div className="space-y-4">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{rev.authorName}</h4>
                      <p className="text-xs text-slate-500">{rev.batch} • {rev.specialization}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-xs font-bold text-amber-800">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{rev.ratingOverall}.0</span>
                    </div>
                  </div>

                  <h5 className="font-bold text-slate-900 text-sm">&ldquo;{rev.title}&rdquo;</h5>
                  <p className="text-xs text-slate-700 leading-relaxed">{rev.reviewText}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-900 border border-emerald-100">
                      <span className="font-bold">Pros: </span>
                      <span>{rev.pros.join(", ")}</span>
                    </div>
                    <div className="p-2.5 bg-red-50 rounded-xl text-red-900 border border-red-100">
                      <span className="font-bold">Cons: </span>
                      <span>{rev.cons.join(", ")}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500">
                    <span className="italic">Placement experience: {rev.placementExperience}</span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-slate-400" /> {rev.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Review Submission Modal */}
      <ReviewModal
        college={college}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={handleReviewAdded}
      />

    </div>
  );
}
