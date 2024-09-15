import prisma from '@/lib/db';
import { getQuestionsAnswered } from './answerService';
import { Question } from '@prisma/client';

/**
 * Retrieves a random question that the user has not answered correctly yet.
 *
 * @param userId - The ID of the user.
 * @param questionId - Optional specific question ID to retrieve.
 * @returns A question object or null if no questions are available.
 */
export const getRandomQuestion = async (
  userId: string,
  questionId?: string
): Promise<Question | null> => {
  try {
    if (questionId) {
      const question = await prisma.question.findUnique({
        where: { id: questionId },
      });
      return question;
    }

    const answeredQuestionIds = await getQuestionsAnswered(userId);

    const question = await prisma.question.findFirst({
      where: {
        id: { notIn: answeredQuestionIds },
      },
      orderBy: { id: 'asc' },
    });

    return question;
  } catch (error) {
    console.error('Error fetching random question:', error);
    throw new Error('Failed to fetch random question');
  }
};

/**
 * Retrieves a question by its ID.
 *
 * @param id - The ID of the question.
 * @returns A question object or null if not found.
 */
export const getQuestionById = async (id: string): Promise<Question | null> => {
  try {
    const question = await prisma.question.findUnique({
      where: { id },
    });
    return question;
  } catch (error) {
    console.error('Error fetching question by ID:', error);
    throw new Error('Failed to fetch question by ID');
  }
};
