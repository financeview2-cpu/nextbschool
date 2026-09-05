import React from "react";
import Link from "next/link";
import { Star, ShieldCheck, ThumbsUp, MessageSquareQuote, ArrowRight } from "lucide-react";
import { COLLEGES_DATA } from "@/data/colleges";

export default function ReviewHighlights() {
  // Gather all available reviews from colleges
  const topReviews = COLLEGES_DATA.flatMap((c) =>
    (c.reviews || []).map((r) => ({
      ...r,
      collegeName: c.shortName,
      collegeSlug: c.slug,
    }))
  ).slice(0, 3);

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Unfiltered Opinions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Verified Student & Alumni Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real accounts of campus rigor, hostel realities, placement packages, and ROI.
            </p>
          </div>

          <Link
            href="/colleges"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>Read All College Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* College & Author Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <Link
                      href={`/colleges/${rev.collegeSlug}`}
                      className="font-bold text-sm text-blue-700 hover:underline block"
                    >
                      {rev.collegeName}
                    </Link>
                    <p className="text-[11px] text-slate-500">
                      {rev.authorName} • {rev.batch}
                    </p>
                  </div>
                  {rev.isVerifiedStudent && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Rating & Title */}
                <div className="mt-3">
                  <div className="flex items-center gap-1 mb-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= rev.ratingOverall
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-800 ml-1">
                      {rev.ratingOverall}.0
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    &ldquo;{rev.title}&rdquo;
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {rev.reviewText}
                  </p>
                </div>

                {/* Pros & Cons Pills */}
                <div className="mt-4 space-y-1.5 text-[11px]">
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold flex-shrink-0">Pros:</span>
                    <span className="text-slate-600 line-clamp-1">{rev.pros?.join(", ") || "N/A"}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-red-600 font-bold flex-shrink-0">Cons:</span>
                    <span className="text-slate-600 line-clamp-1">{rev.cons?.join(", ") || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Placement Quote */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="italic truncate max-w-[200px]">
                  {rev.placementExperience}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <ThumbsUp className="w-3 h-3" />
                  {rev.likes}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
