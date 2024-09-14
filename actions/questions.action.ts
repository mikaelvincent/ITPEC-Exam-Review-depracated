"use server";

import db from "@/lib/db";
import { cookies } from "next/headers";
import { getQuestionsAnswered } from "./answer.action";

export const getRandomQuestion = async (q_uid?: string | undefined) => {
    try {
        const cookieStore = cookies();
        const user = cookieStore.get('guest_uid')?.value;

        if (!user) {
            return null;
        }

        if(q_uid) {
            const question = await getQuestionById(q_uid);
            
            if (!question) return null;

            return question;
        }

        const answeredQuestions = await getQuestionsAnswered(user);

        if (!answeredQuestions || answeredQuestions.length === 0) {
            const newQuestion = await db.question.findFirst({
                orderBy: {
                    id: 'asc'
                },
                take: 1
            });
            
            return newQuestion;
        };

        const question = await db.question.findFirst({
            where: {
                id: {
                    notIn: answeredQuestions.map((q) => q.questionId)
                }
            },
            orderBy: {
                id: 'asc'
            },
            take: 1,
        });

        if (!question) return null;

        return question;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getQuestionById = async (id: string) => {
    try {
        const question = await db.question.findFirst({
            where: {
                id
            }
        });

        return question;
    } catch (error) {
        console.error(error);
        return null;
    }
};