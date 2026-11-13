import type { Sponsor } from '@/types';

/**
 * Community partners shown in the Partners section (scrolling logo band).
 * To add a partner: drop the logo in /public/sponsors/ and add an entry, e.g.
 * { name: 'Acme Dev Club', tier: 'community', logo: '/sponsors/acme.webp', bg: '#000', url: 'https://acme.dev' }.
 * `bg` should match the logo's own background so the tile looks seamless.
 */
export const sponsors: Sponsor[] = [
  { name: 'GRID', tier: 'community', logo: '/sponsors/grid.webp', bg: '#000' },
  { name: 'NEXIDO', tier: 'community', logo: '/sponsors/nexido.webp', bg: '#000' },
  { name: 'The Code Vibe', tier: 'community', logo: '/sponsors/the-code-vibe.webp', bg: '#000' },
  { name: 'CampusUnite', tier: 'community', logo: '/sponsors/campusunite.webp', bg: '#fdfbf7' },
  { name: 'Vortex Robotics', tier: 'community', logo: '/sponsors/vortex-robotics.webp', bg: '#000' },
];
