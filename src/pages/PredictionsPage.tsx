import React from 'react';
import { UserProfile, Game } from '../types';
import Header from '../components/navigation/Header';
import Card from '../components/ui/Card';
import { formatGameDate } from '../utils/dateUtils';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface PredictionsPageProps {
  profile: UserProfile;
  games: Game[];
}

const PredictionsPage: React.FC<PredictionsPageProps> = ({ profile, games }) => {
  // Filter games with user predictions
  const userPredictions = profile.predictions;
  const predictionGameIds = userPredictions.map(p => p.gameId);
  const predictedGames = games.filter(game => predictionGameIds.includes(game.id));
  
  // Group games by status
  const upcomingGames = predictedGames.filter(game => game.status === 'upcoming');
  const liveGames = predictedGames.filter(game => game.status === 'live');
  const completedGames = predictedGames.filter(game => game.status === 'final');
  
  // Find a prediction for a specific game
  const getPredictionForGame = (gameId: string) => {
    return userPredictions.find(p => p.gameId === gameId);
  };
  
  // Status groups
  const sections = [
    { 
      title: 'Live Predictions', 
      games: liveGames, 
      icon: <AlertCircle className="w-5 h-5 text-[#FF5522]" />,
      emptyMessage: 'No live games with your predictions'
    },
    { 
      title: 'Upcoming Predictions', 
      games: upcomingGames, 
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      emptyMessage: 'No upcoming games with your predictions'
    },
    { 
      title: 'Completed Predictions', 
      games: completedGames, 
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      emptyMessage: 'No completed games with your predictions'
    }
  ];
  
  return (
    <div className="pb-20">
      <Header title="My Predictions" subtitle="Track your picks" />
      
      <div className="container mx-auto mt-4 px-4">
        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center mb-3">
              {section.icon}
              <h2 className="text-lg font-semibold ml-2 text-[#003366]">{section.title}</h2>
            </div>
            
            {section.games.length === 0 ? (
              <Card variant="ice" className="p-4 text-center text-gray-500">
                <p>{section.emptyMessage}</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {section.games.map(game => {
                  const prediction = getPredictionForGame(game.id);
                  if (!prediction) return null;
                  
                  const predictedTeam = game.homeTeam.id === prediction.selectedTeam 
                    ? game.homeTeam 
                    : game.awayTeam;
                    
                  const isLive = game.status === 'live';
                  const isCompleted = game.status === 'final';
                  
                  // For completed games, check if prediction was correct
                  let isCorrect;
                  if (isCompleted && game.outcome) {
                    if (game.outcome === 'home') {
                      isCorrect = prediction.selectedTeam === game.homeTeam.id;
                    } else if (game.outcome === 'away') {
                      isCorrect = prediction.selectedTeam === game.awayTeam.id;
                    }
                    // OT games would need more logic to determine winner
                  }
                  
                  return (
                    <Card 
                      key={game.id} 
                      variant={isLive ? 'highlight' : 'default'}
                      className="overflow-hidden"
                    >
                      {isLive && (
                        <div className="bg-[#FF5522] text-white text-xs font-semibold py-1 px-2 text-center animate-pulse">
                          LIVE • Period {game.period} • {game.timeRemaining}
                        </div>
                      )}
                      
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-sm text-gray-600">
                            {formatGameDate(game.date)} • {game.time}
                          </div>
                          
                          {isCompleted && (
                            <div className={`
                              flex items-center text-sm font-medium px-2 py-1 rounded
                              ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            `}>
                              {isCorrect ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Correct
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Incorrect
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex flex-col items-center w-12">
                              <img 
                                src={game.awayTeam.logoUrl} 
                                alt={game.awayTeam.name} 
                                className="w-8 h-8 object-contain"
                              />
                              <span className="text-xs mt-1">{game.awayTeam.abbreviation}</span>
                            </div>
                            
                            {(isLive || isCompleted) && (
                              <span className="text-lg font-bold mx-2">{game.awayScore}</span>
                            )}
                            
                            <span className="mx-2 text-xs text-gray-500">@</span>
                            
                            {(isLive || isCompleted) && (
                              <span className="text-lg font-bold mx-2">{game.homeScore}</span>
                            )}
                            
                            <div className="flex flex-col items-center w-12">
                              <img 
                                src={game.homeTeam.logoUrl} 
                                alt={game.homeTeam.name} 
                                className="w-8 h-8 object-contain"
                              />
                              <span className="text-xs mt-1">{game.homeTeam.abbreviation}</span>
                            </div>
                          </div>
                          
                          <div className="ml-4 flex flex-col items-end">
                            <div className="text-sm">
                              Your pick: <span className="font-medium">{predictedTeam.abbreviation}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {prediction.confidence}x confidence
                            </div>
                            
                            {isCompleted && prediction.points !== undefined && (
                              <div className="text-sm font-semibold mt-2 text-[#003366]">
                                {prediction.points > 0 ? `+${prediction.points}` : '0'} points
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionsPage;