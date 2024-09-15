import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  features: { included: boolean; text: string }[];
  buttonText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, description, price, features, buttonText }) => {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      <div className="text-5xl font-extrabold mb-6">₱{price}</div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {feature.included ? (
              <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
            ) : (
              <XIcon className="w-5 h-5 text-red-500 mr-2" />
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      <Button variant="primary" size="large" className="w-full">
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
