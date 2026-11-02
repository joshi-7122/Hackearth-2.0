import type { Sponsor } from '@/types';

/**
 * Community partners shown in the Partners section.
 * To add a real partner: drop the logo in /public/sponsors/ and replace an
 * entry, e.g. { name: 'Acme Dev Club', tier: 'community', logo: '/sponsors/acme.svg', url: 'https://acme.dev' }.
 * Entries without `logo` render a neutral placeholder mark.
 */
export const sponsors: Sponsor[] = [
  { name: '[COMMUNITY PARTNER 1]', tier: 'community' },
  { name: '[COMMUNITY PARTNER 2]', tier: 'community' },
  { name: '[COMMUNITY PARTNER 3]', tier: 'community' },
  { name: '[COMMUNITY PARTNER 4]', tier: 'community' },
];
