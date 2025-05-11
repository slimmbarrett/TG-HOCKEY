import React from 'react';
import { Calendar, Trophy, ListChecks, User } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'games', label: 'Games', icon: <Calendar className="w-6 h-6" /> },
    { id: 'predictions', label: 'My Picks', icon: <ListChecks className="w-6 h-6" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-6 h-6" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-6 h-6" /> }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-2 px-4 w-full transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-[#FF5522] border-t-2 border-[#FF5522]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
            
            {/* Ice trail animation for active tab */}
            {activeTab === tab.id && (
              <div className="absolute -top-1 left-0 right-0 h-1 bg-[#F0F8FF]">
                <div className="h-full w-1/3 bg-[#00A3FF] animate-pulse rounded-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;