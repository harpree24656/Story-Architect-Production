export interface NodeCharacter {
  name: string;
  initials: string;
  color: string;
}

export interface ConnectedEvent {
  name: string;
  impact: 'major' | 'minor';
}

export interface MapNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'chapter' | 'event' | 'character' | 'location' | 'twist';
  status: 'done' | 'writing' | 'empty';
  act: string;
  story: string;
  chapter: number | null;
  wordCount: number;
  description: string;
  characters: NodeCharacter[];
  connectedEvents: ConnectedEvent[];
  connectedNodes: string[];
  x: number;
  y: number;
  createdAt: Date;
}

export interface MapConnector {
  id: string;
  direction: 'horizontal' | 'vertical';
  x: number;
  y: number;
  length: number;
}