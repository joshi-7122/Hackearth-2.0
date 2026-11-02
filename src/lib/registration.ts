import { useEffect, useState } from 'react';
import { hackathonInfo } from '@/data/hackathon';

export type RegistrationState = 'upcoming' | 'open' | 'closed';

export interface RegistrationStatus {
  state: RegistrationState;
  /** Short label for pills and chips. */
  label: string;
  /** Whole days until registration closes (open) or opens (upcoming). */
  days: number | null;
}

const DAY = 86_400_000;

/** Derives the registration state from the configured open/close timestamps. */
export function getRegistrationStatus(now = Date.now()): RegistrationStatus {
  const opens = new Date(hackathonInfo.registration.opensAt).getTime();
  const closes = new Date(hackathonInfo.registration.closesAt).getTime();
  if (now < opens) {
    return { state: 'upcoming', label: 'Registrations open 2 Nov, 12 PM', days: Math.ceil((opens - now) / DAY) };
  }
  if (now <= closes) {
    return { state: 'open', label: 'Registrations open · closes 16 Nov', days: Math.ceil((closes - now) / DAY) };
  }
  return { state: 'closed', label: 'Registrations closed', days: null };
}

/** Re-evaluates every minute so the UI flips state without a reload. */
export function useRegistrationStatus(): RegistrationStatus {
  const [status, setStatus] = useState(() => getRegistrationStatus());
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getRegistrationStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
