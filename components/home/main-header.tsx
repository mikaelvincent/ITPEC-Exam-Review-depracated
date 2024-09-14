import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { BookOpenCheckIcon, CoinsIcon } from 'lucide-react'

const MainHeader = () => {
    return (
        <section className="py-32 flex flex-col items-center justify-center gap-8">
            <p className="text-neutral-600 dark:text-neutral-200 text-sm md:text-base xl:text-xl">
                The journey of passing your exams starts here
            </p>
            <section className="text-center text-5xl sm:text-6xl lg:text-7xl font-medium flex flex-col gap-5">
                <h1>Review With</h1>
                <span className="text-5xl sm:text-7xl md:text-8xl text-green-500 font-bold">AI Guidance</span>
            </section>
            <section className="w-full max-w-sm flex items-center gap-x-5 justify-center px-3">
                <Link href="/review" className='w-56 transition-all duration-300'>
                    <Button size='lg' className="w-full hover:scale-[1.025] hover:shadow-md hover:shadow-gray-500 bg-blue-500 hover:bg-blue-500/90 h-14 text-sm md:text-base lg:text-lg rounded-lg hover:rounded-xl transition-all duration-300 flex items-center gap-x-1.5">
                        <BookOpenCheckIcon className="h-5 w-5 flex-shrink-0" />
                        Start Review
                    </Button>
                </Link>
                <Link href="/#pricing" className='w-56 transition-all duration-300'>
                    <Button size='lg' className="h-14 hover:scale-[1.025] w-full hover:shadow-md hover:shadow-gray-500 bg-orange-500 hover:bg-orange-500/90 text-sm md:text-base lg:text-lg rounded-lg hover:rounded-xl transition-all duration-300 flex items-center gap-x-1.5">
                        <CoinsIcon className="h-5 w-5 flex-shrink-0" />
                        See Pricing
                    </Button>
                </Link>
            </section>
        </section>
    )
}

export default MainHeader