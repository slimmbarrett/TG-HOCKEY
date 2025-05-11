import React from 'react';
import { Prediction, Game } from '../../types';
import { formatGameDate } from '../../utils/dateUtils';
import { CheckCircle, XCircle } from 'lucide-react';

interface PredictionHistoryProps {
  predictions: Prediction[];
  games: Game[];
}

const PredictionHistory: React.FC<PredictionHistoryProps> = ({ predictions, games }) => {
  // Sort predictions by timestamp (newest first)
  const sortedPredictions = [...predictions].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  // Find the corresponding game for a prediction
  const findGame = (gameId: string): Game | undefined => {
    return games.find(game => game.id === gameId);
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-[#003366]">Prediction History</h3>
      </div>
      
      {sortedPredictions.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p>You haven't made any predictions yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {sortedPredictions.map((prediction) => {
            const game = findGame(prediction.gameId);
            if (!game) return null;
            
            const predictedTeam = game.homeTeam.id === prediction.selectedTeam ? game.homeTeam : game.awayTeam;
            
            return (
              <div key={prediction.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-1">
                      {prediction.isCorrect !== undefined && (
                        prediction.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mr-2" />
                        )
                      )}
                      <span className="font-medium text-gray-900">
                        {game.awayTeam.abbreviation} vs {game.homeTeam.abbreviation}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {formatGameDate(game.date)} • {game.time}
                    </div>
                    
                    <div className="mt-2 flex items-center">
                      <div className="w-6 h-6 mr-2">
                        <img 
                          src={predictedTeam.logoUrl} 
                          alt={predictedTeam.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-sm">
                        You picked <span className="font-medium">{predictedTeam.name}</span> to win 
                        with {prediction.confidence}x confidence
                      </span>
                    </div>
                  </div>
                  
                  {prediction.points !== undefined && (
                    <div className="flex flex-col items-end">
                      <div className={`
                        text-sm font-semibold px-2 py-1 rounded
                        ${prediction.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      `}>
                        {prediction.isCorrect ? `+${prediction.points} pts` : '0 pts'}
                      </div>
                      {game.status === 'final' && (
                        <div className="text-xs text-gray-500 mt-1">
                          Final: {game.awayTeam.abbreviation} {game.awayScore} - {game.homeTeam.abbreviation} {game.homeScore}
                          {game.outcome === 'OT' && ' (OT)'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PredictionHistory;