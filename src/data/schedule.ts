import type { JourneyStep, ScheduleItem } from '@/types';

/** Official rounds and dates (IST). */
export const schedule: ScheduleItem[] = [
  {
    round: 'Round 1',
    short: 'Register',
    phase: 'Registration',
    date: '2 Nov – 16 Nov 2026',
    time: '12:00 PM → 11:59 PM',
    description: 'Register your team on Unstop and prepare for the PPT submission round.',
    points: [
      'Two to four members per team, with at least one female member',
      'Sign up on the Unstop portal before the deadline',
    ],
  },
  {
    short: 'Submission',
    phase: 'PPT Submission Round',
    date: '10 Nov – 13 Nov 2026',
    description: 'Teams submit their idea presentation using the official template on Unstop.',
    points: [
      'Use the official PPT template — download the template directly from Google Drive',
      'Keep the submission clear, complete and structured as per the template',
    ],
    link: {
      label: 'Download official PPT template',
      url: 'https://drive.google.com/file/d/1-98uQD81STJkyee2JYeBX1UJMwK3RQ3N/view?usp=share_link',
    },
  },
  {
    short: 'Screening',
    phase: 'PPT Screening Round',
    date: '14 Nov – 17 Nov 2026',
    description: 'The organizing team reviews every submission.',
    points: ['Shortlisting is based on the quality and potential of the idea — innovation, feasibility, relevance and impact'],
  },
  {
    short: 'Results',
    phase: 'Final Result Announcement',
    date: '17 Nov – 18 Nov 2026',
    description: 'Shortlisted teams are announced and receive instructions for the final round.',
  },
  {
    round: 'Round 2',
    short: 'Final',
    phase: 'Final offline hackathon',
    date: '29 – 30 Nov 2026',
    time: '28 hrs · 12:00 PM onwards',
    description: 'Shortlisted teams build their solutions on campus at Galgotias University, Greater Noida.',
    points: ['Further details are shared directly with shortlisted teams'],
  },
];

export const journey: JourneyStep[] = [
  {
    title: 'Form your team',
    description: 'Two to four members — and every team includes at least one female member.',
    icon: 'users',
  },
  {
    title: 'Register on Unstop',
    description: 'Sign up during the registration window, 2–16 November 2026.',
    icon: 'pen',
  },
  {
    title: 'Join the WhatsApp group',
    description: 'Mandatory — all updates and announcements are shared there.',
    icon: 'whatsapp',
  },
  {
    title: 'Submit your PPT',
    description: 'Present your idea using the official template on the Unstop page.',
    icon: 'upload',
    link: {
      label: 'Download PPT template',
      url: 'https://drive.google.com/file/d/1-98uQD81STJkyee2JYeBX1UJMwK3RQ3N/view?usp=share_link',
    },
  },
  {
    title: 'Get shortlisted',
    description: 'Ideas are screened for innovation, feasibility, relevance and impact.',
    icon: 'check',
  },
  {
    title: 'Build at the final',
    description: 'A 28-hour build at the offline final — 29 Nov, 12:00 PM onwards.',
    icon: 'code',
  },
  {
    title: 'Win',
    description: 'Compete for a prize pool of up to ₹1,00,000 — and goodies for the Top 20.',
    icon: 'trophy',
  },
];
