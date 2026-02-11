
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  details: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}
