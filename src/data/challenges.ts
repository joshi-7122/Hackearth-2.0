import type { Challenge } from '@/types';

/**
 * The official focus areas of WIE HackEarth 2.0. The example challenges and
 * suggested stacks are starting points to spark ideas — not official problem
 * statements.
 */
export const challenges: Challenge[] = [
  {
    id: 'ai',
    title: 'AI & Emerging Technologies',
    short: 'Intelligent systems that solve real problems.',
    problem:
      'Build an AI-powered tool that removes a real barrier for a specific community — and show measurable impact with a before/after.',
    difficulty: 3,
    technologies: ['Python', 'LLMs', 'RAG', 'Computer vision', 'Agents'],
    icon: 'brain',
    accent: 'brand',
  },
  {
    id: 'security',
    title: 'Cybersecurity & Digital Safety',
    short: 'Protect people online, not just systems.',
    problem:
      'Create a tool that helps people — especially women and first-time internet users — detect, understand or recover from online threats, scams or harassment.',
    difficulty: 3,
    technologies: ['Threat detection', 'Cryptography', 'NLP', 'Browser extensions'],
    icon: 'shield',
    accent: 'indigo',
  },
  {
    id: 'sustainability',
    title: 'Sustainable Engineering',
    short: 'Technology for a planet under pressure.',
    problem:
      'Build something that measurably reduces waste, emissions or resource use — and makes that impact visible to the people involved.',
    difficulty: 2,
    technologies: ['IoT', 'Maps & geo', 'Data pipelines', 'Embedded'],
    icon: 'leaf',
    accent: 'leaf',
  },
  {
    id: 'human',
    title: 'Human-Centred Problem Solving',
    short: 'Start with people, end with impact.',
    problem:
      'Pick a real everyday struggle — in education, work, mobility or public services — and design a solution shaped around the people who live it.',
    difficulty: 1,
    technologies: ['Web', 'Accessibility', 'Design thinking', 'Any stack'],
    icon: 'users',
    accent: 'brand',
  },
];

export const difficultyLabel: Record<Challenge['difficulty'], string> = {
  1: 'Open to all',
  2: 'Intermediate',
  3: 'Advanced',
};
