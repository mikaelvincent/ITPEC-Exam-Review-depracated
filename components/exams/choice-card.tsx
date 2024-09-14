"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';

type ChoiceCardProps = {
    indicator: string
    disabled?: boolean
    setFormChoice?: (choice: string) => void
}

function ChoiceCard({ indicator, disabled = false, setFormChoice }: ChoiceCardProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const choiceParam = searchParams.get('choice');

    const handleClickedChoice = (e: React.MouseEvent) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());

        setFormChoice && setFormChoice(indicator);
        params.set('choice', indicator);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Button disabled={disabled} onClick={handleClickedChoice} className={`
            ${choiceParam && choiceParam === indicator ?
                "bg-gray-900 hover:bg-gray-900/90 text-white hover:border-primary-foreground"
                : "bg-card text-card-foreground hover:bg-gray-100 hover:border-primary"} 
            h-18 md:h-32 cursor-pointer hover:scale-[1.025] flex items-center justify-center p-8 w-full
            rounded-lg border-2 border-transparent transition-all duration-300 hover:border-dotted shadow-md`}
        >
            <div className="w-full flex items-center justify-center">
                <div className="bg-muted-foreground text-primary-foreground font-bold rounded-full w-12 h-12 flex items-center justify-center">
                    {String.fromCharCode(65 + parseInt(indicator))}
                </div>
            </div>
        </Button>
    )
}

export default ChoiceCard