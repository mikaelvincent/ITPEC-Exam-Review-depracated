'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SquareArrowUpRightIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { useToast } from '@/hooks/useToast';

interface QuestionProps {
  id: string;
  text: string;
  imageUrl?: string | null;
}

const Question: React.FC<QuestionProps> = ({ id, text, imageUrl }) => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('q_id', id);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [id, router, searchParams]);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied',
      description: 'Question link copied to clipboard.',
    });
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger className="max-w-lg h-full p-3" onClick={handleShare}>
          <Card className="h-full w-full cursor-pointer">
            <ScrollArea className="h-72 md:h-96 lg:h-[425px]">
              <CardHeader>
                <CardTitle className="md:text-xl text-center">{text}</CardTitle>
              </CardHeader>
              <CardContent>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Question Image"
                    width={300}
                    height={300}
                    className="object-contain object-center h-full max-h-52 mx-auto"
                    draggable={false}
                  />
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={-100}>
          <p className="flex items-center gap-x-1.5 cursor-pointer text-muted hover:underline">
            <SquareArrowUpRightIcon className="h-4 w-4" />
            Click to share this question
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Question;
