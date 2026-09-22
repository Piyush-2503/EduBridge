import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TrustMetrics } from './components/TrustMetrics';
import { EcosystemProcess } from './components/EcosystemProcess';
import { FeaturesSection } from './components/FeaturesSection';
import { PortalSection } from './components/PortalSection';
import { LoginView } from './components/LoginView';
import { Footer } from './components/Footer';
import { ActiveView, PortalType } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [selectedPortal, setSelectedPortal] = useState<PortalType>('student');

  const handleSelectPortal = (portal: PortalType) => {
    setSelectedPortal(portal);
    setActiveView(`login-${portal}` as ActiveView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setActiveView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#4B5694]/20 selection:text-[#111844]">
      {/* Modern University Innovation Platform Navbar */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        onScrollToPortals={() => scrollToId('portals')}
        onScrollToAbout={() => scrollToId('about')}
        onScrollToFeatures={() => scrollToId('features')}
        onScrollToEcosystem={() => scrollToId('ecosystem')}
      />

      {/* Main Content */}
      {activeView === 'landing' ? (
        <main className="flex-1 flex flex-col">
          {/* 1. Hero Section with 2-column layout and Ecosystem Visualization */}
          <Hero
            onExplorePortals={() => scrollToId('portals')}
            onExploreEcosystem={() => scrollToId('ecosystem')}
          />

          {/* 2. Trust & Conceptual Metric Highlights */}
          <TrustMetrics />

          {/* 3. Concise "What is EduBridge?" Section */}
          <AboutSection />

          {/* 4. The 6-Stage Ecosystem Process Flow */}
          <EcosystemProcess />

          {/* 5. Platform Features with Alternating Blue & Cream Cards */}
          <FeaturesSection />

          {/* 6. Core Portal Selection Section with Student, Academia & Industry */}
          <PortalSection onSelectPortal={handleSelectPortal} />
        </main>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center py-8">
          <LoginView
            portal={selectedPortal}
            onBack={handleBackToLanding}
            onSwitchPortal={(portal) => {
              setSelectedPortal(portal);
              setActiveView(`login-${portal}` as ActiveView);
            }}
          />
        </div>
      )}

      {/* Minimal Institutional Footer */}
      <Footer />
    </div>
  );
}
