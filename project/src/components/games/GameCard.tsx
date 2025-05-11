import React, { useState } from 'react';
import { Game } from '../../types';
import { formatGameDate } from '../../utils/dateUtils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ChevronRight, Clock } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onPredictionClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPredictionClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isLive = game.status === 'live';
  const isFinal = game.status === 'final';
  
  return (
    <Card 
      className="mb-4 transform transition-all duration-300 overflow-hidden hover:scale-[1.02]"
      variant={isLive ? 'highlight' : 'ice'}
      onClick={() => onPredictionClick(game)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Game Status Badge */}
      <div className="relative">
        {game.status === 'live' && (
          <div className="absolute top-0 left-0 right-0 bg-[#FF5522] text-white text-xs font-semibold text-center py-1 px-2 animate-pulse">
            LIVE • Period {game.period} • {game.timeRemaining}
          </div>
        )}
        {game.status === 'final' && (
          <div className="absolute top-0 left-0 right-0 bg-gray-700 text-white text-xs font-semibold text-center py-1 px-2">
            FINAL {game.outcome === 'OT' && '• OT'}
          </div>
        )}
      </div>
      
      <div className="p-4 pt-6">
        {/* Game Date and Time */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600 flex items-center">
            <Clock className="w-4 h-4 mr-1" /> 
            {formatGameDate(game.date)} • {game.time}
          </div>
          <div className="text-xs text-gray-500">{game.venue}</div>
        </div>
        
        {/* Teams */}
        <div className="flex items-center justify-between mt-4">
          {/* Away Team */}
          <div className="flex flex-col items-center w-5/12">
            <div 
              className="relative w-16 h-16 flex items-center justify-center mb-2 transform transition-all duration-300"
              style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            >
              <img 
                src={game.awayTeam.logoUrl} 
                alt={game.awayTeam.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-semibold text-center">{game.awayTeam.name}</p>
            <p className="text-xs text-gray-500">{game.awayTeam.record}</p>
            {(isLive || isFinal) && (
              <p className="text-2xl font-bold mt-1">{game.awayScore}</p>
            )}
          </div>
          
          {/* VS */}
          <div className="flex flex-col items-center justify-center w-2/12">
            <div className="w-8 h-8 rounded-full bg-[#F0F8FF] flex items-center justify-center border border-gray-200">
              <span className="text-xs font-bold text-gray-500">VS</span>
            </div>
          </div>
          
          {/* Home Team */}
          <div className="flex flex-col items-center w-5/12">
            <div 
              className="relative w-16 h-16 flex items-center justify-center mb-2 transform transition-all duration-300"
              style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            >
              <img 
                src={game.homeTeam.logoUrl} 
                alt={game.homeTeam.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-semibold text-center">{game.homeTeam.name}</p>
            <p className="text-xs text-gray-500">{game.homeTeam.record}</p>
            {(isLive || isFinal) && (
              <p className="text-2xl font-bold mt-1">{game.homeScore}</p>
            )}
          </div>
        </div>
        
        {/* Action Footer */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          {game.status === 'upcoming' ? (
            <Badge 
              variant="secondary" 
              size="md"
              className="animate-pulse"
            >
              Make Prediction
            </Badge>
          ) : (
            <Badge 
              variant={isFinal ? (game.outcome === 'OT' ? 'warning' : 'success') : 'primary'} 
              size="md"
            >
              {isFinal ? 'Game Complete' : 'In Progress'}
            </Badge>
          )}
          
          <div className="flex items-center text-[#003366] text-sm">
            <span className="mr-1">Details</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;