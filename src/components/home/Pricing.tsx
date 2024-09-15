import React from 'react';
import PricingCard from './PricingCard';

const Pricing: React.FC = () => {
  const plans = [
    {
      title: 'Basic',
      description: 'Ideal for students looking to take mock exams.',
      price: 0,
      features: [
        { included: true, text: 'Leaderboard access' },
        { included: true, text: 'Unlimited test submissions' },
        { included: false, text: 'Unlimited AI questions' },
        { included: false, text: 'Featured on honor wall' },
      ],
      buttonText: 'Choose Basic',
    },
    {
      title: 'Pro',
      description: 'For those seeking premium features with AI guidance.',
      price: 50,
      features: [
        { included: true, text: 'Leaderboard access' },
        { included: true, text: 'Unlimited test submissions' },
        { included: true, text: 'Unlimited AI questions' },
        { included: true, text: 'Featured on honor wall' },
      ],
      buttonText: 'Choose Pro',
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Choose a plan that fits your needs and budget.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
