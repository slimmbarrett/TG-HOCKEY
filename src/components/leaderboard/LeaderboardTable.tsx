import React, { useEffect, useState } from 'react';
import { LeaderboardEntry, LeaderboardPeriod } from '../../types';
import { Trophy } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  period: LeaderboardPeriod;
  userId: string;
}

export const LeaderboardTable = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('points', { ascending: false });

        if (error) {
          throw error;
        }

        // Add rank to each entry
        const rankedData = data?.map((entry, index) => ({
          ...entry,
          rank: index + 1
        })) || [];

        setLeaderboard(rankedData);
      } catch (err) {
        setError('Failed to fetch leaderboard data');
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leaderboard.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {entry.rank === 1 && (
                    <span className="text-yellow-500 mr-2">🥇</span>
                  )}
                  {entry.rank === 2 && (
                    <span className="text-gray-400 mr-2">🥈</span>
                  )}
                  {entry.rank === 3 && (
                    <span className="text-amber-600 mr-2">🥉</span>
                  )}
                  <span className="text-sm font-medium text-gray-900">{entry.rank}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{entry.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{entry.points}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {entry.total_predictions > 0
                    ? `${Math.round((entry.correct_predictions / entry.total_predictions) * 100)}%`
                    : 'N/A'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;