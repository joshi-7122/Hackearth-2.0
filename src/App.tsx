import { useCallback, useState } from 'react';
import { Footer } from '@/components/Footer';
import { HeroBackdrop } from '@/components/HeroBackdrop';
import { Navbar } from '@/components/Navbar';
import { Preloader } from '@/components/Preloader';
import { Marquee } from '@/components/ui/Marquee';
import { About } from '@/sections/About';
import { Challenges } from '@/sections/Challenges';
import { Experience } from '@/sections/Experience';
import { Faq } from '@/sections/Faq';
import { Hero } from '@/sections/Hero';
import { Legacy } from '@/sections/Legacy';
import { Organizers } from '@/sections/Organizers';
import { People } from '@/sections/People';
import { Prizes } from '@/sections/Prizes';
import { RegisterCTA } from '@/sections/RegisterCTA';
import { Rules } from '@/sections/Rules';
import { Schedule } from '@/sections/Schedule';
import { Sponsors } from '@/sections/Sponsors';
import { Travel } from '@/sections/Travel';
import { WhyParticipate } from '@/sections/WhyParticipate';

export default function App() {
  const [ready, setReady] = useState(false);
  const onBooted = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onDone={onBooted} />
      <Navbar />
      <main id="main">
        {/* Hero + organizers share one backdrop so they read as a single scene */}
        <div className="relative isolate overflow-hidden">
          <HeroBackdrop />
          <Hero ready={ready} />
          <Organizers />
        </div>
        <About />
        <WhyParticipate />
        <Challenges />
        <Experience />
        <Schedule />
        <Rules />
        <Travel />
        <Prizes />
        <People />
        <Legacy />
        <Sponsors />
        <Faq />
        <Marquee />
        <RegisterCTA />
      </main>
      <Footer />
    </>
  );
}
