import { ExamInfo } from "@/types";

export const EXAMS_DATA: ExamInfo[] = [
  {
    id: "cat",
    name: "Common Admission Test",
    shortName: "CAT 2024",
    conductingBody: "IIM Calcutta (Rotational across IIMs)",
    examDate: "November 24, 2024",
    registrationDeadline: "September 20, 2024",
    resultsDate: "Second week of January 2025",
    acceptedByCollegesCount: 1200,
    mode: "Computer Based Test (CBT)",
    durationMinutes: 120,
    applicationFee: 2400,
    sections: [
      { name: "Verbal Ability & Reading Comprehension (VARC)", questions: 24, timeLimitMinutes: 40 },
      { name: "Data Interpretation & Logical Reasoning (DILR)", questions: 22, timeLimitMinutes: 40 },
      { name: "Quantitative Ability (QA)", questions: 22, timeLimitMinutes: 40 }
    ],
    markingScheme: "+3 for correct MCQ/TITA, -1 for wrong MCQ, 0 for wrong TITA",
    topCollegesAccepting: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "FMS Delhi", "SPJIMR Mumbai", "IIM Lucknow", "IIT Bombay", "MDI Gurgaon"],
    status: "Exam Over",
    officialWebsite: "https://iimcat.ac.in"
  },
  {
    id: "xat",
    name: "Xavier Aptitude Test",
    shortName: "XAT 2025",
    conductingBody: "XLRI Jamshedpur",
    examDate: "January 5, 2025",
    registrationDeadline: "November 30, 2024",
    resultsDate: "Third week of January 2025",
    acceptedByCollegesCount: 250,
    mode: "Computer Based Test (CBT)",
    durationMinutes: 210,
    applicationFee: 2200,
    sections: [
      { name: "Verbal & Logical Ability (VA & LR)", questions: 26, timeLimitMinutes: 175 },
      { name: "Decision Making (DM)", questions: 22, timeLimitMinutes: 175 },
      { name: "Quantitative Ability & Data Interpretation (QA & DI)", questions: 28, timeLimitMinutes: 175 },
      { name: "General Knowledge & Essay Writing", questions: 25, timeLimitMinutes: 30 }
    ],
    markingScheme: "+1 for correct, -0.25 for wrong MCQ, -0.10 for unattempted beyond 8 questions",
    topCollegesAccepting: ["XLRI Jamshedpur", "XLRI Delhi-NCR", "SPJIMR Mumbai", "XIMB", "IMT Ghaziabad", "TAPMI", "GIM Goa", "Great Lakes"],
    status: "Registration Open",
    officialWebsite: "https://xatonline.in"
  },
  {
    id: "nmat",
    name: "NMIMS Management Aptitude Test",
    shortName: "NMAT by GMAC",
    conductingBody: "Graduate Management Admission Council (GMAC)",
    examDate: "November 5 - December 20, 2024 (Exam Window)",
    registrationDeadline: "October 10, 2024",
    resultsDate: "Instant score on test day; official scorecard in 48 hours",
    acceptedByCollegesCount: 65,
    mode: "Computer Adaptive Test (CBT)",
    durationMinutes: 120,
    applicationFee: 3000,
    sections: [
      { name: "Language Skills", questions: 36, timeLimitMinutes: 28 },
      { name: "Quantitative Skills", questions: 36, timeLimitMinutes: 52 },
      { name: "Logical Reasoning", questions: 36, timeLimitMinutes: 40 }
    ],
    markingScheme: "+3 for correct, NO negative marking (adaptive algorithm)",
    topCollegesAccepting: ["NMIMS Mumbai", "NMIMS Bangalore", "K J Somaiya", "TAPMI (HR)", "XIM University", "SDA Bocconi Asia Center"],
    status: "Registration Open",
    officialWebsite: "https://www.mba.com/exams/nmat"
  },
  {
    id: "snap",
    name: "Symbiosis National Aptitude Test",
    shortName: "SNAP 2024",
    conductingBody: "Symbiosis International (Deemed University)",
    examDate: "December 8, 15, and 21, 2024 (3 test slots)",
    registrationDeadline: "November 22, 2024",
    resultsDate: "Second week of January 2025",
    acceptedByCollegesCount: 16,
    mode: "Computer Based Test (Speed Test)",
    durationMinutes: 60,
    applicationFee: 2250,
    sections: [
      { name: "General English (Reading Comprehension, Verbal Reasoning)", questions: 15, timeLimitMinutes: 60 },
      { name: "Analytical & Logical Reasoning", questions: 25, timeLimitMinutes: 60 },
      { name: "Quantitative, Data Interpretation & Data Sufficiency", questions: 20, timeLimitMinutes: 60 }
    ],
    markingScheme: "+1 for correct, -0.25 for incorrect answer",
    topCollegesAccepting: ["SIBM Pune", "SCMHRD Pune", "SIIB Pune", "SIBM Bangalore", "SCIT Pune"],
    status: "Registration Open",
    officialWebsite: "https://snaptest.org"
  },
  {
    id: "cmat",
    name: "Common Management Admission Test",
    shortName: "CMAT 2025",
    conductingBody: "National Testing Agency (NTA)",
    examDate: "May 2025 (Tentative)",
    registrationDeadline: "March 2025",
    resultsDate: "June 2025",
    acceptedByCollegesCount: 1000,
    mode: "Computer Based Test",
    durationMinutes: 180,
    applicationFee: 2000,
    sections: [
      { name: "Quantitative Techniques and Data Interpretation", questions: 20, timeLimitMinutes: 180 },
      { name: "Logical Reasoning", questions: 20, timeLimitMinutes: 180 },
      { name: "Language Comprehension", questions: 20, timeLimitMinutes: 180 },
      { name: "General Awareness", questions: 20, timeLimitMinutes: 180 },
      { name: "Innovation & Entrepreneurship", questions: 20, timeLimitMinutes: 180 }
    ],
    markingScheme: "+4 for correct, -1 for wrong response",
    topCollegesAccepting: ["JBIMS Mumbai", "SIMSREE Mumbai", "Great Lakes Chennai", "GIM Goa", "K J Somaiya", "PUMBA"],
    status: "Upcoming",
    officialWebsite: "https://cmat.nta.nic.in"
  },
  {
    id: "mah-cet",
    name: "Maharashtra Common Entrance Test (MBA/MMS)",
    shortName: "MAH MBA CET 2025",
    conductingBody: "State Common Entrance Test Cell, Maharashtra",
    examDate: "March 2025 (Tentative)",
    registrationDeadline: "February 2025",
    resultsDate: "April 2025",
    acceptedByCollegesCount: 330,
    mode: "Computer Based Online Test",
    durationMinutes: 150,
    applicationFee: 1200,
    sections: [
      { name: "Logical Reasoning", questions: 75, timeLimitMinutes: 150 },
      { name: "Abstract Reasoning", questions: 25, timeLimitMinutes: 150 },
      { name: "Quantitative Aptitude", questions: 50, timeLimitMinutes: 150 },
      { name: "Verbal Ability / Reading Comprehension", questions: 50, timeLimitMinutes: 150 }
    ],
    markingScheme: "+1 for correct, NO negative marking",
    topCollegesAccepting: ["JBIMS Mumbai", "SIMSREE Mumbai", "PUMBA Pune", "Welingkar Mumbai", "SIES Mumbai"],
    status: "Upcoming",
    officialWebsite: "https://cetcell.mahacet.org"
  }
];
