import React from 'react';
import { Pocket as Hockey } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-[#003366] text-white py-4 px-4 shadow-md">
      <div className="container mx-auto flex items-center">
        <div className="flex items-center">
          <Hockey className="w-8 h-8 mr-2 text-[#FF5522]" />
          <div>
            <h1 className="text-xl font-bold tracking-wide">{title}</h1>
            {subtitle && <p className="text-xs text-[#F0F8FF] mt-0.5">{subtitle}</p>}
          </div>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <div className="flex items-center bg-[#002244] px-2 py-1 rounded-full">
            <span className="text-xs font-medium mr-1">Season 2025</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;