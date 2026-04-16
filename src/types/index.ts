export interface User {
  id: string;
  email: string;
  display_name: string | null;
  is_admin: boolean;
  subscription_status: "free" | "premium" | "expired";
  created_at: string;
  updated_at: string;
}

export interface EmotionTag {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  usage_count: number;
  created_at: string;
}

export interface Fortune {
  id: string;
  user_id: string;
  content: string;
  type: string;
  created_at: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeSessions: number;
  todayDiaries: number;
  todayFortunes: number;
}
