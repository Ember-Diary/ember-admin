export interface User {
  id: string;
  email: string;
  name: string | null;
  nickname: string | null;
  birth_date: string | null;
  subscription_tier: 'free' | 'premium';
  onboarding_completed: boolean;
  created_at: string;
}

export interface EmotionTag {
  id: string;
  name: string;
  category: 'positive' | 'negative' | 'neutral';
  icon: string | null;
  color: string | null;
}

export interface DailyFortune {
  id: string;
  birth_date: string;
  fortune_date: string;
  emotion_score: number | null;
  relation_score: number | null;
  execution_score: number | null;
  overall_message: string | null;
  created_at: string;
}

export interface DashboardStats {
  totalUsers: number | null;
  activeSessions: number | null;
  diaryCount: number | null;
  fortuneCount: number | null;
}
