export interface ChapterCharacter {
  name: string;
  initials: string;
  color: string;
  role: string;
}

export interface LinkedEvent {
  name: string;
  impact: 'major' | 'minor';
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  content: string;
  wordCount: number;
  charCount: number;
  status: 'done' | 'writing' | 'empty';
  act: string;
  story: string;
  pov: string;
  genre: string;
  tone: string;
  characters: ChapterCharacter[];
  linkedEvents: LinkedEvent[];
  notes: string;
  createdAt: Date;
}