"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ShortlistContextType {
  shortlistIds: string[];
  toggleShortlist: (id: string) => void;
  isShortlisted: (id: string) => boolean;
  shortlistCount: number;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [shortlistIds, setShortlistIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nextbschool_shortlist");
      if (saved) {
        setShortlistIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load shortlist", e);
    }
  }, []);

  const toggleShortlist = (id: string) => {
    setShortlistIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("nextbschool_shortlist", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save shortlist", e);
      }
      return updated;
    });
  };

  const isShortlisted = (id: string) => shortlistIds.includes(id);

  return (
    <ShortlistContext.Provider
      value={{
        shortlistIds,
        toggleShortlist,
        isShortlisted,
        shortlistCount: shortlistIds.length,
      }}
    >
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const context = useContext(ShortlistContext);
  if (!context) {
    throw new Error("useShortlist must be used within a ShortlistProvider");
  }
  return context;
}
