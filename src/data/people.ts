import type { Person, PersonRole } from '@/types';

const person = (role: PersonRole, n: number): Person => ({
  name: `[${role.toUpperCase()} NAME ${n}]`,
  role,
  designation: '[POSITION]',
  linkedin: '[LINKEDIN URL]',
});

/** Organizer with a photo at /public/people/<slug>.webp; LinkedIn stays a placeholder until supplied. */
const organizer = (name: string, designation: string, slug: string, linkedin = '[LINKEDIN URL]'): Person => ({
  name,
  role: 'organizer',
  designation,
  photo: `/people/${slug}.webp`,
  linkedin,
});

/**
 * Replace with confirmed people, e.g.
 * { name: 'Jane Doe', role: 'organizer', designation: 'Tech Lead', photo: '/people/jane-doe.webp', linkedin: 'https://www.linkedin.com/in/janedoe' }
 * Photos: portrait (4:5), ≥ 600px wide, in /public/people/. Without `photo` a generated avatar is shown.
 */
export const people: Person[] = [
  ...[1, 2, 3].map((n) => person('faculty', n)),
  organizer('Jatin Rathore', 'Organizer - CIS', 'jatin-rathore', 'https://www.linkedin.com/in/jatin-rathore-19610b411/'),
  organizer('Aryan Joshi', 'Organizer - CIS', 'aryan-joshi', 'https://www.linkedin.com/in/aryan-joshi-71a9a620b/'),
  organizer('Yatharth Saxena', 'Organizer - CIS', 'yatharth-saxena', 'https://www.linkedin.com/in/yatharthsaxena01/'),
  organizer('Arnav Maitrey', 'Organizer - CIS', 'arnav-maitrey', 'https://www.linkedin.com/in/arnav-maitrey-374156386/'),
  organizer('Rishabh Asthana', 'Organizer - CIS', 'rishabh-asthana', 'https://www.linkedin.com/in/rishabh-asthana-506814331/'),
  organizer('Priyanshi Chaubey', 'Organizer - WIE', 'priyanshi-chaubey', 'https://www.linkedin.com/in/priyanshi-chaubey-90b46b373/'),
  organizer('Kinjal Singh', 'Organizer - WIE', 'kinjal-singh', 'https://www.linkedin.com/in/kinjal-singh-040776322/'),
  organizer('Dhwani Sharma', 'Organizer - WIE', 'dhwani-sharma', 'https://www.linkedin.com/in/dhwani-sharma-a01a37372/'),
  organizer('Shriya Pandey', 'Organizer - WIE', 'shriya-pandey', 'https://www.linkedin.com/in/shriya-pandey-471175366/'),
  organizer('Shruti Verma', 'Organizer - WIE', 'shruti-verma', 'https://www.linkedin.com/in/shruti-verma-609050350/'),
  organizer('Tarun Kushwaha', 'Web Master - IEEE GUSB', 'tarun-kushwaha', 'https://www.linkedin.com/in/tarun-kushwaha-984b63326/'),
  organizer('Atharav Singh', 'Treasurer - IEEE GUSB', 'atharav-singh', 'https://www.linkedin.com/in/atharav-singh-4163b0381/'),
  organizer('Kritika Jha', 'Vice Chairperson - IEEE GUSB', 'kritika-jha', 'https://www.linkedin.com/in/kritika-jha-60a1752b4/'),
  organizer('Mohammad Rahil', 'Secretary - IEEE GUSB', 'mohammad-rahil', 'https://www.linkedin.com/in/mohammad-rahil-1271a5328/'),
  organizer('Ansh Vashisth', 'Chairperson - IEEE GUSB', 'ansh-vashisth', 'https://www.linkedin.com/in/ansh-vashisth00/'),
  ...[1, 2, 3, 4].map((n) => person('judge', n)),
  ...[1, 2, 3, 4].map((n) => person('mentor', n)),
  ...[1, 2, 3, 4].map((n) => person('speaker', n)),
];

/** Text printed in the bottom band of each person's card template. */
export const roleLabels: Record<PersonRole, string> = {
  faculty: 'Faculty Coordinator',
  organizer: 'Organizer',
  judge: 'Judge',
  mentor: 'Mentor',
  speaker: 'Speaker',
};

export const roleTabs: { role: PersonRole; label: string }[] = [
  { role: 'faculty', label: 'Faculty Coordinators' },
  { role: 'organizer', label: 'Organizing Team' },
  { role: 'judge', label: 'Judges' },
  { role: 'mentor', label: 'Mentors' },
  { role: 'speaker', label: 'Speakers' },
];
