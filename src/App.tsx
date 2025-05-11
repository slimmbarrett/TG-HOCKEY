import React, { useState } from 'react';
import TabBar from './components/navigation/TabBar';
import GamesPage from './pages/GamesPage';
import PredictionsPage from './pages/PredictionsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import { games, currentUser, leaderboardData } from './data/mockData';
import { Prediction } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('games');
  const [userProfile, setUserProfile] = useState(currentUser);
  
  // Handler for making predictions
  const handleMakePrediction = (prediction: Omit<Prediction, 'id' | 'timestamp'>) => {
    const newPrediction: Prediction = {
      ...prediction,
      id: `pred${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    setUserProfile(prev => ({
      ...prev,
      predictions: [...prev.predictions, newPrediction]
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {activeTab === 'games' && (
        <GamesPage 
          games={games}
          onMakePrediction={handleMakePrediction}
        />
      )}
      
      {activeTab === 'predictions' && (
        <PredictionsPage 
          profile={userProfile}
          games={games}
        />
      )}
      
      {activeTab === 'leaderboard' && (
        <LeaderboardPage 
          leaderboard={leaderboardData}
          userId={userProfile.id}
        />
      )}
      
      {activeTab === 'profile' && (
        <ProfilePage 
          profile={userProfile}
          games={games}
        />
      )}
      
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;