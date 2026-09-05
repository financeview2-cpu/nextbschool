import { NextResponse } from "next/server";
import { COLLEGES_DATA } from "@/data/colleges";
import { CandidateProfile, College, PredictionResult } from "@/types";

export async function POST(request: Request) {
  try {
    const profile: CandidateProfile = await request.json();

    const {
      category = "General",
      gender = "Male",
      academicStream = "Engineering",
      score10th = 85,
      score12th = 85,
      scoreGrad = 75,
      workExperienceMonths = 0,
      budgetMaxLakhs = 35,
      preferredSpecialization = "Any",
      examScores = {}
    } = profile;

    // Highest available percentile across exams
    const catPercentile = examScores.cat || 0;
    const xatPercentile = examScores.xat || 0;
    const snapPercentile = examScores.snap || 0;
    const nmatScore = examScores.nmat || 0;
    const cmatPercentile = examScores.cmat || 0;

    // Calculate Diversity Bonus
    let diversityScore = 0;
    let diversityAdvantageRemarks = "Standard category benchmarking.";
    if (gender === "Female") {
      diversityScore += 5;
      diversityAdvantageRemarks = "Female gender diversity grants 3 to 5 bonus points at IIM Kozhikode, IIM Lucknow, and SPJIMR.";
    }
    if (academicStream !== "Engineering") {
      diversityScore += 5;
      diversityAdvantageRemarks += " Non-engineering academic background gives you huge diversity advantage across IIM Ahmedabad, Bangalore, and Kozhikode.";
    }

    // Calculate Work Ex Score
    let workExScore = 0;
    let workExRemarks = "";
    if (workExperienceMonths >= 24 && workExperienceMonths <= 36) {
      workExScore = 10; // Peak sweet spot for Indian B-Schools
      workExRemarks = "Optimal 2-3 years work experience gives you the highest possible rating (10/10) in shortlisting.";
    } else if (workExperienceMonths > 12 && workExperienceMonths < 24) {
      workExScore = 7;
      workExRemarks = "1-2 years work experience gives you a healthy boost over freshers.";
    } else if (workExperienceMonths > 36) {
      workExScore = 6;
      workExRemarks = "With 3+ years experience, also consider 1-year Executive MBA programs like ISB, IIMA PGPX, or Great Lakes PGPM.";
    } else {
      workExScore = 2;
      workExRemarks = "As a fresher, target high exam percentiles (99.5+ for Top IIMs) to offset lack of work-ex points.";
    }

    // Academics Composite Score (out of 30)
    const avgAcads = (score10th + score12th + scoreGrad) / 3;
    const acadsScore = (avgAcads / 100) * 30;

    const dreamColleges: PredictionResult["dreamColleges"] = [];
    const targetColleges: PredictionResult["targetColleges"] = [];
    const safeColleges: PredictionResult["safeColleges"] = [];

    // Evaluate each college
    COLLEGES_DATA.forEach((college) => {
      // Check budget
      if (budgetMaxLakhs && college.fees.totalCourseFeeLakhs > budgetMaxLakhs + 3) {
        return; // Exceeds budget threshold
      }

      // Check applicable cutoff
      let candidateScoreForCollege = 0;
      let collegeCutoffGeneral = 99;

      // Match exam
      for (const cutoff of college.cutoffs) {
        let candidateScore = 0;
        let requiredCutoff = cutoff.general;

        // Adjust for category
        if (category === "NC-OBC" && cutoff.ncObc) requiredCutoff = cutoff.ncObc;
        else if (category === "SC" && cutoff.sc) requiredCutoff = cutoff.sc;
        else if (category === "ST" && cutoff.st) requiredCutoff = cutoff.st;
        else if (category === "EWS" && cutoff.ews) requiredCutoff = cutoff.ews;

        if (cutoff.exam === "CAT" && catPercentile > 0) {
          candidateScore = catPercentile;
        } else if (cutoff.exam === "XAT" && xatPercentile > 0) {
          candidateScore = xatPercentile;
        } else if (cutoff.exam === "SNAP" && snapPercentile > 0) {
          candidateScore = snapPercentile;
        } else if (cutoff.exam === "NMAT" && nmatScore > 0) {
          // Normalize NMAT (out of 360, cutoff ~232 = ~96%)
          candidateScore = (nmatScore / 360) * 100;
          requiredCutoff = (cutoff.general / 360) * 100;
        } else if (cutoff.exam === "CMAT" && cmatPercentile > 0) {
          candidateScore = cmatPercentile;
        }

        if (candidateScore > candidateScoreForCollege) {
          candidateScoreForCollege = candidateScore;
          collegeCutoffGeneral = requiredCutoff;
        }
      }

      if (candidateScoreForCollege === 0) {
        return; // Student has not provided score for exams accepted by this college
      }

      // Calculate composite match delta
      // Positive delta means candidate beats the cutoff
      let delta = candidateScoreForCollege - collegeCutoffGeneral;

      // Factor in acads and diversity
      if (avgAcads >= 85) delta += 0.8;
      if (diversityScore > 0) delta += 1.0;
      if (workExScore >= 7) delta += 0.7;

      // Special handling for SPJIMR profile-based calls
      if (college.id === "spjimr-mumbai" && avgAcads >= 85 && candidateScoreForCollege >= 85) {
        delta += 8.0; // Profile call advantage
      }

      // Classify into Dream / Target / Safe
      if (delta >= 1.5) {
        const prob = Math.min(96, Math.round(75 + delta * 5));
        safeColleges.push({
          college,
          convertProbability: prob,
          matchReasons: [
            `Your score beats the cutoff (${collegeCutoffGeneral}) comfortably.`,
            `Strong academic index of ${avgAcads.toFixed(1)}% supports a strong PI shortlist.`,
            `Good alignment with median CTC of ₹${college.placements.medianCTC} LPA.`
          ],
          gapAnalysis: "Ensure you prepare well for the PI/WAT rounds; your profile is practically guaranteed an interview call."
        });
      } else if (delta >= -1.5 && delta < 1.5) {
        const prob = Math.max(50, Math.min(74, Math.round(60 + delta * 8)));
        targetColleges.push({
          college,
          convertProbability: prob,
          matchReasons: [
            `Your score aligns very closely with the expected ${category} cutoff of ~${collegeCutoffGeneral}.`,
            diversityScore > 0 ? "Diversity points will provide an essential edge in the final composite score." : "Solid past academic record.",
            `Work-experience profile (${workExperienceMonths} months) adds competitive weightage.`
          ],
          gapAnalysis: "Focus heavily on current affairs and your undergraduate domain to ace the Personal Interview."
        });
      } else if (delta >= -5.0 && delta < -1.5) {
        const prob = Math.max(25, Math.min(48, Math.round(35 + (delta + 5) * 4)));
        dreamColleges.push({
          college,
          convertProbability: prob,
          matchReasons: [
            "Aspirational tier-1 brand with highest average package in the country.",
            "Can convert with outstanding GD-PI-WAT performance or profile-based weightage."
          ],
          gapAnalysis: `Currently ~${Math.abs(Number(delta.toFixed(1)))} percentile points below median historical call cutoff. Stellar interview performance will be critical.`
        });
      }
    });

    // Sort by NIRF Rank
    dreamColleges.sort((a, b) => a.college.nirfRank2024 - b.college.nirfRank2024);
    targetColleges.sort((a, b) => a.college.nirfRank2024 - b.college.nirfRank2024);
    safeColleges.sort((a, b) => a.college.nirfRank2024 - b.college.nirfRank2024);

    const result: PredictionResult = {
      dreamColleges: dreamColleges.slice(0, 4),
      targetColleges: targetColleges.slice(0, 4),
      safeColleges: safeColleges.slice(0, 4),
      profileAnalysis: {
        compositeScore: Number((acadsScore + workExScore + diversityScore).toFixed(1)),
        diversityAdvantage: diversityAdvantageRemarks,
        workExWeightageRemarks: workExRemarks,
        suggestedFocusAreas: [
          "Prepare 3-5 strong stories around leadership and conflict resolution for the Personal Interview.",
          "Keep abreast of Union Budget, RBI Monetary Policies, and Global Trade developments.",
          avgAcads < 80 ? "Prepare a convincing rationale for any academic dips in your graduation years." : "Highlight consistent academic excellence in your SOP."
        ]
      }
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Predictor Error:", error);
    return NextResponse.json({ error: "Failed to evaluate profile" }, { status: 500 });
  }
}
