'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';

interface ChoiceCardProps {
  indicator: string;
  disabled?: boolean;
  setFormChoice?: (choice: string) => void;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ indicator, disabled = false, setFormChoice }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const choiceParam = searchParams.get('choice');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    setFormChoice && setFormChoice(indicator);
    params.set('choice', indicator);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      className={`${
        choiceParam === indicator
          ? 'bg-gray-900 text-white hover:bg-gray-800'
          : 'bg-white text-black hover:bg-gray-100'
      } h-18 md:h-32 w-full rounded-lg border-2 shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-center">
        <div className="bg-muted-foreground text-primary-foreground font-bold rounded-full w-12 h-12 flex items-center justify-center">
          {String.fromCharCode(65 + parseInt(indicator, 10))}
        </div>
      </div>
    </Button>
  );
};

export default ChoiceCard;
