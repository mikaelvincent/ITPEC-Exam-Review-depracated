import React from 'react';
import { BookOpenIcon, BotIcon, BarChartIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="flex flex-col items-center max-w-xs mx-auto space-y-4">
    <div className="text-6xl text-blue-500">{icon}</div>
    <h2 className="text-xl md:text-2xl font-semibold text-center">{title}</h2>
    <p className="text-muted text-sm md:text-base text-center">{description}</p>
  </div>
);

const Features: React.FC = () => (
  <section className="w-full py-16 bg-gray-800 text-white">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard
        title="Get AI Help"
        description="Use our AI to ask about the question you are having trouble analyzing. Don't hesitate to ask!"
        icon={<BotIcon />}
      />
      <FeatureCard
        title="Find Your Rank"
        description="After submitting, you can check where you stand on our leaderboards. Discover your place!"
        icon={<BarChartIcon />}
      />
      <FeatureCard
        title="Review and Learn"
        description="Take your time reviewing the tests you've taken and learn from any mistakes."
        icon={<BookOpenIcon />}
      />
    </div>
  </section>
);

export default Features;
