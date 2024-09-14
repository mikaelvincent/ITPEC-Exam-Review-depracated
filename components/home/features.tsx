import { BookOpenTextIcon, BotIcon, ChartNoAxesCombinedIcon } from 'lucide-react'
import React, { PropsWithChildren } from 'react'

type FeatureCardProps = {
    title: string
    description: string
}

const FeatureCard = ({ title, description, children }: FeatureCardProps & PropsWithChildren) => {
    return (
        <div className='flex flex-col items-center justify-evenly max-w-xs mx-auto'>
            <h1 className='text-xl md:text-3xl font-semibold'>{title}</h1>
            {children}
            <p className='text-muted text-sm md:text-lg text-center'>{description}</p>
        </div>
    )
}

const Features = () => {
    return (
        <section className='w-full md:h-[500px] bg-slate-800'>
            <div className='h-full w-full max-w-5xl p-10 grid grid-cols-1 md:grid-cols-3 text-white gap-12 md:gap-8 m-auto'>
                <FeatureCard title='Get AI Help' description='Use our AI to ask about the question you are having trouble analyzing. Do not be afraid and just ask!'>
                    <BotIcon className='h-32 w-32 flex-shrink-0' />
                </FeatureCard>
                <FeatureCard title='Find Your Rank' description="After submitting, you can check where you stand in our leader boards. Go find your place!">
                    <ChartNoAxesCombinedIcon className='h-32 w-32 flex-shrink-0' />
                </FeatureCard>
                <FeatureCard title='Review and Learn' description='Take your time reading through the tests you took and study where and why you were wrong.'>
                    <BookOpenTextIcon className='h-32 w-32 flex-shrink-0' />
                </FeatureCard>
            </div>
        </section>
    )
}

export default Features