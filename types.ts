export interface Question {
  id: number;
  title: string;
  description: string; // The text from the card
  options: string[];
  correctAnswer: number; // Index of the correct option
  category: 'Cloud' | 'Mobile' | 'AI' | 'Web' | 'Data';
}

export type RankTier = 'DevFest Init' | 'DevFest Smart' | 'DevFest Ninja' | 'DevFest Champion';

export interface Player {
  id?: string;
  name: string;
  score: number;
  tier: RankTier;
  timestamp: number;
}

export interface GameState {
  status: 'welcome' | 'playing' | 'result' | 'leaderboard';
  currentQuestionIndex: number;
  score: number;
  playerName: string;
  answers: boolean[]; // track correct/incorrect history
}