import React from 'react';
import MainHeader from '@/components/home/MainHeader';
import Features from '@/components/home/Features';
import Pricing from '@/components/home/Pricing';

const HomePage: React.FC = () => (
  <div className="flex flex-col items-center">
    <MainHeader />
    <Features />
    <Pricing />
  </div>
);

export default HomePage;
