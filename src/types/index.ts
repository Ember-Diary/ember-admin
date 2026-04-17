export interface User {
  id: string;
  email: string;
  nickname: string;
  subscription: "free" | "premium";
  created_at: string;
}

export interface EmotionTag {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface Fortune {
  id: string;
  user_id: string;
  content: string;
  emotion_tag: string;
  created_at: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeSessions: number;
  diaryCount: number;
  fortuneCount: number;
}
