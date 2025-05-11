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
}

export interface UserProfile {
  id: string;
  username: string;
  avatarUrl: string;
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
  id: number;
  user_id: string;
  username: string;
  points: number;
  correct_predictions: number;
  total_predictions: number;
  rank?: number;
}

export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all-time';