import type { PastEvent } from '@/types';

/** Past events run by the organizing team — copy and photos from the official deck. */
export const pastEvents: PastEvent[] = [
  {
    title: 'WIE HackEarth',
    tag: 'Flagship hackathon',
    description:
      'The first edition — a flagship hackathon by the IEEE WIE Affinity Group, Galgotias University, bringing innovators together to build technology-driven solutions to real-world challenges.',
    image: '/events/wie-hackearth.webp',
  },
  {
    title: 'Vibeathon',
    tag: '8-hour offline hackathon',
    description:
      'Innovators tackled real-world challenges through AI-assisted development, with diverse tracks, expert mentorship, technical support and networking.',
    image: '/events/vibeathon.webp',
    stat: { value: '1,000+', label: 'registrations' },
  },
  {
    title: 'SAMARTHYA',
    tag: 'IEEE Week 2026',
    description:
      'Organized by the IEEE Student Branch with IEEE WIE — sessions on leadership, teamwork and community engagement.',
    image: '/events/samarthya.webp',
    stat: { value: '500+', label: 'registrations' },
  },
  {
    title: 'HERTECH',
    tag: 'IEEE Week 2026',
    description:
      'Celebrating women’s empowerment, entrepreneurship and leadership, featuring Dr. Khushboo Singh, Founder & CEO of Aarya Fashions.',
    image: '/events/hertech.webp',
    stat: { value: '400+', label: 'participants' },
  },
  {
    title: 'ICCSAI 2025',
    tag: 'International conference',
    description:
      '3rd International Conference on Communication, Security & Artificial Intelligence — researchers, academics, industry and students on AI, communication and cybersecurity.',
    image: '/events/iccsai.webp',
  },
  {
    title: 'The Problem Protocol',
    tag: 'Innovation challenge',
    description:
      'Decode real-world problems, adapt to changing constraints and pitch solutions — critical thinking and teamwork under pressure.',
    image: '/events/problem-protocol.webp',
  },
];

