import { NextResponse } from "next/server";
import { COLLEGES_DATA } from "@/data/colleges";
import { College } from "@/types";

export async function POST(request: Request) {
  try {
    const { collegeIds } = await request.json();

    if (!collegeIds || !Array.isArray(collegeIds) || collegeIds.length < 2) {
      return NextResponse.json({ error: "Please select at least 2 colleges to compare." }, { status: 400 });
    }

    const colleges: College[] = collegeIds
      .map((id) => COLLEGES_DATA.find((c) => c.id === id))
      .filter((c): c is College => Boolean(c));

    if (colleges.length < 2) {
      return NextResponse.json({ error: "Colleges not found." }, { status: 404 });
    }

    // Determine Winners
    let bestROICollege = colleges[0]!;
    let highestPlacementCollege = colleges[0]!;
    let lowestFeeCollege = colleges[0]!;

    for (const c of colleges) {
      if (c.fees.totalCourseFeeLakhs < lowestFeeCollege.fees.totalCourseFeeLakhs) {
        lowestFeeCollege = c;
      }
      if (c.placements.averageCTC > highestPlacementCollege.placements.averageCTC) {
        highestPlacementCollege = c;
      }
      // ROI index: CTC / Fee
      const currentRoiRatio = c.placements.averageCTC / c.fees.totalCourseFeeLakhs;
      const bestRoiRatio = bestROICollege.placements.averageCTC / bestROICollege.fees.totalCourseFeeLakhs;
      if (currentRoiRatio > bestRoiRatio) {
        bestROICollege = c;
      }
    }

    // Generate AI Comparative Analysis
    const names = colleges.map((c) => c.shortName).join(" vs ");
    let verdict = "";
    
    if (colleges.some((c) => c.id === "fms-delhi")) {
      verdict = `When ${names} are matched against each other, **FMS Delhi** commands an undisputed lead in financial return with its nominal fee of ₹2.5L and top-tier ₹34.1L CTC. `;
    } else if (colleges.some((c) => c.id === "iim-ahmedabad")) {
      verdict = `In this matchup between ${names}, **IIM Ahmedabad** stands supreme in brand equity, premier MBB strategy consulting recruitment, and global executive mobility. `;
    } else if (colleges.some((c) => c.id === "xlri-jamshedpur")) {
      verdict = `Between ${names}, **XLRI Jamshedpur** offers unmatched supremacy for Human Resources and FMCG Brand Management, supported by its legendary 75-year alumni network. `;
    } else {
      verdict = `Comparing ${names}: Each institution provides distinct strategic advantages. **${highestPlacementCollege.shortName}** offers the highest earning velocity (₹${highestPlacementCollege.placements.averageCTC} LPA average), whereas **${bestROICollege.shortName}** minimizes education loan payback period. `;
    }

    const domainBreakdown = {
      finance: colleges.reduce((prev, curr) => 
        (curr.specializations.includes("Finance") && curr.placements.averageCTC > prev.placements.averageCTC) ? curr : prev
      ).shortName,
      consulting: colleges.reduce((prev, curr) => 
        (curr.specializations.includes("Consulting/Strategy") && curr.placements.averageCTC > prev.placements.averageCTC) ? curr : prev
      ).shortName,
      marketing: colleges.some(c => c.id === "sibm-pune" || c.id === "spjimr-mumbai" || c.id === "imt-ghaziabad")
        ? colleges.find(c => ["spjimr-mumbai", "sibm-pune", "fms-delhi", "imt-ghaziabad"].includes(c.id))?.shortName || colleges[0].shortName
        : colleges[0].shortName
    };

    return NextResponse.json({
      colleges,
      winners: {
        roiWinner: bestROICollege.shortName,
        placementWinner: highestPlacementCollege.shortName,
        lowestFeeWinner: lowestFeeCollege.shortName,
      },
      domainBreakdown,
      aiVerdict: verdict,
    });
  } catch (error) {
    console.error("Compare API Error:", error);
    return NextResponse.json({ error: "Failed to compare colleges" }, { status: 500 });
  }
}
