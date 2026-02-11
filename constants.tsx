
import React from 'react';
import { Project, Skill } from './types';
import { Layout, Palette, MousePointer2, Smartphone, Monitor, Globe } from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'FinanceFlow',
    category: 'Fintech Mobile App',
    description: 'A revolutionary approach to personal wealth management and crypto tracking.',
    image: 'https://picsum.photos/seed/fin/1200/800',
    tags: ['UI Design', 'UX Research', 'iOS'],
    details: 'FinanceFlow focuses on simplifying complex financial data through intuitive visualization and dark-mode optimization.',
  },
  {
    id: '2',
    title: 'EcoMarket',
    category: 'E-commerce Platform',
    description: 'Sustainability-focused marketplace connecting local artisans with conscious buyers.',
    image: 'https://picsum.photos/seed/eco/1200/800',
    tags: ['Web Design', 'Interaction', 'B2C'],
    details: 'Designed a seamless checkout flow that emphasizes product transparency and environmental impact scores.',
  },
  {
    id: '3',
    title: 'HealthPal',
    category: 'Wellness & Health',
    description: 'AI-driven companion for mental wellness and daily habit tracking.',
    image: 'https://picsum.photos/seed/health/1200/800',
    tags: ['Product Design', 'Micro-interactions'],
    details: 'Created a soothing aesthetic using soft pastel gradients and gamified habit building modules.',
  },
  {
    id: '4',
    title: 'Pulse Studio',
    category: 'SaaS Dashboard',
    description: 'Advanced analytics dashboard for high-growth marketing teams.',
    image: 'https://picsum.photos/seed/dash/1200/800',
    tags: ['Design System', 'B2B', 'Dashboard'],
    details: 'Built a comprehensive design system supporting 50+ unique data widgets and complex filtering states.',
  }
];

export const SKILLS: Skill[] = [
  { name: 'UI Design', level: 95, icon: 'Layout' },
  { name: 'UX Research', level: 88, icon: 'MousePointer2' },
  { name: 'Visual Identity', level: 85, icon: 'Palette' },
  { name: 'Mobile Design', level: 92, icon: 'Smartphone' },
  { name: 'Web Design', level: 90, icon: 'Globe' },
  { name: 'Prototyping', level: 94, icon: 'Monitor' },
];

export const SYSTEM_PROMPT = `
You are Arham's Personal AI Portfolio Assistant. Your job is to help visitors learn about Arham, his work, and his skills as a UI/UX Designer.
Arham is a world-class UI/UX Designer who focuses on user-centric digital experiences.

PROJECTS INFORMATION:
${PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.description} Details: ${p.details}`).join('\n')}

SKILLS INFORMATION:
${SKILLS.map(s => `- ${s.name}: Advanced level`).join('\n')}

STYLE GUIDELINES:
- Be professional, creative, and enthusiastic.
- Use short, concise sentences.
- If someone asks for Arham's contact, mention he is available via LinkedIn and Email.
- Do not make up projects that aren't listed above.
- If asked about something you don't know, suggest they view the full projects section.
- You speak as "Arham's Assistant", not Arham himself.
`;
