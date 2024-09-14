"use client";

import { getRandomQuestion } from '@/actions/questions.action';
import React, { useState, useTransition } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '../ui/button'
import { BotIcon, ChevronsRightIcon, LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReactConfetti from 'react-confetti';
import { getAIExplanation } from '@/actions/explanation.action';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ExplanationSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ScrollArea } from '../ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

type AlertProps = {
    questionId: string
    answer: string
    content: string
}

const Alert = ({ questionId, answer, content }: AlertProps) => {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof ExplanationSchema>>({
        resolver: zodResolver(ExplanationSchema),
        defaultValues: {
            questionId: questionId,
        }
    });
    const [isPending, startTransition] = useTransition();
    const [explanation, setExplanation] = useState("");

    const handleNextQuestion = () => {
        startTransition(() => {
            getRandomQuestion().then((next) => {
                if (next) {
                    router.replace(`/review?q_id=${next.id}`);
                } else {
                    router.replace('/review');
                }
            }).catch((error) => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.message,
                })
            });
        });
    };

    function onSubmit(values: z.infer<typeof ExplanationSchema>) {
        startTransition(() => {
            getAIExplanation(values)
                .then((res) => {
                    if (res) {
                        setExplanation(res.explanation);
                    } else {
                        toast({
                            variant: 'destructive',
                            title: 'Error',
                            description: 'Failed to get AI explanation',
                        });
                    }
                })
                .catch((error) => {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: error.message,
                    });
                });
        });
    }

    return (
        <AlertDialog open>
            <AlertDialogContent className='transition-all duration-300'>
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={250}
                    className='fixed inset-0 z-40 -translate-y-1/3 md:-translate-x-1/2 xl:-translate-x-1/3 transform top-0 left-0'
                />
                <AlertDialogHeader>
                    <AlertDialogTitle>Correct Answer: {String.fromCharCode(65 + parseInt(answer))}</AlertDialogTitle>
                    <ScrollArea className='flex flex-col items-center border border-muted-foreground rounded-lg shadow-md gap-5 transition-all duration-300 p-5'>
                        <AlertDialogDescription>
                            {explanation ? (
                                <span className='space-y-5'>
                                    <span className='flex items-center justify-center gap-x-1.5 text-accent-foreground font-semibold ml-2 text-lg '>
                                        <BotIcon className='h-5 w-5 flex-shrink-0' />
                                        [AI Explanation]
                                    </span>
                                    <span dangerouslySetInnerHTML={{ __html: explanation }} className='text-sm' />
                                </span>
                            ) : (
                                <span className='hover:font-semibold transition-all duration-300 text-left h-10'>{content}</span>
                            )}
                        </AlertDialogDescription>
                    </ScrollArea>
                </AlertDialogHeader>
                {isPending ? (
                    <div className='w-full flex items-center justify-center gap-x-2'>
                        <LoaderIcon className='h-5 w-5 animate-spin flex-shrink-0' />
                        Please wait...
                    </div>
                ) : (
                    <AlertDialogFooter className='flex flex-row justify-between gap-2'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                                <Button disabled={isPending} type='submit' className='w-full' variant='outline'>
                                    <span className='flex items-center gap-x-1.5'>
                                        <BotIcon className='h-5 w-5 flex-shrink-0' />
                                        <span className='hidden md:block'>{explanation ? "Regenerate Response" : "Get AI Explanation"}</span>
                                    </span>
                                </Button>
                            </form>
                        </Form>
                        <AlertDialogAction className='w-full' type='button' disabled={isPending} onClick={handleNextQuestion}>
                            <span className='flex items-center gap-x-1.5'>
                                <span className='hidden md:block'>Next Question</span>
                                <ChevronsRightIcon className='h-5 w-5 flex-shrink-0' />
                            </span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default Alert