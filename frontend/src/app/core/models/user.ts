export interface UserProfile {
  id: string;
  name: string;
  email: string;
  initials: string;
  plan: 'free' | 'pro' | 'enterprise';
  memberSince: Date;
  avatarColor: string;
}

export interface Feedback {
  id: string;
  type: 'suggestion' | 'bug' | 'compliment' | 'other';
  subject: string;
  message: string;
  rating: 'terrible' | 'bad' | 'okay' | 'good' | 'amazing';
  email: string;
  createdAt: Date;
}