import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div className={cn('bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden', className)} {...props}>
    {children}
  </div>
);

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardHeader: React.FC<CardHeaderProps> = ({ children, ...props }) => <div {...props}>{children}</div>;

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const CardTitle: React.FC<CardTitleProps> = ({ children, ...props }) => <h2 {...props}>{children}</h2>;

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardContent: React.FC<CardContentProps> = ({ children, ...props }) => <div {...props}>{children}</div>;

export { Card, CardHeader, CardTitle, CardContent };
