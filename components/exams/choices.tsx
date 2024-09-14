"use client"

import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnswerSchema } from "@/lib/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Question } from "@prisma/client"
import { useEffect, useState, useTransition } from "react"
import { CircleCheckIcon, LoaderIcon } from "lucide-react"
import { checkAnswer, checkAnsweredByUser } from "@/actions/answer.action"
import { toast } from "sonner"
import ChoiceCard from "./choice-card"
import Alert from "../shared/alert"
import { ScrollArea } from "../ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

type ChoiceProps = {
    data: Question
    paramChoice?: string | null
    userId: string | undefined
}

export default function Choices({ data, paramChoice, userId }: ChoiceProps) {
    const { toast } = useToast();
    const questionChoices = Array.isArray(data.questionChoices) ? data.questionChoices : [];
    const formattedChoices = questionChoices.map((choice: string, index: number) => ({
        indicator: String(index),
        choice: choice,
    }));

    const [isLoading, setIsLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues: {
            id: data.id || '',
            choice: paramChoice ?? '',
        }
    });

    useEffect(() => {
        setSuccess(false);
        form.reset({
            id: data.id || '',
            choice: paramChoice ?? '',
        });

        if (userId && data.id) {
            checkAnsweredByUser(userId, data.id)
                .then((res) => {
                    if (res) {
                        setSuccess(true);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: error,
                    })
                });
        }
    }, [userId, data.id]);

    function onSubmit(values: z.infer<typeof AnswerSchema>) {
        startTransition(() => {
            checkAnswer(values)
                .then((res) => {
                    if (res) {
                        setSuccess(true);
                        toast({
                            title: 'Correct Answer',
                            description: 'Congratulations! You have answered the question correctly.',
                        });
                    } else if (!res) {
                        toast({
                            variant: 'destructive',
                            title: 'Incorrect Answer',
                            description: 'Sorry, you have answered the question incorrectly.',
                        });
                    } else {
                        toast({
                            variant: 'destructive',
                            title: 'Error',
                            description: 'An error occurred while checking the answer.',
                        });
                    }
                })
                .catch((error) => {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: error,
                    });
                });
        });
    }

    return (
        <Form {...form}>
            {success && (
                <>
                    <Alert
                        questionId={data.id}
                        answer={form.getValues('choice')}
                        content={data.questionChoices[data.correctAnswer]}
                    />
                </>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col items-center justify-center gap-4 md:gap-0'>
                <ScrollArea className="w-full h-72 md:h-80 lg:h-fit px-1 pb-5">
                    <FormField
                        control={form.control}
                        name="choice"
                        render={() => (
                            <FormItem className='space-y-1 flex-1'>
                                <FormLabel className='sr-only'>Name</FormLabel>
                                <FormControl>
                                    <div className="w-full h-full flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 px-2.5 py-2">
                                        {formattedChoices.map((choice, index) => (
                                            <ChoiceCard
                                                key={index}
                                                indicator={index.toString()}
                                                disabled={isLoading || isPending || success}
                                                setFormChoice={(choice) => form.setValue('choice', choice)}
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage className="flex items-center justify-center gap-x-1.5 text-base py-3 bg-red-100 rounded-full w-72 mx-auto" />
                            </FormItem>
                        )}
                    />
                </ScrollArea>
                <div className='w-full flex items-center gap-x-4 px-2.5'>
                    <Button type="submit" disabled={isLoading || isPending || success} size='lg' className='w-full h-14 text-lg rounded-md bg-blue-500 hover:bg-blue-500/80'>
                        {isPending ? (
                            <span className="flex items-center gap-x-1.5">
                                <LoaderIcon className="h-5 w-5 animate-spin flex-shrink-0" />
                                Submitting...
                            </span>
                        ) : (
                            <span className="flex items-center gap-x-1.5">
                                <CircleCheckIcon className="h-5 w-5 flex-shrink-0" />
                                Submit Answer
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </Form >
    )
}