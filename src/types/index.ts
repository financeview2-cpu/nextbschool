export interface CollegeReview {
  id: string;
  authorName: string;
  batch: string; // e.g., "Batch of 2024"
  specialization: string; // e.g., "Finance", "Marketing"
  isVerifiedStudent: boolean;
  avatarUrl?: string;
  ratingOverall: number;
  ratingAcademics: number;
  ratingPlacements: number;
  ratingCampusLife: number;
  ratingInfrastructure: number;
  ratingROI: number;
  title: string;
  pros: string[];
  cons: string[];
  reviewText: string;
  placementExperience: string;
  likes: number;
  date: string;
}

export interface CollegeCutoff {
  exam: 'CAT' | 'XAT' | 'GMAT' | 'NMAT' | 'SNAP' | 'CMAT' | 'MAH-CET' | 'MAT' | 'MICAT' | 'ATMA' | string;
  general: number; // Percentile
  ncObc?: number;
  sc?: number;
  st?: number;
  ews?: number;
  sectionalCutoff?: {
    varc: number;
    dilr: number;
    qa: number;
  };
}

export interface PlacementStats {
  highestDomesticCTC: number; // in LPA
  highestInternationalCTC?: number; // in LPA
  averageCTC: number; // in LPA
  medianCTC: number; // in LPA
  topRecruiters: string[];
  placementRatePercent: number;
  topSectors: { sector: string; percentage: number }[];
  batchSize: number;
}

export interface FeeStructure {
  tuitionFeeLakhs: number;
  hostelFeeLakhs: number;
  totalCourseFeeLakhs: number;
  scholarshipsAvailable: boolean;
  scholarshipDetails: string;
}

export interface AdmissionCriteriaWeightage {
  entranceExam: number; // percentage weightage
  personalInterview: number;
  groupDiscussionOrWat: number;
  academicHistory: number; // 10th/12th/Grad
  workExperience: number;
  genderOrAcademicDiversity: number;
}

export interface College {
  id: string;
  name: string;
  shortName: string; // e.g., "IIM-A", "FMS", "XLRI"
  slug: string;
  city: string;
  state: string;
  nirfRank2024: number;
  establishedYear: number;
  ownership: 'Government' | 'Private' | 'Autonomous';
  campusAreaAcres: number;
  logoUrl: string;
  coverImageUrl: string;
  galleryImages: string[];
  accreditations: string[]; // e.g. "AACSB", "EQUIS", "AMBA", "NBA"
  degreesOffered: string[]; // e.g. "MBA", "PGDM", "Executive MBA"
  specializations: string[];
  fees: FeeStructure;
  placements: PlacementStats;
  cutoffs: CollegeCutoff[];
  admissionWeightage: AdmissionCriteriaWeightage;
  aiSummary: {
    verdict: string;
    keyPros: string[];
    keyCons: string[];
    bestSuitedFor: string;
    roiScoreOutOf10: number;
  };
  overallRating: number;
  reviewsCount: number;
  reviews: CollegeReview[];
  featured?: boolean;
}

export interface CandidateProfile {
  name?: string;
  targetYear: number;
  category: 'General' | 'NC-OBC' | 'SC' | 'ST' | 'EWS';
  gender: 'Male' | 'Female' | 'Other';
  academicStream: 'Engineering' | 'Commerce' | 'Arts/Humanities' | 'Science' | 'Management/BBA' | 'Other';
  score10th: number; // Percentage
  score12th: number; // Percentage
  scoreGrad: number; // Percentage
  workExperienceMonths: number;
  budgetMaxLakhs: number;
  preferredLocations?: string[];
  preferredSpecialization: 'Any' | 'Finance' | 'Marketing' | 'Consulting/Strategy' | 'Operations/Supply Chain' | 'Business Analytics' | 'HR';
  examScores: {
    cat?: number;
    xat?: number;
    nmat?: number;
    snap?: number;
    cmat?: number;
    gmat?: number;
  };
}

export interface PredictionResult {
  dreamColleges: { college: College; convertProbability: number; matchReasons: string[]; gapAnalysis: string }[];
  targetColleges: { college: College; convertProbability: number; matchReasons: string[]; gapAnalysis: string }[];
  safeColleges: { college: College; convertProbability: number; matchReasons: string[]; gapAnalysis: string }[];
  profileAnalysis: {
    compositeScore: number;
    diversityAdvantage: string;
    workExWeightageRemarks: string;
    suggestedFocusAreas: string[];
  };
}

export interface ExamInfo {
  id: string;
  name: string;
  shortName: string;
  conductingBody: string;
  examDate: string;
  registrationDeadline: string;
  resultsDate: string;
  acceptedByCollegesCount: number;
  mode: string;
  durationMinutes: number;
  applicationFee: number;
  sections: { name: string; questions: number; timeLimitMinutes: number }[];
  markingScheme: string;
  topCollegesAccepting: string[];
  status: 'Upcoming' | 'Registration Open' | 'Admit Card Out' | 'Exam Over' | 'Result Out';
  officialWebsite: string;
}
