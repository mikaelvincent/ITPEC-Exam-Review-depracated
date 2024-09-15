import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
