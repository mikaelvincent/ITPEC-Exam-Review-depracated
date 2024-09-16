'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import ChoiceCard from './ChoiceCard';
import Form from '@/components/ui/Form/Form';
import { ScrollArea } from '@/components/ui/ScrollArea';
import Alert from '@/components/common/Alert';
import { AnswerSchema } from '@/lib/schemas';
import { checkAnswer, checkAnsweredByUser } from '@/services/answerService';
import { useToast } from '@/hooks/useToast';
import { Question } from '@prisma/client';
import { CheckIcon, LoaderIcon } from 'lucide-react';

interface ChoicesProps {
  question: Question;
  selectedChoice?: string | null;
  userId?: string;
}

const Choices: React.FC<ChoicesProps> = ({ question, selectedChoice, userId }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isCorrect, setIsCorrect] = useState(false);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      id: question.id,
      choice: selectedChoice ?? '',
    },
  });

  useEffect(() => {
    setIsCorrect(false);
    form.reset({
      id: question.id,
      choice: selectedChoice ?? '',
    });

    if (userId && question.id) {
      checkAnsweredByUser(userId, question.id)
        .then((res) => {
          if (res) {
            setIsCorrect(true);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        });
    }
  }, [userId, question.id, form, selectedChoice, toast]);

  const onSubmit = (values: z.infer<typeof AnswerSchema>) => {
    startTransition(() => {
      checkAnswer(values)
        .then((res) => {
          if (res === true) {
            setIsCorrect(true);
            toast({
              title: 'Correct Answer',
              description: 'Congratulations! You have answered correctly.',
            });
          } else if (res === false) {
            toast({
              variant: 'destructive',
              title: 'Incorrect Answer',
              description: 'Sorry, that is not the correct answer.',
            });
          } else if (res.error) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: res.error,
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
  };

  const formattedChoices = question.questionChoices.map((choiceText, index) => ({
    indicator: index.toString(),
    choice: choiceText,
  }));

  return (
    <Form {...form}>
      {isCorrect && (
        <Alert
          questionId={question.id}
          answer={form.getValues('choice')}
          content={question.questionChoices[question.correctAnswer]}
        />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-4">
        <ScrollArea className="w-full h-72 md:h-80 lg:h-fit px-1 pb-5">
          {formattedChoices.map((choice, index) => (
            <ChoiceCard
              key={index}
              indicator={choice.indicator}
              disabled={isLoading || isPending || isCorrect}
              setFormChoice={(choice) => form.setValue('choice', choice)}
            />
          ))}
        </ScrollArea>
        <div className="w-full flex items-center gap-x-4 px-2.5">
          <Button
            type="submit"
            disabled={isLoading || isPending || isCorrect}
            size="large"
            className="w-full h-14 rounded-md"
          >
            {isPending ? (
              <span className="flex items-center gap-x-1.5">
                <LoaderIcon className="h-5 w-5 animate-spin" />
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-x-1.5">
                <CircleCheckIcon className="h-5 w-5" />
                Submit Answer
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Choices;
