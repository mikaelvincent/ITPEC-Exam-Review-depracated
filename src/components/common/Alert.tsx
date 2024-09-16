"use client";

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import ReactConfetti from 'react-confetti';
import { BotIcon, ChevronsRightIcon, LoaderIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/AlertDialog';
import Button from '@/components/ui/Button';
import { getRandomQuestion } from '@/services/questionService';
import { getAIExplanation } from '@/services/explanationService';
import { useToast } from '@/hooks/useToast'; // Updated hook

interface AlertProps {
  questionId: string;
  answer: string;
  content: string;
}

const Alert: React.FC<AlertProps> = ({ questionId, answer, content }) => {
  const router = useRouter();
  const { addToast } = useToast(); // Use addToast
  const [isPending, startTransition] = useTransition();
  const [explanation, setExplanation] = useState<string>('');

  const handleNextQuestion = () => {
    startTransition(() => {
      getRandomQuestion()
        .then((nextQuestion) => {
          if (nextQuestion) {
            router.replace(`/review?q_id=${nextQuestion.id}`);
          } else {
            router.replace('/review');
          }
        })
        .catch((error) => {
          addToast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        });
    });
  };

  const fetchExplanation = () => {
    startTransition(() => {
      getAIExplanation({ questionId })
        .then((res) => {
          if (res) {
            setExplanation(res.explanation);
          } else {
            addToast({
              title: 'Error',
              description: 'Failed to get AI explanation.',
              variant: 'destructive',
            });
          }
        })
        .catch((error) => {
          addToast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={250}
          className="fixed inset-0 z-40"
        />
        <AlertDialogHeader>
          <AlertDialogTitle>
            Correct Answer: {String.fromCharCode(65 + parseInt(answer, 10))}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {explanation ? (
              <div className="space-y-2">
                <div className="flex items-center text-lg font-semibold text-accent-foreground">
                  <BotIcon className="h-5 w-5 mr-2" />
                  AI Explanation
                </div>
                <div dangerouslySetInnerHTML={{ __html: explanation }} className="text-sm" />
              </div>
            ) : (
              <p>{content}</p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isPending ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="h-5 w-5 animate-spin mr-2" />
            Please wait...
          </div>
        ) : (
          <AlertDialogFooter className="flex justify-between">
            <Button variant="outline" onClick={fetchExplanation} disabled={isPending}>
              <BotIcon className="h-5 w-5 mr-2" />
              {explanation ? 'Regenerate Explanation' : 'Get AI Explanation'}
            </Button>
            <AlertDialogAction onClick={handleNextQuestion} disabled={isPending}>
              Next Question
              <ChevronsRightIcon className="h-5 w-5 ml-2" />
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
