import { z } from 'zod';

/**
 * Schema for validating answer submissions.
 */
export const AnswerSchema = z.object({
  id: z.number().nonnegative('Question ID is required'),
  choice: z.number().nonnegative('Choice index is required'),
});

/**
 * Schema for requesting AI explanations.
 */
export const ExplanationSchema = z.object({
  questionId: z.number().nonnegative('Question ID is required'),
});

/**
 * Schema for creating or validating user data.
 */
export const UserSchema = z.object({
  uid: z.string().nonempty('User UID is required'),
});

/**
 * Schema for validating question data.
 */
export const QuestionSchema = z.object({
  id: z.string().nonempty('Question ID is required'),
  questionText: z.string().nonempty('Question text is required'),
  questionImageUrl: z.string().url().nullable().optional(),
  questionChoices: z.array(z.string()).nonempty('Question choices are required'),
  correctAnswer: z.number().nonnegative('Correct answer index must be non-negative'),
});
