import type { Prize, SpecialAward } from '@/types';

/**
 * The official prize pool is "up to ₹1,00,000". The split between places
 * hasn't been announced yet — replace the bracketed amounts when it is.
 */
export const prizes: Prize[] = [
  { rank: 1, title: 'Winner', amount: 'To Be Announced' },
  { rank: 2, title: 'Runner-up', amount: 'To Be Announced' },
  { rank: 3, title: 'Second runner-up', amount: 'To Be Announced' },
];

/** Official perks & awards (from the event brief). */
export const specialAwards: SpecialAward[] = [
  {
    title: 'Prize pool',
    description: 'Compete for a prize pool of up to ₹1 lakh on a platform built around technology, sustainability and impact.',
    amount: 'Up to ₹1,00,000',
    icon: 'trophy',
  },
  {
    title: 'Goodies for the Top 20',
    description: 'The Top 20 performers at the final offline hackathon receive exciting goodies.',
    amount: 'Top 20',
    icon: 'gift',
  },
  {
    title: 'Build. Innovate. Make an impact.',
    description: 'Work alongside fellow innovators and take your idea from concept to creation in an innovation-driven environment.',
    amount: '',
    icon: 'spark',
  },
];
