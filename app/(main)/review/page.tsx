import { getRandomQuestion } from '@/actions/questions.action'
import Choices from '@/components/exams/choices'
import Question from '@/components/exams/question'
import { Card } from '@/components/ui/card'
import { BotIcon, FrownIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import React from 'react'

type ExamsPageProps = {
    searchParams: {
        choice: string
        q_id: string
    }
}

const ExamsPage = async ({ searchParams: { choice, q_id } }: ExamsPageProps) => {
    const selectedChoice = choice ? choice : null
    const user = cookies().get('guest_uid')?.value;
    const question = await getRandomQuestion(q_id);

    return (
        <div className='w-full max-w-5xl mx-auto space-y-4 py-8 px-5 md:py-0'>
            <section className='w-full flex justify-between items-end border-b border-gray-700'>
                <h1 className='text-xl md:text-3xl font-bold flex items-center justify-center gap-x-1.5 py-1'>
                    <BotIcon className='hidden md:block h-9 w-9 flex-shrink-0' />
                    PhilNits FE Reviewer
                </h1>
                <div className='hidden bg-gray-700 h-10 w-32 md:w-40 rounded-t-2xl font-semibold md:flex items-center justify-center text-muted text-sm md:text-base' />
            </section>
            <div className='w-full flex-1 flex flex-col md:flex-row justify-between items-center'>
                {question ? (
                    <>
                        <Question id={question.id} text={question.questionText} imageUrl={question.questionImageUrl} />
                        <Choices data={question} paramChoice={selectedChoice} userId={user} />
                    </>
                ) : (
                    <Card className='h-96 w-full p-8 md:p-16 space-y-5'>
                        <h1 className='text-muted-foreground text-3xl text-center font-semibold mx-auto bg-white'>No questions available.</h1>
                        <FrownIcon className='h-40 w-40 mx-auto text-muted-foreground' />
                    </Card>
                )}
            </div>
        </div>
    )
}

export default ExamsPage