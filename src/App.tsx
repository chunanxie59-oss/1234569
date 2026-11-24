import {useState} from 'react';
import {AeroComparison} from './components/AeroComparison';
import {BuildDossier} from './components/BuildDossier';
import {EngineTelemetry} from './components/EngineTelemetry';
import {Footer} from './components/Footer';
import {HeroStage} from './components/HeroStage';
import {Navbar} from './components/Navbar';
import {SpecStageId} from './data/gt86Data';

export default function App() {
  const [activeHeroSpec, setActiveHeroSpec] = useState<SpecStageId>('track');
  const [inspectedSpec, setInspectedSpec] = useState<SpecStageId | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#090A0D] text-[#F4F4F5]">
      <Navbar onJumpToCompare={() => scrollToSection('aero-comparison')} />
      <main>
        <HeroStage
          activeSpec={activeHeroSpec}
          onSelectSpec={setActiveHeroSpec}
          onInspectImage={setInspectedSpec}
          onJumpToEngine={() => scrollToSection('engine-telemetry')}
        />
        <AeroComparison
          inspectedSpec={inspectedSpec}
          onInspectSpec={setInspectedSpec}
        />
        <EngineTelemetry />
        <BuildDossier />
      </main>
      <Footer />
    </div>
  );
}
