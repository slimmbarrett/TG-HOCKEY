import React from 'react';
import { Calendar, Trophy, ListChecks } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'games', label: 'Games', icon: <Calendar className="w-6 h-6" /> },
    { id: 'predictions', label: 'Predictions', icon: <ListChecks className="w-6 h-6" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-6 h-6" /> }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-around">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center py-2 px-4
                ${activeTab === tab.id 
                  ? 'text-[#003366]' 
                  : 'text-gray-500 hover:text-[#003366]'
                }
              `}
            >
              {tab.icon}
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabBar;