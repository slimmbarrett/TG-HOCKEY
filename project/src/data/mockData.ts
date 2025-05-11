import { Game, UserProfile, LeaderboardEntry, Team } from '../types';
import { addDays, format } from '../utils/dateUtils';

// IIHF Teams
export const teams: Team[] = [
  {
    id: 'fin',
    name: 'Finland',
    abbreviation: 'FIN',
    logoUrl: 'https://www.iihf.com/img/national_teams/fin',
    flagUrl: 'https://flagcdn.com/fi.svg',
    primaryColor: '#003580',
    secondaryColor: '#FFFFFF',
    record: '2-0-0',
    stats: {
      goalsFor: 8,
      goalsAgainst: 2,
      winPercentage: 1.000
    }
  },
  {
    id: 'swe',
    name: 'Sweden',
    abbreviation: 'SWE',
    logoUrl: 'https://www.iihf.com/img/national_teams/swe',
    flagUrl: 'https://flagcdn.com/se.svg',
    primaryColor: '#006AA7',
    secondaryColor: '#FECC02',
    record: '1-0-1',
    stats: {
      goalsFor: 7,
      goalsAgainst: 4,
      winPercentage: 0.750
    }
  },
  {
    id: 'can',
    name: 'Canada',
    abbreviation: 'CAN',
    logoUrl: 'https://www.iihf.com/img/national_teams/can',
    flagUrl: 'https://flagcdn.com/ca.svg',
    primaryColor: '#FF0000',
    secondaryColor: '#FFFFFF',
    record: '2-0-0',
    stats: {
      goalsFor: 10,
      goalsAgainst: 3,
      winPercentage: 1.000
    }
  },
  {
    id: 'usa',
    name: 'United States',
    abbreviation: 'USA',
    logoUrl: 'https://www.iihf.com/img/national_teams/usa',
    flagUrl: 'https://flagcdn.com/us.svg',
    primaryColor: '#041E42',
    secondaryColor: '#BF0D3E',
    record: '1-1-0',
    stats: {
      goalsFor: 6,
      goalsAgainst: 5,
      winPercentage: 0.500
    }
  },
  {
    id: 'cze',
    name: 'Czechia',
    abbreviation: 'CZE',
    logoUrl: 'https://www.iihf.com/img/national_teams/cze',
    flagUrl: 'https://flagcdn.com/cz.svg',
    primaryColor: '#11457E',
    secondaryColor: '#D7141A',
    record: '1-1-0',
    stats: {
      goalsFor: 5,
      goalsAgainst: 4,
      winPercentage: 0.500
    }
  },
  {
    id: 'svk',
    name: 'Slovakia',
    abbreviation: 'SVK',
    logoUrl: 'https://www.iihf.com/img/national_teams/svk',
    flagUrl: 'https://flagcdn.com/sk.svg',
    primaryColor: '#0B4EA2',
    secondaryColor: '#EE1C25',
    record: '1-1-0',
    stats: {
      goalsFor: 4,
      goalsAgainst: 5,
      winPercentage: 0.500
    }
  }
];

const today = new Date();

// IIHF World Championship Games
export const games: Game[] = [
  {
    id: 'game1',
    homeTeam: teams[0], // Finland
    awayTeam: teams[1], // Sweden
    date: format(today, 'yyyy-MM-dd'),
    time: '19:20',
    venue: 'Hartwall Arena, Helsinki',
    status: 'upcoming'
  },
  {
    id: 'game2',
    homeTeam: teams[2], // Canada
    awayTeam: teams[3], // USA
    date: format(today, 'yyyy-MM-dd'),
    time: '20:20',
    venue: 'Hartwall Arena, Helsinki',
    status: 'upcoming'
  },
  {
    id: 'game3',
    homeTeam: teams[4], // Czechia
    awayTeam: teams[5], // Slovakia
    date: format(today, 'yyyy-MM-dd'),
    time: '16:20',
    venue: 'Ice Hall, Helsinki',
    status: 'upcoming'
  },
  {
    id: 'game4',
    homeTeam: teams[1], // Sweden
    awayTeam: teams[2], // Canada
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    time: '19:20',
    venue: 'Hartwall Arena, Helsinki',
    status: 'upcoming'
  },
  {
    id: 'game5',
    homeTeam: teams[3], // USA
    awayTeam: teams[0], // Finland
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    time: '20:20',
    venue: 'Ice Hall, Helsinki',
    status: 'upcoming'
  },
  {
    id: 'game6',
    homeTeam: teams[3], // USA
    awayTeam: teams[2], // Canada
    date: format(addDays(today, -1), 'yyyy-MM-dd'),
    time: '19:20',
    venue: 'Hartwall Arena, Helsinki',
    status: 'final',
    homeScore: 2,
    awayScore: 4,
    outcome: 'away'
  },
  {
    id: 'game7',
    homeTeam: teams[5], // Slovakia
    awayTeam: teams[4], // Czechia
    date: format(addDays(today, -1), 'yyyy-MM-dd'),
    time: '20:20',
    venue: 'Ice Hall, Helsinki',
    status: 'final',
    homeScore: 2,
    awayScore: 3,
    outcome: 'OT'
  }
];

// Mock User Profile
export const currentUser: UserProfile = {
  id: 'user1',
  username: 'HockeyFan99',
  avatarUrl: 'https://i.pravatar.cc/150?img=11',
  stats: {
    totalPoints: 145,
    currentStreak: 3,
    bestStreak: 7,
    accuracy: 0.72,
    correctPredictions: 18,
    totalPredictions: 25
  },
  predictions: [
    {
      id: 'pred1',
      gameId: 'game6',
      selectedTeam: 'can',
      confidence: 2,
      points: 20,
      isCorrect: true,
      timestamp: '2025-03-10T19:00:00Z'
    },
    {
      id: 'pred2',
      gameId: 'game7',
      selectedTeam: 'cze',
      confidence: 1,
      points: 10,
      isCorrect: true,
      timestamp: '2025-03-10T20:00:00Z'
    }
  ]
};

// Mock Leaderboard Data
export const leaderboardData: LeaderboardEntry[] = [
  {
    userId: 'user2',
    username: 'PuckMaster',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    points: 210,
    rank: 1,
    streak: 5
  },
  {
    userId: 'user3',
    username: 'IceKing',
    avatarUrl: 'https://i.pravatar.cc/150?img=13',
    points: 185,
    rank: 2,
    streak: 2
  },
  {
    userId: 'user1',
    username: 'HockeyFan99',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    points: 145,
    rank: 3,
    streak: 3
  },
  {
    userId: 'user4',
    username: 'SlapShot',
    avatarUrl: 'https://i.pravatar.cc/150?img=14',
    points: 122,
    rank: 4,
    streak: 0
  },
  {
    userId: 'user5',
    username: 'NetMinder',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    points: 118,
    rank: 5,
    streak: 1
  },
  {
    userId: 'user6',
    username: 'BlueLineDefender',
    avatarUrl: 'https://i.pravatar.cc/150?img=16',
    points: 105,
    rank: 6,
    streak: 0
  },
  {
    userId: 'user7',
    username: 'TopShelf',
    avatarUrl: 'https://i.pravatar.cc/150?img=17',
    points: 98,
    rank: 7,
    streak: 2
  },
  {
    userId: 'user8',
    username: 'HatTrick',
    avatarUrl: 'https://i.pravatar.cc/150?img=18',
    points: 87,
    rank: 8,
    streak: 0
  }
];