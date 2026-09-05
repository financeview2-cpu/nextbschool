import { NextResponse } from "next/server";
import { COLLEGES_DATA } from "@/data/colleges";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const q = query.toLowerCase();

    // Check for specific college queries
    const matchedCollege = COLLEGES_DATA.find(
      (c) =>
        q.includes(c.shortName.toLowerCase()) ||
        q.includes(c.id) ||
        (c.city.toLowerCase() !== "delhi" && q.includes(c.city.toLowerCase()))
    );

    let reply = "";

    if (q.includes("roi") || q.includes("highest return") || q.includes("cheap") || q.includes("low fee")) {
      reply = `**Top High-ROI MBA Colleges in India:**
1. **FMS Delhi**: 2-year total fee is just **₹2.5 Lakhs**, with an average CTC of **₹34.1 LPA**. You recover your entire tuition in less than 2 months!
2. **JBIMS Mumbai**: Fees are **₹7 Lakhs** with average CTC of **₹28.02 LPA**.
3. **SJMSOM IIT Bombay**: Total fee around **₹16 Lakhs** with median package of **₹26.6 LPA** (exclusively for engineers / science graduates).
4. **IIT Delhi DMS & IIT Kharagpur VGSOM**: Similar sub-₹15L fee with ₹25L+ average packages.`;
    } else if (matchedCollege) {
      reply = `**${matchedCollege.name} (${matchedCollege.shortName}) Overview:**
• **NIRF 2024 Rank:** #${matchedCollege.nirfRank2024}
• **Total Fees:** ₹${matchedCollege.fees.totalCourseFeeLakhs} Lakhs (Tuition + Hostel)
• **Placements:** Average CTC ₹${matchedCollege.placements.averageCTC} LPA | Median CTC ₹${matchedCollege.placements.medianCTC} LPA | Highest ₹${matchedCollege.placements.highestDomesticCTC} LPA
• **Exam Cutoff:** ${matchedCollege.cutoffs.map(co => `${co.exam}: ${co.general}+ %ile`).join(", ")}
• **AI Insight:** ${matchedCollege.aiSummary.verdict}
• **Best For:** ${matchedCollege.aiSummary.bestSuitedFor}`;
    } else if (q.includes("90 percentile") || q.includes("90%ile") || q.includes("92 percentile") || q.includes("85 percentile")) {
      reply = `**What can you get with 85-93 Percentile in CAT/XAT?**
• **Top Tier-1 & Tier-2 Calls:**
  - **SPJIMR Mumbai**: If you have an outstanding profile (90%+ in 10th/12th, state-level sports/extracurriculars, or 2+ yrs work ex), you can get a profile-based interview call starting at **85 percentile**!
  - **MDI Gurgaon**: Shortlists open around 95-96 %ile.
  - **IMT Ghaziabad**: Flagship PGDM Marketing calls at 90+ percentile.
  - **Great Lakes Chennai**: 85+ percentile in CAT/XAT/CMAT (PGPM 1-year is great for experienced folks).
  - **GIM Goa & TAPMI Manipal**: Calls at 85+ percentile in CAT/XAT.
  - **New/Baby IIMs (CAP)**: Reserved category (NC-OBC/SC/ST/EWS) candidates receive calls comfortably in this range.`;
    } else if (q.includes("marketing") || q.includes("best for marketing")) {
      reply = `**Best B-Schools for Marketing & Brand Management in India:**
1. **IIM Ahmedabad & IIM Calcutta**: Top consumer brands like HUL, P&G, Mondelez, ITC hire Management Trainees here.
2. **FMS Delhi**: Renowned as the FMCG Mecca of India with legendary marketing alumni.
3. **SPJIMR Mumbai**: Specializes candidates in Marketing right from day one; high PPO conversion rate.
4. **SIBM Pune**: Dominates national brand case competitions (HUL L.I.M.E, ITC Interrobang).
5. **IMT Ghaziabad**: Premier Tier-2 marketing destination with immense FMCG hiring.`;
    } else if (q.includes("finance") || q.includes("investment banking")) {
      reply = `**Top B-Schools for Investment Banking & Corporate Finance:**
1. **IIM Calcutta**: Uncontested #1 finance campus in India. Bulge-bracket banks (Goldman Sachs, Morgan Stanley, Avendus, Barclays) hire front-office analysts.
2. **IIM Ahmedabad & Bangalore**: Private Equity, Venture Capital, and high-finance leadership roles.
3. **JBIMS Mumbai**: Located near Dalal Street with extensive foreign bank recruitments.
4. **SPJIMR Mumbai & XLRI Jamshedpur**: Strong Corporate Treasury and Private Wealth roles.`;
    } else if (q.includes("non engineer") || q.includes("engineer") || q.includes("academic diversity")) {
      reply = `**Engineering vs Non-Engineering in MBA Admissions:**
Most top IIMs award **2 to 5 academic diversity marks** to non-engineers (Arts, Commerce, Science, Medicine, Law) during initial shortlisting. 
• A General Engineer Male (GEM) typically needs **99.5+ percentile** in CAT for IIM A/B/C/L.
• A Non-Engineer (Arts/Commerce/BBA) can often receive interview calls for IIM Kozhikode, Indore, or Ahmedabad starting around **97.5 - 98.5 percentile** if 10th and 12th scores are above 85%.`;
    } else {
      reply = `Based on Indian MBA admissions standards for 2024-2025:
• **CAT 2024**: Required for all 21 IIMs, FMS Delhi, SPJIMR, MDI Gurgaon, and IITs.
• **XAT 2025**: Gateway to XLRI Jamshedpur, XLRI Delhi, XIMB, and IMT.
• **SNAP 2024**: Single exam for 16 Symbiosis institutes including SIBM Pune and SCMHRD.
• **NMAT**: Exam window format with 3 retake attempts, required for NMIMS Mumbai.

For personalized college recommendations, use our **AI College Predictor** tab, where we evaluate your 10th, 12th, graduation, category, and entrance percentiles!`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI Counselor Error:", error);
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}
