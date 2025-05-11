export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl: string;
  flagUrl: string;
  primaryColor: string;
  secondaryColor: string;
  record?: string;
  stats?: {
    goalsFor: number;
    goalsAgainst: number;
    winPercentage: number;
  };
}

export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'final';
  homeScore?: number;
  awayScore?: number;
  period?: number;
  timeRemaining?: string;
  outcome?: 'home' | 'away' | 'OT';
}

export interface Prediction {
  id: string;
  gameId: string;
  selectedTeam: string;
  confidence: 1 | 2 | 3;
  points?: number;
  isCorrect?: boolean;
  timestamp: string;
  user_id: string;
}

export interface UserProfile {
  id: string;
  telegram_id: number;
  username: string;
  first_name: string;
  last_name?: string;
  avatar_url?: string;
  stats: {
    totalPoints: number;
    currentStreak: number;
    bestStreak: number;
    accuracy: number;
    correctPredictions: number;
    totalPredictions: number;
  };
  predictions: Prediction[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarUrl: string;
  points: number;
  rank: number;
  streak: number;
}

export interface TelegramUser {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
  photo_url?: string;
}