"use server";

import db from "@/lib/db";
import { cookies } from "next/headers";
import { getQuestionById } from "./questions.action";
import { z } from "zod";
import { AnswerSchema } from "@/lib/schemas";

export const getQuestionsAnswered = async (userId: string) => {
    try {
        const questions = await db.answerHistory.findMany({
            where: {
                userId,
                status: true
            },
            select: {
                questionId: true
            }
        });

        return questions;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const checkAnsweredByUser = async (userId: string, questionId: string) => {
    try {
        const answer = await db.answerHistory.findFirst({
            where: {
                userId,
                questionId,
                status: true
            }
        });

        return !!answer;
    } catch (error) {
        console.error(error);
        return { error: 'Something went wrong while checking the answer.' };
    }
};

export const setQuestionAnswered = async (userId: string, questionId: string) => {
    try {
        const answer = await db.answerHistory.create({
            data: {
                userId,
                questionId,
                status: true,
            }
        });

        return answer;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const checkAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    try {
        const validatedValues = AnswerSchema.safeParse(values);

        if (!validatedValues.success) {
            return { error: 'Invalid fields.' }
        }

        const { id, choice } = validatedValues.data;

        const question = await getQuestionById(id);

        if (!question) {
            return { error: 'Question not found.' }
        }

        if (question.correctAnswer === Number(choice)) {
            const guest = cookies().get('guest_uid')?.value;

            if (!guest) {
                return { error: 'User not found.' }
            }

            setQuestionAnswered(guest, id);
        }

        return question.correctAnswer === Number(choice);
    } catch (error) {
        console.error(error);
        return { error: 'Something went wrong while checking the answer.' }
    }
}