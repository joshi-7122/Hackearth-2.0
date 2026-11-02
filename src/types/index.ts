import type { IconName } from '@/components/ui/Icon';

/**
 * Any string wrapped in square brackets — e.g. "[EVENT DATE]" — is treated as
 * an organizer placeholder. It renders with a distinct style so unfinished
 * content is obvious, and it is never turned into a live link.
 */
export type Text = string;

export type Accent = 'brand' | 'violet' | 'leaf' | 'indigo';

export interface NavItem {
  id: string;
  label: string;
}

export interface Stat {
  /** Numeric value animates as a counter. A string renders as-is. */
  value: number | Text;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface HackathonInfo {
  /** Short brand prefix shown in magenta, e.g. "WIE". */
  prefix: string;
  name: string;
  edition: string;
  year: string;
  /** Official deck title. */
  title: string;
  tagline: string;
  /** Deck strapline: "Reimagining Technology · Empowering Change". */
  strapline: string;
  /** Official theme statement. */
  theme: string;
  description: Text;
  date: Text;
  dateShort: Text;
  /** ISO start (with timezone) — drives the countdown. */
  startDate: string;
  endDate: string;
  startTime: string;
  durationLabel: string;
  mode: Text;
  venue: Text;
  venueShort: Text;
  address: Text;
  mapUrl: Text;
  teamSize: Text;
  /** Headline prize figure, e.g. "₹1,00,000". */
  prizePool: Text;
  /** How the figure is qualified, e.g. "Up to". */
  prizePoolQualifier: string;
  organizer: Text;
  contactEmail: Text;
  contactPhone: { number: Text; name: Text; role: Text };
  registration: {
    /** Absolute URL to the registration page. Leave as a placeholder until live. */
    url: Text;
    /** Where teams register, e.g. "Unstop". */
    platform: string;
    /** ISO timestamps (with timezone). Status labels are computed from these. */
    opensAt: string;
    closesAt: string;
    deadline: Text;
  };
  /** Mandatory community group for updates. */
  whatsappUrl: Text;
  siteUrl: Text;
}

export interface Organizer {
  name: string;
  role: 'Organizer' | 'Co-organizer' | 'Host institution' | 'In collaboration with' | 'Affiliation';
  /** Path under /public */
  logo: string;
  /** Rendered height in px — logos have very different aspect ratios. */
  height: number;
}

export interface PastEvent {
  title: string;
  tag: string;
  description: string;
  /** Path under /public */
  image: string;
  stat?: { value: string; label: string };
}

export interface Reason {
  word: string;
  title: string;
  description: string;
  icon: IconName;
}

export type Difficulty = 1 | 2 | 3;

export interface Challenge {
  id: string;
  title: string;
  short: string;
  problem: Text;
  difficulty: Difficulty;
  technologies: string[];
  icon: IconName;
  accent: Accent;
}

export interface Prize {
  rank: 1 | 2 | 3;
  title: string;
  amount: Text;
  perks?: Text[];
}

export interface SpecialAward {
  title: string;
  description: string;
  amount: Text;
  icon: IconName;
}

export interface ScheduleItem {
  phase: string;
  /** Short label for the map nav, e.g. "Register". */
  short?: string;
  /** Optional round label, e.g. "Round 1". */
  round?: string;
  date: Text;
  time?: Text;
  description: string;
  points?: string[];
}

export interface JourneyStep {
  title: string;
  description: string;
  icon: IconName;
}

export type SponsorTier = 'title' | 'gold' | 'silver' | 'community' | 'tech';

export interface Sponsor {
  name: Text;
  tier: SponsorTier;
  /** Path under /public (e.g. "/sponsors/acme.svg"). Omit to show a placeholder mark. */
  logo?: string;
  url?: Text;
}

export interface SocialLink {
  platform: 'x' | 'linkedin' | 'github' | 'instagram' | 'discord' | 'website' | 'youtube' | 'whatsapp';
  url: Text;
  label: string;
}

export type PersonRole = 'judge' | 'mentor' | 'speaker' | 'organizer';

export interface Person {
  name: Text;
  role: PersonRole;
  designation: Text;
  company: Text;
  /** Path under /public. Omit to render a generated avatar. */
  photo?: string;
  focus: string[];
  bio: Text;
  socials: SocialLink[];
}

export interface Faq {
  question: string;
  answer: Text;
}
