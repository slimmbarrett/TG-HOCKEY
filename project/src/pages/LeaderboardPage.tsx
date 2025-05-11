import React, { useState } from 'react';
import { LeaderboardEntry, LeaderboardPeriod } from '../types';
import Header from '../components/navigation/Header';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import Button from '../components/ui/Button';

interface LeaderboardPageProps {
  leaderboard: LeaderboardEntry[];
  userId: string;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ leaderboard, userId }) => {
  const [activePeriod, setActivePeriod] = useState<LeaderboardPeriod>('weekly');
  
  const periods: { id: LeaderboardPeriod; label: string }[] = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'all-time', label: 'All Time' }
  ];
  
  return (
    <div className="pb-20">
      <Header title="Leaderboard" subtitle="See where you rank" />
      
      <div className="container mx-auto mt-4 px-4">
        <div className="flex justify-between mb-6 bg-[#F0F8FF] rounded-lg p-2">
          {periods.map((period) => (
            <Button
              key={period.id}
              variant={activePeriod === period.id ? 'primary' : 'ghost'}
              size="md"
              className="flex-1 rounded-md"
              onClick={() => setActivePeriod(period.id)}
            >
              {period.label}
            </Button>
          ))}
        </div>
        
        <LeaderboardTable 
          entries={leaderboard}
          period={activePeriod}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default LeaderboardPage;