import React from 'react';
import { cookies } from 'next/headers';
import { getRandomQuestion } from '@/services/questionService';
import Question from '@/components/exams/Question';
import Choices from '@/components/exams/Choices';
import { Card, CardContent } from '@/components/ui/Card';
import { BotIcon, FrownIcon } from 'lucide-react';

interface ReviewPageProps {
  searchParams: {
    choice?: string;
    q_id?: string;
  };
}

const ReviewPage: React.FC<ReviewPageProps> = async ({ searchParams }) => {
  const { choice = null, q_id } = searchParams;
  const userId = cookies().get('guest_uid')?.value;
  const question = await getRandomQuestion(q_id);

  return (
    <div className="max-w-5xl mx-auto py-8 px-5 space-y-4">
      <section className="flex justify-between items-end border-b border-gray-700">
        <h1 className="text-xl md:text-3xl font-bold flex items-center gap-x-1.5 py-1">
          <BotIcon className="hidden md:block h-9 w-9" />
          AI Review
        </h1>
        <div className="hidden md:flex items-center justify-center h-10 w-32 md:w-40 bg-gray-700 rounded-t-2xl font-semibold text-muted text-sm md:text-base" />
      </section>
      <div className="flex flex-col md:flex-row items-center justify-between">
        {question ? (
          <>
            <Question
              id={question.id}
              text={question.questionText}
              imageUrl={question.questionImageUrl}
            />
            <Choices question={question} selectedChoice={choice} userId={userId} />
          </>
        ) : (
          <Card className="w-full h-96 p-8 md:p-16 space-y-5">
            <CardContent className="text-center space-y-5">
              <h1 className="text-3xl font-semibold text-muted-foreground">
                No questions available.
              </h1>
              <FrownIcon className="w-40 h-40 mx-auto text-muted-foreground" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
