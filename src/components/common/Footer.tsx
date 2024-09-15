import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full h-16 bg-gray-800">
    <div className="max-w-5xl mx-auto h-full flex items-center justify-center text-white">
      <p>&copy; {new Date().getFullYear()} AI Review. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
