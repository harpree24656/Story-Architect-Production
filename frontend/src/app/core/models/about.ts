export interface MissionCard {
  icon: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  event: string;
  active: boolean;
}

export interface StatBlock {
  number: string;
  label: string;
}

export interface TeamLink {
  label: string;
  url: string;
}

export interface TeamMember {
  name: string;
  initials: string;
  role: string;
  bio: string;
  avatarColor: string;
  links: TeamLink[];
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}