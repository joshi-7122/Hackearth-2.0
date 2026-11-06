import type { Person, PersonRole, SocialLink } from '@/types';

const placeholderSocials = (): SocialLink[] => [
  { platform: 'linkedin', url: '[LINKEDIN URL]', label: 'LinkedIn' },
  { platform: 'x', url: '[X URL]', label: 'X (Twitter)' },
];

const person = (role: PersonRole, focus: string[], n: number): Person => ({
  name: `[${role.toUpperCase()} NAME ${n}]`,
  role,
  designation: '[DESIGNATION]',
  company: '[COMPANY]',
  focus,
  bio: '[SHORT BIO — one or two lines on what this person builds and what they can help teams with.]',
  socials: placeholderSocials(),
});

/**
 * Replace with confirmed people. Add `photo: '/people/name.jpg'` (square,
 * ≥ 480px) to show a portrait; otherwise a generated avatar is used.
 */
export const people: Person[] = [
  person('faculty', ['Branch Counselor', 'Advisory'], 1),
  person('faculty', ['Faculty Advisor', 'WIE'], 2),
  person('faculty', ['Faculty Coordinator', 'Academics'], 3),

  person('organizer', ['Lead', 'Operations'], 1),
  person('organizer', ['Tech', 'Platform'], 2),
  person('organizer', ['Design', 'Media'], 3),
  person('organizer', ['Sponsorship', 'Outreach'], 4),
  person('organizer', ['Logistics', 'Hospitality'], 5),
  person('organizer', ['Public Relations', 'Content'], 6),
  person('organizer', ['Event Management', 'Coordination'], 7),
  person('organizer', ['Student Activities', 'Support'], 8),

  person('judge', ['AI/ML', 'Product'], 1),
  person('judge', ['Security', 'Infra'], 2),
  person('judge', ['Venture', 'Startups'], 3),
  person('judge', ['Design', 'UX'], 4),

  person('mentor', ['Backend', 'Cloud'], 1),
  person('mentor', ['Frontend', 'Web'], 2),
  person('mentor', ['Web3', 'Smart contracts'], 3),
  person('mentor', ['Hardware', 'IoT'], 4),

  person('speaker', ['Open source'], 1),
  person('speaker', ['AI agents'], 2),
  person('speaker', ['Careers', 'Hiring'], 3),
  person('speaker', ['Founders'], 4),
];

export const roleTabs: { role: PersonRole; label: string }[] = [
  { role: 'faculty', label: 'Faculty Coordinators' },
  { role: 'organizer', label: 'Organizing Team' },
  { role: 'judge', label: 'Judges' },
  { role: 'mentor', label: 'Mentors' },
  { role: 'speaker', label: 'Speakers' },
];
