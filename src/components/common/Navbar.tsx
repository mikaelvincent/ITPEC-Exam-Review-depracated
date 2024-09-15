import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { KeyIcon } from 'lucide-react';

const Navbar: React.FC = () => (
  <nav className="w-full h-16 bg-white dark:bg-gray-900 shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={150} height={50} draggable={false} />
      </Link>
      <div>
        <Link href="/sign-in">
          <Button variant="primary" size="medium" className="flex items-center">
            <KeyIcon className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
