import React, { useState, useEffect } from 'react';
import TabBar from './components/navigation/TabBar';
import GamesPage from './pages/GamesPage';
import PredictionsPage from './pages/PredictionsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { games, leaderboardData } from './data/mockData';
import { Prediction, UserProfile } from './types';
import { supabase } from './lib/supabase';

function App() {
  const [activeTab, setActiveTab] = useState('games');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initTelegram = async () => {
      const tg = (window as any).Telegram?.WebApp;
      if (!tg) {
        console.error('Telegram WebApp is not available');
        setIsLoading(false);
        return;
      }

      try {
        // Get user data from Telegram
        const user = tg.initDataUnsafe?.user;
        if (!user) {
          console.error('No user data from Telegram');
          setIsLoading(false);
          return;
        }

        // Check if user exists in Supabase
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('telegram_id', user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error fetching user:', fetchError);
          setIsLoading(false);
          return;
        }

        if (!existingUser) {
          // Create new user in Supabase
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([
              {
                telegram_id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                avatar_url: user.photo_url,
                stats: {
                  totalPoints: 0,
                  currentStreak: 0,
                  bestStreak: 0,
                  accuracy: 0,
                  correctPredictions: 0,
                  totalPredictions: 0
                }
              }
            ])
            .select()
            .single();

          if (createError) {
            console.error('Error creating user:', createError);
            setIsLoading(false);
            return;
          }

          setUserProfile(newUser);
        } else {
          setUserProfile(existingUser);
        }
      } catch (error) {
        console.error('Error initializing Telegram:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initTelegram();
  }, []);

  // Handler for making predictions
  const handleMakePrediction = async (prediction: Omit<Prediction, 'id' | 'timestamp'>) => {
    if (!userProfile) return;

    const newPrediction: Prediction = {
      ...prediction,
      id: `pred${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    try {
      // Save prediction to Supabase
      const { error } = await supabase
        .from('predictions')
        .insert([{
          ...newPrediction,
          user_id: userProfile.id
        }]);

      if (error) throw error;

      // Update local state
      setUserProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          predictions: [...prev.predictions, newPrediction]
        };
      });
    } catch (error) {
      console.error('Error saving prediction:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please open this app through Telegram</p>
        </div>
      </div>
    );
  }

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
      
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;