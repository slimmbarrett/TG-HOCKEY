import React from 'react';
import { LeaderboardEntry, LeaderboardPeriod } from '../../types';
import { Trophy } from 'lucide-react';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  period: LeaderboardPeriod;
  userId: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries, period, userId }) => {
  const periodLabels = {
    weekly: 'This Week',
    monthly: 'This Month',
    'all-time': 'All Time'
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-[#003366] text-white p-3 flex justify-between items-center">
        <h3 className="text-lg font-bold">{periodLabels[period]} Standings</h3>
        <Trophy className="w-5 h-5 text-[#FF5522]" />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Streak
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => {
              const isCurrentUser = entry.userId === userId;
              const isTopThree = entry.rank <= 3;
              
              return (
                <tr 
                  key={entry.userId}
                  className={`
                    transition-colors duration-200
                    ${isCurrentUser ? 'bg-blue-50' : 'hover:bg-gray-50'}
                  `}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {isTopThree ? (
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center font-bold
                          ${entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' : 
                            entry.rank === 2 ? 'bg-gray-200 text-gray-700' : 
                            'bg-amber-100 text-amber-700'}
                        `}>
                          {entry.rank}
                        </div>
                      ) : (
                        <span className="text-gray-500 font-medium">{entry.rank}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={entry.avatarUrl} 
                          alt={entry.username} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {entry.username}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs text-blue-600">(You)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold">
                      {entry.points} pts
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {entry.streak > 0 ? (
                      <div className="flex items-center">
                        <div className="h-2 bg-green-500 rounded-full mr-2" style={{ width: `${Math.min(entry.streak * 5, 40)}px` }}></div>
                        <span className="text-sm text-green-600 font-semibold">{entry.streak}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;