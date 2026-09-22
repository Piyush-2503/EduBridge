import React, { useState } from 'react';
import { GlobalPortalHeader, ActivePortal } from './components/GlobalPortalHeader';
import { PortalType } from './portals/landing/types';

// Portal Applications
import LandingApp from './portals/landing/App';
import StudentApp from './portals/student/App';
import AcademiaApp from './portals/academia/App';
import IndustryApp from './portals/industry/App';

export default function App() {
  const [activePortal, setActivePortal] = useState<ActivePortal>('landing');
  const [initialAuthPortal, setInitialAuthPortal] = useState<PortalType | null>(null);

  const handleSelectPortal = (portal: ActivePortal) => {
    if (portal === 'landing') {
      setActivePortal('landing');
      setInitialAuthPortal(null);
    } else {
      // Require Sign Up / Validation first
      setInitialAuthPortal(portal);
      setActivePortal('landing');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-[#111844]">
      {/* Unified Global Portal Top Header */}
      <GlobalPortalHeader
        activePortal={activePortal}
        onSelectPortal={handleSelectPortal}
      />

      {/* Render Active Portal Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {activePortal === 'landing' && (
          <LandingApp
            key={initialAuthPortal || 'landing'}
            initialPortal={initialAuthPortal}
            onLaunchPortal={(portal) => {
              if (portal === 'student') setActivePortal('student');
              else if (portal === 'academia') setActivePortal('academia');
              else if (portal === 'industry') setActivePortal('industry');
              setInitialAuthPortal(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePortal === 'student' && <StudentApp />}

        {activePortal === 'academia' && <AcademiaApp />}

        {activePortal === 'industry' && <IndustryApp />}
      </div>
    </div>
  );
}
