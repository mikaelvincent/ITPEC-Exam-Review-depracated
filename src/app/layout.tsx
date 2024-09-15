import React from 'react';
import { Inter } from 'next/font/google';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Toaster } from '@/components/ui/Toast/Toaster';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Review',
  description:
    'A web application that allows users to review for tests by generating mock exams with AI guidance.',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <Toaster />
      <NextTopLoader
        color="#2299DD"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
      <Navbar />
      {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;
