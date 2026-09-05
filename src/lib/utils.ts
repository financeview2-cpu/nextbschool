import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyLakhs(amountInLakhs: number): string {
  if (!amountInLakhs && amountInLakhs !== 0) return "N/A";
  return `₹${amountInLakhs.toFixed(amountInLakhs % 1 === 0 ? 0 : 1)} Lakhs`;
}

export function formatCurrencyRupees(amountInRupees: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amountInRupees);
}

export function getCutoffBadgeColor(percentile: number): string {
  if (percentile >= 99) return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800";
  if (percentile >= 95) return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800";
  if (percentile >= 85) return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800";
  return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800";
}

export function calculateROIYears(totalFeesLakhs: number, medianCTCLakhs: number): number {
  if (medianCTCLakhs <= 0) return 0;
  // Approximating post-tax in-hand ~ 72% of CTC, expenses 30% of post-tax
  const annualSavingsLakhs = medianCTCLakhs * 0.72 * 0.7;
  return Number((totalFeesLakhs / (annualSavingsLakhs || 1)).toFixed(1));
}
