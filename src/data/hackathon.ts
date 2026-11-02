import type { HackathonInfo, NavItem, Organizer, Reason, SocialLink, Stat } from '@/types';

/**
 * Single source of truth for event facts.
 * Facts below come from the official "WIE HackEarth 2026: Reimagined" deck.
 * Anything still "[BRACKETED]" is unconfirmed — it renders highlighted on the
 * site so nothing unfinished slips through.
 */
export const hackathonInfo: HackathonInfo = {
  prefix: 'WIE',
  name: 'HackEarth',
  edition: '2.0',
  year: '2026',
  title: 'WIE HackEarth 2026: Reimagined',
  tagline: 'Build. Break. Rebuild.',
  strapline: 'Reimagining Technology · Empowering Change',
  theme: 'Empowering Women. Engineering a Sustainable, Intelligent Future.',
  description:
    'A pan-India hackathon for innovators ready to reimagine technology and engineer a sustainable, intelligent future — turning real-world challenges into practical, human-centred solutions.',
  date: '29–30 November 2026',
  dateShort: '29–30 Nov',
  /** Local start date (IST) — drives the countdown. */
  startDate: '2026-11-29T12:00:00+05:30',
  /** 24-hour hackathon: ends at noon on 30 Nov (IST). */
  endDate: '2026-11-30T12:00:00+05:30',
  startTime: '12:00 PM onwards',
  durationLabel: '24 hrs',
  mode: 'Pan-India · Offline final',
  venue: 'Galgotias University, Greater Noida',
  venueShort: 'Galgotias University',
  address:
    'Plot No. 2, Yamuna Expressway, Opposite Buddha International Circuit, Sector 17A, Greater Noida, Uttar Pradesh 203201',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Galgotias+University+Greater+Noida',
  teamSize: '2–4 members',
  prizePool: '₹1,00,000',
  prizePoolQualifier: 'Up to',
  organizer: 'IEEE WIE Affinity Group · IEEE Galgotias University Student Branch',
  contactEmail: 'ieeegusb@galgotiasuniversity.edu.in',
  contactPhone: {
    number: '+91 78178 93220',
    name: 'Atharav Singh',
    role: 'Treasurer, IEEE GU SB',
  },
  registration: {
    url: 'https://unstop.com/p/wie-hackearth-20-galgotias-university-gu-greater-noida-1790097',
    platform: 'Unstop',
    opensAt: '2026-11-02T12:00:00+05:30',
    closesAt: '2026-11-16T23:59:00+05:30',
    deadline: '16 November 2026, 11:59 PM',
  },
  whatsappUrl: 'https://chat.whatsapp.com/CuMbyBmrdeXDpoHyE25dLj',
  siteUrl: '[SITE URL]',
};

export const organizers: Organizer[] = [
  { name: 'IEEE Women in Engineering (WIE) Affinity Group', role: 'Organizer', logo: '/logos/ieee-wie.webp', height: 44 },
  { name: 'IEEE Galgotias University Student Branch', role: 'Organizer', logo: '/logos/gu-ieee-sb.webp', height: 36 },
  { name: 'IEEE Computational Intelligence Society', role: 'Co-organizer', logo: '/logos/cis.webp', height: 34 },
  { name: 'Medhasphere — Departmental Club of AI/ML', role: 'In collaboration with', logo: '/logos/medhasphere.webp', height: 52 },
  { name: 'Galgotias University', role: 'Host institution', logo: '/logos/galgotias.webp', height: 26 },
  { name: 'IEEE', role: 'Affiliation', logo: '/logos/ieee.webp', height: 28 },
  { name: 'IEEE UP Section (India)', role: 'Affiliation', logo: '/logos/ieee-up.webp', height: 30 },
  { name: 'IEEE WIE UP Section (India)', role: 'Affiliation', logo: '/logos/wie-up.webp', height: 48 },
];

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'challenges', label: 'Tracks' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'legacy', label: 'Past events' },
  { id: 'sponsors', label: 'Partners' },
  { id: 'faq', label: 'FAQ' },
];

/** At-a-glance facts shown under the About section. */
export const stats: Stat[] = [
  { value: '29–30 Nov', label: 'Date' },
  { value: 24, suffix: 'hrs', label: 'Hackathon' },
  { value: '12:00 PM', label: 'Onwards' },
  { value: 'Pan‑India', label: 'Reach for 2026' },
];

export const reasons: Reason[] = [
  {
    word: 'Build',
    title: 'Ship a working prototype',
    description:
      'Go from a problem statement to something that runs — not slides, not mockups.',
    icon: 'hammer',
  },
  {
    word: 'Innovate',
    title: 'Solve problems that matter',
    description:
      'AI, digital safety, sustainability and human-centred tech — challenges with real social and environmental impact.',
    icon: 'bulb',
  },
  {
    word: 'Lead',
    title: 'Move from participation to leadership',
    description:
      'WIE HackEarth exists so women innovators don’t just take part in tech — they shape where it goes.',
    icon: 'spotlight',
  },
  {
    word: 'Connect',
    title: 'Build alongside fellow innovators',
    description:
      'Work with students, developers and problem-solvers from across India in an innovation-driven hackathon environment.',
    icon: 'nodes',
  },
  {
    word: 'Win',
    title: 'Compete for up to ₹1,00,000',
    description: 'A prize pool of up to ₹1 lakh, plus exciting goodies for the Top 20 performers at the final.',
    icon: 'trophy',
  },
];

export const socialLinks: SocialLink[] = [
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/ieee-gu/home/', label: 'LinkedIn' },
  { platform: 'instagram', url: 'https://www.instagram.com/ieeegusb?utm_source=ig_web_button_share_sheet&vrfl=ZDNlZDc0MzIxNw==', label: 'Instagram' },
  { platform: 'whatsapp', url: 'https://chat.whatsapp.com/CuMbyBmrdeXDpoHyE25dLj', label: 'WhatsApp group' },
];

export const marqueeWords = ['Build', 'Innovate', 'Lead', 'Reimagine', 'Empower'];

