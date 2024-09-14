"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '../ui/scroll-area'
import { toast } from 'sonner'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from '@/hooks/use-toast'

type QuestionCardProps = {
    id: string
    text: string
    imageUrl?: string | null
}

const QuestionCard = ({ id, text, imageUrl }: QuestionCardProps) => {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const params = searchParams.toString();
    const router = useRouter();

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' && window.location.pathname ? window.location.pathname : '';

    const URL = `${origin}${pathname}?${params}`;

    useEffect(() => {
        if (id) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('q_id', id);
            router.push(`?${params.toString()}`, { scroll: false });
        }
    }, [id, searchParams, router]);

    const handleURLShare = () => {
        navigator.clipboard.writeText(URL);
        toast({
            title: 'Link copied',
            description: 'The link has been copied to your clipboard',
        })
    }

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger className='max-w-lg h-full p-3'>
                    <Card
                        onClick={handleURLShare}
                        className='h-full w-full '
                    >
                        <ScrollArea className='h-72 md:h-96 lg:h-[425px]' viewportClassName='flex flex-col justify-center'>
                            <CardHeader>
                                <CardTitle className='md:text-xl text-center'>
                                    {text}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='h-full pb-2'>
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt='Next.js Logo'
                                        width={300}
                                        height={300}
                                        className='object-contain object-center h-full max-h-52 mx-auto'
                                        draggable={false}
                                    />
                                )}
                            </CardContent>
                        </ScrollArea>
                    </Card>
                </TooltipTrigger>
                <TooltipContent className='p-3' side='bottom' sideOffset={-100}>
                    <p className='flex items-center gap-x-1.5 cursor-pointer text-muted hover:underline hover:scale-[1.025] transition-all duration-300'>
                        <SquareArrowOutUpRightIcon className='flex-shrink-0 h-4 w-4' />
                        Click to hare the link of this question
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider >
    )
}

export default QuestionCard