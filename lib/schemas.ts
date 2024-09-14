import { z } from "zod";

export const AnswerSchema = z.object({
    id: z.string().min(1, { message: "Answer ID is required" }),
    choice: z.string().min(1, { message: "Choice is required" }).max(1, { message: "Choice must be a single character" }),
});

export const ExplanationSchema = z.object({
    questionId: z.string().min(1, { message: "Question ID is required" }),
});