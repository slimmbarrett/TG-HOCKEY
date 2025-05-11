import React, { useState, useEffect } from 'react';
import TabBar from './components/navigation/TabBar';
import GamesPage from './pages/GamesPage';
import PredictionsPage from './pages/PredictionsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { games, leaderboardData } from './data/mockData';
import { Prediction, UserProfile } from './types';
import { supabase } from './lib/supabase';

// Development mode flag
const isDevelopment = import.meta.env.DEV;

function App() {
  const [activeTab, setActiveTab] = useState('games');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTelegram = async () => {
      console.log('--- Telegram WebApp Debug ---');
      const tg = (window as any).Telegram?.WebApp;
      console.log('window.Telegram:', (window as any).Telegram);
      console.log('Telegram WebApp:', tg);
      console.log('Telegram initDataUnsafe:', tg?.initDataUnsafe);
      console.log('Telegram user:', tg?.initDataUnsafe?.user);

      if (!tg && !isDevelopment) {
        setError('Telegram WebApp API not found. Please open via Telegram.');
        setIsLoading(false);
        return;
      }

      try {
        const user = tg?.initDataUnsafe?.user;
        if (!user && !isDevelopment) {
          setError('No user data received from Telegram. Please open the app via a Telegram bot button.');
          setIsLoading(false);
          return;
        }

        if (isDevelopment) {
          const mockUser: UserProfile = {
            id: 'dev-user-1',
            telegram_id: 123456789,
            username: 'dev_user',
            first_name: 'Development',
            last_name: 'User',
            stats: {
              totalPoints: 0,
              currentStreak: 0,
              bestStreak: 0,
              accuracy: 0,
              correctPredictions: 0,
              totalPredictions: 0
            },
            predictions: []
          };
          setUserProfile(mockUser);
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
          setError('Error fetching user from Supabase: ' + fetchError.message);
          setIsLoading(false);
          return;
        }

        if (!existingUser) {
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
            setError('Error creating user in Supabase: ' + createError.message);
            setIsLoading(false);
            return;
          }

          setUserProfile(newUser);
        } else {
          setUserProfile(existingUser);
        }
      } catch (err: any) {
        setError('Error initializing Telegram: ' + (err.message || err));
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Access Denied</h2>
          <p className="text-gray-600">{error}</p>
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