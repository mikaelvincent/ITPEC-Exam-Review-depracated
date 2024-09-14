import React from 'react'
import { Button } from '../ui/button'
import { BadgeCheckIcon, BadgeXIcon, BirdIcon, CrownIcon } from 'lucide-react'
import PricingCard from './pricing-card'

const Pricing = () => {
    return (
        <section id="pricing" className="w-full max-w-5xl m-auto px-3 py-8 md:p-6 lg:p-9 flex flex-col items-start gap-5 justify-center">
            <h1 className="text-4xl md:text-6xl font-semibold">Pricing</h1>
            <p className="text-neutral-600 dark:text-neutral-200 text-base lg:text-lg xl:text-xl -mb-5">
                Choose a plan that suits your needs and budget.
            </p>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <PricingCard title='Basic' description='For students that want to use the website for mock exams.' price={0}>
                    <ul className='space-y-2 text-base lg:text-lg'>
                        <li className='flex items-center gap-x-1.5'>
                            <BadgeCheckIcon className='h-5 w-5 flex-shrink-0' />
                            Leader board checks
                        </li>
                        <li className='flex items-center gap-x-1.5'>
                            <BadgeCheckIcon className='h-5 w-5 flex-shrink-0' />
                            Unlimited test submissions
                        </li>
                        <li className='flex items-center gap-x-1.5 text-muted-foreground'>
                            <BadgeXIcon className='h-5 w-5 flex-shrink-0' />
                            Unlimited AI questions
                        </li>
                        <li className='flex items-center gap-x-1.5 text-muted-foreground'>
                            <BadgeXIcon className='h-5 w-5 flex-shrink-0' />
                            Student of honor wall
                        </li>
                    </ul>
                    <Button size='lg' className='w-full h-14 text-xl flex items-center gap-x-2'>
                        <BirdIcon className='h-6 w-6 flex-shrink-0' />
                        Free Tier
                    </Button>
                </PricingCard>
                <PricingCard title='Pro' description='For individuals that want to experience premium features with AI.' price={50}>
                    <ul className='space-y-2 text-base lg:text-lg'>
                        <li className='flex items-center gap-x-1.5'>
                            <BadgeCheckIcon className='h-5 w-5 flex-shrink-0' />
                            Leader board checks
                        </li>
                        <li className='flex items-center gap-x-1.5'>
                            <BadgeCheckIcon className='h-5 w-5 flex-shrink-0' />
                            Unlimited test submissions
                        </li>
                        <li className='flex items-center gap-x-1.5'>
                            <BadgeCheckIcon className='h-5 w-5 flex-shrink-0' />
                            Unlimited AI questions
                        </li>
                        <li className='flex items-center gap-x-1.5'>
                            <BadgeCheckIcon className='h-5 w-5 flex-shrink-0' />
                            Student of honor wall
                        </li>
                    </ul>
                    <Button size='lg' className='w-full h-14 text-xl flex items-center gap-x-2'>
                        <CrownIcon className='h-5 w-5 flex-shrink-0' />
                        Premium <span className='hidden md:block'>Features</span>
                    </Button>
                </PricingCard>
            </section>
        </section>
    )
}


export default Pricing