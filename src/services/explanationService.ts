import prisma from '@/lib/db';
import { ExplanationSchema } from '@/lib/schemas';
import { z } from 'zod';
import { formatExplanation } from '@/lib/utils';

/**
 * Retrieves the AI-generated explanation for a given question.
 *
 * @param values - The data containing the question ID.
 * @returns The explanation object with formatted explanation text.
 */
export const getAIExplanation = async (values: z.infer<typeof ExplanationSchema>) => {
  try {
    const { questionId } = ExplanationSchema.parse(values);

    const explanation = await prisma.explanation.findUnique({
      where: { questionId },
    });

    if (!explanation) {
      throw new Error('Explanation not found.');
    }

    explanation.explanation = formatExplanation(explanation.explanation);

    return explanation;
  } catch (error) {
    console.error('Error fetching AI explanation:', error);
    throw new Error(error.message || 'Failed to fetch AI explanation');
  }
};
