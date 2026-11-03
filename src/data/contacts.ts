import type { ContactGroup } from '@/types';

/** Organizing-team contacts, grouped by IEEE branch / society. */
export const contactGroups: ContactGroup[] = [
  {
    name: 'IEEE Galgotias University Student Branch',
    short: 'IEEE GU SB',
    role: 'Host student branch',
    logo: '/logos/gu-ieee-sb.webp',
    logoHeight: 30,
    people: [
      { name: 'Ansh Vashisth', role: 'Chairperson', phone: '+91 70171 23652' },
      { name: 'Kritika Jha', role: 'Vice Chairperson', phone: '+91 82528 67595' },
      { name: 'Atharav Singh', role: 'Treasurer', phone: '+91 78178 93220' },
      { name: 'Tarun Kushwaha', role: 'Tech Lead', phone: '+91 99173 37603' },
    ],
  },
  {
    name: 'IEEE Women in Engineering (WIE)',
    short: 'IEEE WIE',
    role: 'Organizer',
    logo: '/logos/ieee-wie.webp',
    logoHeight: 36,
    people: [
      { name: 'Priyanshi Chaubey', role: 'Organizer', phone: '+91 94500 53281' },
      { name: 'Kinjal Singh', role: 'Organizer', phone: '+91 96369 26625' },
    ],
  },
  {
    name: 'IEEE Computational Intelligence Society',
    short: 'IEEE CIS',
    role: 'Co-organizer',
    logo: '/logos/cis.webp',
    logoHeight: 30,
    people: [
      { name: 'Arnav Maitrey', role: 'Co-organizer', phone: '+91 82670 93543' },
      { name: 'Aryan Joshi', role: 'Co-organizer', phone: '+91 93153 98975' },
    ],
  },
];

/** "+91 70171 23652" → "tel:+917017123652" */
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;
