import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { BookOpenIcon, CoinsIcon } from 'lucide-react';

const MainHeader: React.FC = () => {
  return (
    <section className="py-32 flex flex-col items-center justify-center gap-8">
      <p className="text-neutral-600 dark:text-neutral-200 text-sm md:text-base xl:text-xl">
        The journey of passing your exams starts here
      </p>
      <div className="text-center flex flex-col gap-5">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium">Review With</h1>
        <span className="text-5xl sm:text-7xl md:text-8xl text-green-500 font-bold">
          AI Guidance
        </span>
      </div>
      <div className="w-full max-w-sm flex items-center gap-x-5 justify-center px-3">
        <Link href="/review">
          <Button
            size="lg"
            className="w-full h-14 text-sm md:text-base lg:text-lg rounded-lg transition-transform duration-300 hover:scale-105"
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
            Start Review
          </Button>
        </Link>
        <Link href="/#pricing">
          <Button
            size="lg"
            variant="secondary"
            className="w-full h-14 text-sm md:text-base lg:text-lg rounded-lg transition-transform duration-300 hover:scale-105"
          >
            <CoinsIcon className="h-5 w-5 mr-2" />
            See Pricing
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default MainHeader;
