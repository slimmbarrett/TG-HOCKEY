import React, { useState } from 'react';
import { Game, Team, Prediction } from '../../types';
import Button from '../ui/Button';
import { Check, X } from 'lucide-react';

interface PredictionModalProps {
  game: Game;
  onClose: () => void;
  onSubmit: (prediction: Omit<Prediction, 'id' | 'timestamp'>) => void;
}

const PredictionModal: React.FC<PredictionModalProps> = ({ game, onClose, onSubmit }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<1 | 2 | 3>(1);
  
  const handleSubmit = () => {
    if (!selectedTeam) return;
    
    onSubmit({
      gameId: game.id,
      selectedTeam,
      confidence,
    });
    
    onClose();
  };
  
  const renderTeamCard = (team: Team, isHome: boolean) => {
    const isSelected = selectedTeam === team.id;
    
    return (
      <div 
        className={`
          border-2 rounded-lg p-4 cursor-pointer transition-all duration-300
          ${isSelected 
            ? `border-[#FF5522] bg-[#FFF1EC] shadow-md transform scale-105` 
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }
        `}
        onClick={() => setSelectedTeam(team.id)}
      >
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 flex items-center justify-center mb-2">
            <img 
              src={team.logoUrl} 
              alt={team.name} 
              className="w-full h-full object-contain"
            />
            {isSelected && (
              <div className="absolute -top-2 -right-2 bg-[#FF5522] rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <p className="font-semibold text-center">{team.name}</p>
          <p className="text-xs text-gray-500 mt-1">{team.record}</p>
          
          {isHome && <span className="text-xs mt-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Home</span>}
        </div>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-[#003366]">Make Your Prediction</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Who will win?</h3>
            <div className="grid grid-cols-2 gap-4">
              {renderTeamCard(game.awayTeam, false)}
              {renderTeamCard(game.homeTeam, true)}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">How confident are you?</h3>
            <div className="bg-[#F0F8FF] p-3 rounded-lg">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((level) => (
                  <button
                    key={level}
                    onClick={() => setConfidence(level as 1 | 2 | 3)}
                    className={`
                      relative flex-1 py-2 text-center rounded-lg transition-all duration-300
                      ${confidence === level 
                        ? 'bg-[#003366] text-white font-semibold shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                      }
                      mx-1
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-bold">{level}x</span>
                      <span className="text-xs mt-1">
                        {level === 1 ? 'Not Sure' : level === 2 ? 'Confident' : 'Very Sure'}
                      </span>
                    </div>
                    
                    {/* Puck animation for selected confidence */}
                    {confidence === level && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-black rounded-full animate-bounce"></div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-3 text-xs text-gray-600">
                <p>Confidence multiplies your points: {confidence}x points for correct predictions</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            
            <Button
              variant="accent"
              disabled={!selectedTeam}
              onClick={handleSubmit}
            >
              Submit Prediction
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;