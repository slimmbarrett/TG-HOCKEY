import React from 'react';
import { UserProfile } from '../../types';
import { Award, Zap, Target, Calendar } from 'lucide-react';
import Card from '../ui/Card';

interface StatsCardProps {
  profile: UserProfile;
}

const StatsCard: React.FC<StatsCardProps> = ({ profile }) => {
  const { stats } = profile;
  
  const statItems = [
    {
      icon: <Award className="w-5 h-5 text-[#FF5522]" />,
      label: 'Total Points',
      value: stats.totalPoints,
      suffix: 'pts'
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      label: 'Current Streak',
      value: stats.currentStreak,
      suffix: 'wins'
    },
    {
      icon: <Target className="w-5 h-5 text-green-500" />,
      label: 'Accuracy',
      value: `${Math.round(stats.accuracy * 100)}`,
      suffix: '%'
    },
    {
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
      label: 'Predictions',
      value: stats.totalPredictions,
      suffix: 'games'
    },
  ];
  
  // Calculate accuracy percentage for the visual meter
  const accuracyPercentage = stats.accuracy * 100;
  
  return (
    <Card variant="default" className="mb-6">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#003366] mb-4">Performance Stats</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Prediction Accuracy</span>
            <span className="text-sm font-semibold text-[#003366]">{Math.round(accuracyPercentage)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${accuracyPercentage}%`,
                background: `linear-gradient(90deg, #FF5522 0%, #003366 100%)`
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {statItems.map((item, index) => (
            <div key={index} className="bg-[#F0F8FF] p-3 rounded-lg">
              <div className="flex items-center mb-2">
                {item.icon}
                <span className="text-sm text-gray-600 ml-2">{item.label}</span>
              </div>
              <div className="text-2xl font-bold text-[#003366]">
                {item.value}<span className="text-sm font-normal text-gray-500 ml-1">{item.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;