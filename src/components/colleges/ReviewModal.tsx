"use client";

import React, { useState } from "react";
import { X, Star, CheckCircle, ShieldCheck } from "lucide-react";
import { College } from "@/types";

interface ReviewModalProps {
  college: College;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newReview: any) => void;
}

export default function ReviewModal({ college, isOpen, onClose, onSuccess }: ReviewModalProps) {
  const [authorName, setAuthorName] = useState("");
  const [batch, setBatch] = useState("Batch of 2024");
  const [specialization, setSpecialization] = useState("Marketing");
  const [ratingOverall, setRatingOverall] = useState(5);
  const [ratingAcademics, setRatingAcademics] = useState(5);
  const [ratingPlacements, setRatingPlacements] = useState(5);
  const [ratingCampusLife, setRatingCampusLife] = useState(5);
  const [ratingInfrastructure, setRatingInfrastructure] = useState(5);
  const [ratingROI, setRatingROI] = useState(5);
  const [title, setTitle] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [placementExperience, setPlacementExperience] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !title || !reviewText) {
      alert("Please fill in author name, title, and review description.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collegeId: college.id,
          authorName,
          batch,
          specialization,
          ratingOverall,
          ratingAcademics,
          ratingPlacements,
          ratingCampusLife,
          ratingInfrastructure,
          ratingROI,
          title,
          pros: pros.split(",").map((s) => s.trim()).filter(Boolean),
          cons: cons.split(",").map((s) => s.trim()).filter(Boolean),
          reviewText,
          placementExperience,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit review");
      const data = await res.json();
      onSuccess(data.review);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting your review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">Write a Verified Student Review</h3>
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              Reviewing: {college.name} ({college.shortName})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Your Name / Alias</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Varun K. or Anonymous Alumni"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Batch</label>
              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="e.g. Batch of 2024"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Specialization</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-white"
              >
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Consulting/Strategy">Consulting / Strategy</option>
                <option value="Operations/Supply Chain">Operations / SCM</option>
                <option value="HR">Human Resources (HR)</option>
                <option value="Business Analytics">Business Analytics</option>
              </select>
            </div>
          </div>

          {/* Ratings Grid */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-800 block text-xs">Multi-Dimensional Ratings</span>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Overall Experience", val: ratingOverall, setter: setRatingOverall },
                { label: "Academics & Faculty", val: ratingAcademics, setter: setRatingAcademics },
                { label: "Placements Reality", val: ratingPlacements, setter: setRatingPlacements },
                { label: "Campus Life & Hostels", val: ratingCampusLife, setter: setRatingCampusLife },
                { label: "Infrastructure", val: ratingInfrastructure, setter: setRatingInfrastructure },
                { label: "ROI Verdict", val: ratingROI, setter: setRatingROI },
              ].map((item) => (
                <div key={item.label} className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1 text-[11px] font-medium text-slate-700">
                    <span>{item.label}</span>
                    <span className="font-bold text-blue-600">{item.val}/5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => item.setter(s)}
                        className="text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 ${s <= item.val ? "fill-amber-400" : "text-slate-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Review Headline</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Life-changing experience, but be ready for zero sleep in Term 1"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-emerald-700 block mb-1">
                Pros (Comma separated)
              </label>
              <input
                type="text"
                value={pros}
                onChange={(e) => setPros(e.target.value)}
                placeholder="e.g. Great faculty, MBB hires in droves, zero loan"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-red-600 block mb-1">
                Cons (Comma separated)
              </label>
              <input
                type="text"
                value={cons}
                onChange={(e) => setCons(e.target.value)}
                placeholder="e.g. Tough grading, mess food can be better"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* Detailed Experience */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Detailed Experience (Hostel, Faculty, Peer Group, Culture)
            </label>
            <textarea
              required
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share honest insights to help MBA aspirants know what life is actually like on campus..."
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Placement Reality */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Placement Reality (Actual roles, CTC figures, recruiters)
            </label>
            <input
              type="text"
              value={placementExperience}
              onChange={(e) => setPlacementExperience(e.target.value)}
              placeholder="e.g. Placed with BCG as Senior Consultant at ₹34 LPA during Day 1."
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md hover:shadow-blue-500/25 transition-all disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Publish Verified Review"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
