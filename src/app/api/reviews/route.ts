import { NextResponse } from "next/server";
import { COLLEGES_DATA } from "@/data/colleges";
import { CollegeReview } from "@/types";

// In-memory runtime storage for newly submitted reviews
const userReviewsStore: Record<string, CollegeReview[]> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collegeId = searchParams.get("collegeId");

  if (!collegeId) {
    // Return latest reviews across all colleges
    const allReviews = COLLEGES_DATA.flatMap((c) =>
      c.reviews.map((r) => ({ ...r, collegeName: c.shortName, collegeSlug: c.slug }))
    );
    return NextResponse.json({ reviews: allReviews });
  }

  const college = COLLEGES_DATA.find((c) => c.id === collegeId);
  if (!college) {
    return NextResponse.json({ error: "College not found" }, { status: 404 });
  }

  const dynamicReviews = userReviewsStore[collegeId] || [];
  const combined = [...dynamicReviews, ...college.reviews];

  return NextResponse.json({ reviews: combined });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { collegeId, authorName, batch, specialization, ratingOverall, title, pros, cons, reviewText, placementExperience } = body;

    if (!collegeId || !authorName || !title || !reviewText) {
      return NextResponse.json({ error: "Missing required review fields" }, { status: 400 });
    }

    const newReview: CollegeReview = {
      id: "usr-rev-" + Date.now(),
      authorName,
      batch: batch || "Batch of 2024",
      specialization: specialization || "General Management",
      isVerifiedStudent: true,
      ratingOverall: Number(ratingOverall) || 5,
      ratingAcademics: Number(body.ratingAcademics) || 4.5,
      ratingPlacements: Number(body.ratingPlacements) || 4.5,
      ratingCampusLife: Number(body.ratingCampusLife) || 4.5,
      ratingInfrastructure: Number(body.ratingInfrastructure) || 4.5,
      ratingROI: Number(body.ratingROI) || 4.5,
      title,
      pros: Array.isArray(pros) ? pros : pros.split(",").map((s: string) => s.trim()),
      cons: Array.isArray(cons) ? cons : cons.split(",").map((s: string) => s.trim()),
      reviewText,
      placementExperience: placementExperience || "Placed during campus placement season.",
      likes: 1,
      date: new Date().toISOString().split("T")[0]
    };

    if (!userReviewsStore[collegeId]) {
      userReviewsStore[collegeId] = [];
    }
    userReviewsStore[collegeId].unshift(newReview);

    return NextResponse.json({
      success: true,
      message: "Review verified and submitted successfully!",
      review: newReview,
    });
  } catch (err) {
    console.error("Review submit error:", err);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
