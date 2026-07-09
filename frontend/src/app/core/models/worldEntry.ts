export interface WorldEntry {

  id: string;
  title: string;
  description: string;
  category: 'location' | 'faction' | 'culture' | 'magic' | 'creature' | 'lore';
  coverEmoji: string;
  coverClass: string;
  tags: string[];
  story: string;
  linkedCount: number;
  linkedLabel: string;
  location: string | null;
  rules: string[];
  threat: 'low' | 'medium' | 'high' | null;
  rarity: 'common' | 'rare' | 'legendary' | null;
  dateLabel: string;
  createdAt: Date;
  
}