'use server'

import db from "@/lib/db";
import { ExplanationSchema } from "@/lib/schemas";
import { formatExplanation } from "@/lib/utils";
import { z } from "zod";

export const getAIExplanation = async (values: z.infer<typeof ExplanationSchema>) => {
    try {
        const validatedValues = ExplanationSchema.safeParse(values);

        if (!validatedValues.success) {
            return null;
        }

        const { questionId } = validatedValues.data;

        const explanation = await db.explanation.findFirst({
            where: {
                questionId,
            },

        });

        if (!explanation) {
            return null;
        }

        explanation.explanation = formatExplanation(explanation.explanation);

        return explanation;
    } catch (error) {
        console.error(error);
        return null;
    }
}