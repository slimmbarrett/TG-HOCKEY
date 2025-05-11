import React from 'react';
import { Game } from '../../types';
import GameCard from './GameCard';
import { groupGamesByDate, formatGameDate, isToday, isTomorrow } from '../../utils/dateUtils';

interface GamesListProps {
  games: Game[];
  onPredictionClick: (game: Game) => void;
}

const GamesList: React.FC<GamesListProps> = ({ games, onPredictionClick }) => {
  const groupedGames = groupGamesByDate(games);
  
  // Convert object to array of [date, games] pairs and sort by date
  const sortedDates = Object.entries(groupedGames)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime());
  
  return (
    <div className="space-y-6">
      {sortedDates.map(([date, gamesOnDate]) => (
        <div key={date}>
          <div className="mb-2 sticky top-0 bg-gray-100 py-2 z-10">
            <h2 className="text-lg font-bold text-[#003366] px-4">
              {isToday(date) ? 'Today' : isTomorrow(date) ? 'Tomorrow' : formatGameDate(date)}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({gamesOnDate.length} {gamesOnDate.length === 1 ? 'game' : 'games'})
              </span>
            </h2>
          </div>
          
          <div className="px-4 space-y-4">
            {gamesOnDate.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onPredictionClick={onPredictionClick} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamesList;