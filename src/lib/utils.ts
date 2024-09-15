import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names using `clsx` and `tailwind-merge`.
 *
 * @param inputs - An array of class names or objects with conditional classes.
 * @returns A string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats AI explanations by replacing LaTeX symbols and formatting line breaks.
 *
 * @param explanation - The raw explanation string from the AI.
 * @returns A formatted explanation string suitable for rendering.
 */
export function formatExplanation(explanation: string): string {
  return explanation
    .replace(/\\times/g, '×')
    .replace(/\\frac{([^}]+)}{([^}]+)}/g, '$1⁄$2') // Simple fraction replacement
    .replace(/\\/g, '') // Remove remaining backslashes
    .replace(/\n/g, '<br/>'); // Convert newlines to HTML line breaks
}
