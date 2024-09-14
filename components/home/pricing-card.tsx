import React, { PropsWithChildren } from 'react'

type PricingCardProps = {
    title: string
    description: string
    price: number
}

const PricingCard = ({ children, title, description, price }: PricingCardProps & PropsWithChildren) => {
    return (
        <div className="space-y-10 p-10 w-full rounded-2xl border-2 border-dashed border-black bg-white font-semibold text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none mt-5">
            <section className='space-y-2'>
                <h2 className="font-medium text-lg md:text-xl uppercase">{title}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-200">{description}</p>
            </section>
            <section className='flex items-center justify-between gap-x-5'>
                <p className="text-6xl font-semibold row-span-2 col-span-1">₱{price}</p>
                <div className='w-full'>
                    <p className="text-xl text-gray-600 font-semibold row-span-1 col-span-1">/user</p>
                    <p className="text-xl text-gray-600 font-semibold row-span-1 col-span-1">/month</p>
                </div>
            </section>
            {children}
        </div>
    )
}

export default PricingCard