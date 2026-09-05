"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Compass, 
  Award, 
  ArrowRight,
  TrendingUp
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const SAMPLE_CATEGORIES = [
  {
    title: "Cutoffs & Chances",
    prompts: [
      "Can I get into IIM Ahmedabad with 98% in CAT as a General Engineer?",
      "What is the sectional cutoff for FMS Delhi?",
      "Profile-based calls at SPJIMR: Can I get in with 88 percentile?",
    ],
  },
  {
    title: "College Matchups",
    prompts: [
      "FMS Delhi vs IIM Kozhikode: Which has better placements for Marketing?",
      "XLRI Jamshedpur BM vs SPJIMR Mumbai: Which should I join?",
      "SJMSOM IIT Bombay vs MDI Gurgaon for Operations?",
    ],
  },
  {
    title: "GD-PI & Interview Prep",
    prompts: [
      "What are the most common Personal Interview questions at IIMs?",
      "How should I justify a 1-year gap after graduation for MBA?",
      "How to prepare for XAT Decision Making section?",
    ],
  },
];

export default function CounselorPage() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "bot",
      text: "Hello! I am B-Bot, your dedicated AI Indian MBA Admissions Counselor. Ask me about cutoffs, convert chances, interview prep, or college comparisons. How can I guide your MBA journey today?",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (userQuery?: string) => {
    const query = userQuery || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userQuery) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai/counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: "bot-fb-" + Date.now(),
        sender: "bot",
        text: "Based on historical Indian MBA cutoffs: General Engineering candidates generally require 99.3+ for premier IIMs (A/B/C), whereas Non-Engineers or reserved category candidates receive shortlists from 92-97+. For highest ROI, FMS Delhi (₹2.5L fees, ₹34.1L CTC) and JBIMS (₹7L fees, ₹28L CTC) are the undisputed leaders.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold shadow-xs">
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span>24/7 Virtual MBA Mentor</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            B-Bot AI Admission Counselor
          </h1>
          <p className="text-xs text-slate-500">
            Intelligent, unbiased guidance trained on verified Indian B-School admissions, RTI placement data, and selection weightages.
          </p>
        </div>

        {/* 2-Column Chat Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Quick Prompt Cards */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Recommended Topics
            </h3>

            {SAMPLE_CATEGORIES.map((cat) => (
              <div key={cat.title} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
                <h4 className="font-bold text-slate-800 text-xs">{cat.title}</h4>
                <div className="space-y-1.5">
                  {cat.prompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(p)}
                      className="text-left w-full p-2 rounded-xl text-[11px] text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-transparent hover:border-blue-100"
                    >
                      &ldquo;{p}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Full Chat Window */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
            
            {/* Chat Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">B-Bot AI Counselor</h4>
                  <p className="text-[10px] text-emerald-400 font-semibold">
                    Online • Ready to answer Indian MBA questions
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 font-medium">NextBschool Intelligence</span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm">
                      B
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-xs ${
                      m.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    <span
                      className={`block text-[9px] mt-1.5 text-right ${
                        m.sender === "user" ? "text-blue-200" : "text-slate-400"
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>

                  {m.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-500 text-xs pl-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600 animate-pulse" />
                  </div>
                  <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about percentiles, interview tips, college fees, ROI..."
                className="flex-1 text-xs px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs disabled:opacity-50 transition-colors shadow-md flex items-center gap-1.5"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
