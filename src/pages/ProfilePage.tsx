import React from 'react';
import { UserProfile, Game } from '../types';
import Header from '../components/navigation/Header';
import StatsCard from '../components/profile/StatsCard';
import PredictionHistory from '../components/profile/PredictionHistory';
import { User } from 'lucide-react';

interface ProfilePageProps {
  profile: UserProfile;
  games: Game[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, games }) => {
  return (
    <div className="pb-20">
      <Header title="My Profile" subtitle="Stats and history" />
      
      <div className="container mx-auto mt-4 px-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center">
          <div className="mr-4">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.username}
                className="w-16 h-16 rounded-full border-2 border-[#003366]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#F0F8FF] flex items-center justify-center border-2 border-[#003366]">
                <User className="w-8 h-8 text-[#003366]" />
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-[#003366]">{profile.username}</h2>
            <p className="text-gray-600 text-sm">Member since 2025</p>
          </div>
          
          <div className="ml-auto">
            <div className="bg-[#F0F8FF] px-3 py-1 rounded-full text-sm font-medium text-[#003366]">
              Rank #{profile.stats.totalPoints > 0 ? '3' : '-'}
            </div>
          </div>
        </div>
        
        <StatsCard profile={profile} />
        
        <PredictionHistory 
          predictions={profile.predictions}
          games={games}
        />
      </div>
    </div>
  );
};

export default ProfilePage;