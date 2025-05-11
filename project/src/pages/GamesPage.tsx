import React, { useState } from 'react';
import { Game } from '../types';
import Header from '../components/navigation/Header';
import GamesList from '../components/games/GamesList';
import PredictionModal from '../components/predictions/PredictionModal';

interface GamesPageProps {
  games: Game[];
  onMakePrediction: (prediction: any) => void;
}

const GamesPage: React.FC<GamesPageProps> = ({ games, onMakePrediction }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  const handlePredictionClick = (game: Game) => {
    if (game.status === 'upcoming') {
      setSelectedGame(game);
    }
  };
  
  return (
    <div className="pb-20">
      <Header title="NHL Games" subtitle="Make your predictions" />
      
      <div className="container mx-auto mt-4">
        <GamesList 
          games={games} 
          onPredictionClick={handlePredictionClick} 
        />
      </div>
      
      {selectedGame && (
        <PredictionModal 
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onSubmit={onMakePrediction}
        />
      )}
    </div>
  );
};

export default GamesPage;