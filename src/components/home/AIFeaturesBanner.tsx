import React from "react";
import Link from "next/link";
import { Sparkles, Scale, MessageSquareQuote, Bot, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AIFeaturesBanner() {
  const features = [
    {
      icon: Sparkles,
      title: "AI MBA Predictor & Matcher",
      badge: "Real Composite Scoring",
      description:
        "Unlike generic predictors that only look at 1 exam score, our AI evaluates your 10th/12th/Grad scores, work experience, category, and academic diversity points to project realistic Dream, Target, and Safe colleges.",
      href: "/predictor",
      cta: "Run Predictor",
      color: "from-blue-600 to-indigo-600",
    },
    {
      icon: Scale,
      title: "3-Way AI College Comparison",
      badge: "Smart Head-to-Head",
      description:
        "Directly compare up to 3 B-Schools on 15+ real parameters: Tuition Fees, Median CTC, Batch Size, Placement Rate, and get an instant AI summary breaking down which college is best for Finance vs Marketing.",
      href: "/compare",
      cta: "Compare Colleges",
      color: "from-indigo-600 to-purple-600",
    },
    {
      icon: MessageSquareQuote,
      title: "AI Review Intelligence",
      badge: "Zero Fake Reviews",
      description:
        "Our AI reads through hundreds of verified student submissions to produce unfiltered Pros, Cons, and 'The Hard Truth' about hostel food, actual median packages vs brochure claims, and campus stress levels.",
      href: "/colleges#reviews",
      cta: "Read Reviews",
      color: "from-sky-600 to-blue-700",
    },
    {
      icon: Bot,
      title: "B-Bot 24/7 AI Counselor",
      badge: "Instant Guidance",
      description:
        "Get instant answers regarding GD-PI-WAT preparation, whether you can convert IIM with 92 percentile, interview questions asked at SPJIMR, or differences between PGDM and MBA.",
      href: "/counselor",
      cta: "Chat with B-Bot",
      color: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Next-Gen EdTech Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Aspirants Prefer <span className="text-blue-400">NextBschool AI</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Old portals trick you into entering your phone number to sell coaching leads. We built genuine AI tools to actually solve your admission dilemmas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-600 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-700/80 text-blue-300 border border-slate-600">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center justify-between">
                  <Link
                    href={feat.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>{feat.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
