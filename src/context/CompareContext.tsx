"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { COLLEGES_DATA } from "@/data/colleges";
import { College } from "@/types";

interface CompareContextType {
  compareIds: string[];
  comparedColleges: College[];
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nextbschool_compare");
      if (saved) {
        setCompareIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load compare list", e);
    }
  }, []);

  const saveToStorage = (ids: string[]) => {
    try {
      localStorage.setItem("nextbschool_compare", JSON.stringify(ids));
    } catch (e) {
      console.error("Failed to save compare list", e);
    }
  };

  const addToCompare = (id: string): boolean => {
    if (compareIds.includes(id)) {
      removeFromCompare(id);
      return false;
    }
    if (compareIds.length >= 3) {
      alert("You can compare up to 3 B-schools simultaneously. Please remove one first.");
      return false;
    }
    const updated = [...compareIds, id];
    setCompareIds(updated);
    saveToStorage(updated);
    setIsDrawerOpen(true);
    return true;
  };

  const removeFromCompare = (id: string) => {
    const updated = compareIds.filter((item) => item !== id);
    setCompareIds(updated);
    saveToStorage(updated);
  };

  const clearCompare = () => {
    setCompareIds([]);
    saveToStorage([]);
    setIsDrawerOpen(false);
  };

  const isComparing = (id: string) => compareIds.includes(id);

  const comparedColleges = compareIds
    .map((id) => COLLEGES_DATA.find((c) => c.id === id))
    .filter((c): c is College => Boolean(c));

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        comparedColleges,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
