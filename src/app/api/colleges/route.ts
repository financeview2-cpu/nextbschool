import { NextResponse } from "next/server";
import { COLLEGES_DATA } from "@/data/colleges";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const exam = searchParams.get("exam")?.toUpperCase() || "";
  const city = searchParams.get("city")?.toLowerCase() || "";
  const maxFee = searchParams.get("maxFee") ? parseFloat(searchParams.get("maxFee")!) : null;
  const ownership = searchParams.get("ownership") || "";
  const sortBy = searchParams.get("sortBy") || "nirf"; // nirf, ctc, fees, rating

  let results = [...COLLEGES_DATA];

  // Search filter
  if (search) {
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.shortName.toLowerCase().includes(search) ||
        c.city.toLowerCase().includes(search) ||
        c.state.toLowerCase().includes(search) ||
        c.specializations.some((s) => s.toLowerCase().includes(search))
    );
  }

  // Exam filter
  if (exam) {
    results = results.filter((c) =>
      c.cutoffs.some((co) => co.exam.toUpperCase() === exam)
    );
  }

  // City filter
  if (city) {
    const cityQuery = city.toLowerCase();
    results = results.filter((c) => {
      const cCity = c.city.toLowerCase();
      const cState = c.state.toLowerCase();
      if (cCity.includes(cityQuery) || cState.includes(cityQuery)) return true;
      if (cityQuery === "bangalore" && (cCity.includes("bengaluru") || cCity.includes("bangalore"))) return true;
      if (cityQuery === "bengaluru" && (cCity.includes("bengaluru") || cCity.includes("bangalore"))) return true;
      if (cityQuery.includes("delhi") && (cState.includes("delhi") || cCity.includes("delhi") || cCity.includes("gurugram") || cCity.includes("noida") || cCity.includes("ghaziabad"))) return true;
      if ((cityQuery === "ahmedabad" || cityQuery === "ahemdabaad") && (cCity.includes("ahmedabad") || cCity.includes("ahemdabaad"))) return true;
      return false;
    });
  }

  // Max Fee filter
  if (maxFee) {
    results = results.filter((c) => c.fees.totalCourseFeeLakhs <= maxFee);
  }

  // Ownership filter
  if (ownership) {
    results = results.filter((c) => c.ownership.toLowerCase() === ownership.toLowerCase());
  }

  // Sort
  if (sortBy === "nirf") {
    results.sort((a, b) => a.nirfRank2024 - b.nirfRank2024);
  } else if (sortBy === "ctc") {
    results.sort((a, b) => b.placements.averageCTC - a.placements.averageCTC);
  } else if (sortBy === "fees-low") {
    results.sort((a, b) => a.fees.totalCourseFeeLakhs - b.fees.totalCourseFeeLakhs);
  } else if (sortBy === "rating") {
    results.sort((a, b) => b.overallRating - a.overallRating);
  }

  return NextResponse.json({
    total: results.length,
    colleges: results,
  });
}
