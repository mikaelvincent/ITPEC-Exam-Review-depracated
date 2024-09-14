import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatExplanation(explanation: string) {
  return explanation
    .replace(/\\times/g, '×')
    .replace(/\^/g, '**')  // Example: replace power symbol if necessary
    .replace(/\\/g, '')     // Removing backslashes for LaTeX symbols
    .replace(/\n/g, '<br/>'); // Optional: replace newlines with <br/> for HTML
}