import prisma from '@/lib/db';
import { AnswerSchema } from '@/lib/schemas';
import { z } from 'zod';

/**
 * Retrieves a list of question IDs that the user has answered correctly.
 *
 * @param userId - The ID of the user.
 * @returns An array of question IDs.
 */
export const getQuestionsAnswered = async (userId: string) => {
  try {
    const answers = await prisma.answerHistory.findMany({
      where: {
        userId,
        status: true,
      },
      select: {
        questionId: true,
      },
    });
    return answers.map((answer) => answer.questionId);
  } catch (error) {
    console.error('Error fetching answered questions:', error);
    throw new Error('Failed to fetch answered questions');
  }
};

/**
 * Checks if a user has already answered a question correctly.
 *
 * @param userId - The ID of the user.
 * @param questionId - The ID of the question.
 * @returns A boolean indicating if the question has been answered correctly by the user.
 */
export const checkAnsweredByUser = async (userId: string, questionId: string) => {
  try {
    const answer = await prisma.answerHistory.findFirst({
      where: {
        userId,
        questionId,
        status: true,
      },
    });
    return !!answer;
  } catch (error) {
    console.error('Error checking if question was answered:', error);
    throw new Error('Failed to check if question was answered');
  }
};

/**
 * Marks a question as answered correctly by the user.
 *
 * @param userId - The ID of the user.
 * @param questionId - The ID of the question.
 * @returns The created AnswerHistory record.
 */
export const setQuestionAnswered = async (userId: string, questionId: string) => {
  try {
    const answer = await prisma.answerHistory.create({
      data: {
        userId,
        questionId,
        status: true,
      },
    });
    return answer;
  } catch (error) {
    console.error('Error setting question as answered:', error);
    throw new Error('Failed to set question as answered');
  }
};

/**
 * Validates and checks the user's answer to a question.
 *
 * @param values - The user's answer data.
 * @param userId - The ID of the user.
 * @returns A boolean indicating if the answer is correct.
 */
export const checkAnswer = async (
  values: z.infer<typeof AnswerSchema>,
  userId: string
) => {
  try {
    const { id: questionId, choice } = AnswerSchema.parse(values);

    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new Error('Question not found.');
    }

    const isCorrect = question.correctAnswer === parseInt(choice, 10);

    if (isCorrect) {
      await setQuestionAnswered(userId, questionId);
    }

    return isCorrect;
  } catch (error) {
    console.error('Error checking answer:', error);
    throw new Error(error.message || 'Failed to check answer');
  }
};
