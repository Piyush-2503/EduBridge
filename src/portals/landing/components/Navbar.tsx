import React, { useState } from 'react';
import { ArrowRight, Menu, X, Compass, Sparkles } from 'lucide-react';
import { ActiveView } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onScrollToPortals: () => void;
  onScrollToAbout: () => void;
  onScrollToFeatures: () => void;
  onScrollToEcosystem: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  onScrollToPortals,
  onScrollToAbout,
  onScrollToFeatures,
  onScrollToEcosystem,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    onNavigate('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (scrollAction: () => void) => {
    if (activeView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        scrollAction();
      }, 100);
    } else {
      scrollAction();
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-[#7288AE]/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Institutional Tag */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5694] rounded-lg py-1 cursor-pointer"
          aria-label="EduBridge Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#111844] via-[#4B5694] to-[#111844] flex items-center justify-center text-[#EAE0CF] shadow-md shadow-[#4B5694]/20 group-hover:scale-105 transition-all duration-300">
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#111844] leading-tight">
                EduBridge
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider uppercase bg-[#EAE0CF] text-[#111844]">
                Enterprise
              </span>
            </div>
            <span className="text-[11px] font-medium tracking-wide text-[#7288AE] leading-tight">
              Skill Mapping & Placement Platform
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#111844]/80">
          <button
            onClick={() => handleLinkClick(onScrollToAbout)}
            className="hover:text-[#4B5694] transition-colors py-1 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick(onScrollToEcosystem)}
            className="hover:text-[#4B5694] transition-colors py-1 cursor-pointer"
          >
            Ecosystem Flow
          </button>
          <button
            onClick={() => handleLinkClick(onScrollToFeatures)}
            className="hover:text-[#4B5694] transition-colors py-1 cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleLinkClick(onScrollToPortals)}
            className="text-[#4B5694] hover:text-[#111844] transition-colors py-1 cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4B5694]" />
            <span>Portals</span>
          </button>
        </nav>

        {/* Enter Portal Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick(onScrollToPortals)}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#111844] via-[#4B5694] to-[#111844] bg-[length:200%_auto] hover:bg-right rounded-full shadow-md shadow-[#4B5694]/25 hover:shadow-lg hover:shadow-[#4B5694]/35 transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            <span>Enter Portal</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EAE0CF] group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#111844] hover:bg-[#EAE0CF]/40 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#7288AE]/25 bg-white/95 backdrop-blur-lg px-5 py-4 space-y-3">
          <button
            onClick={() => handleLinkClick(onScrollToAbout)}
            className="block w-full text-left py-2 text-sm font-semibold text-[#111844] hover:text-[#4B5694]"
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick(onScrollToEcosystem)}
            className="block w-full text-left py-2 text-sm font-semibold text-[#111844] hover:text-[#4B5694]"
          >
            Ecosystem Flow
          </button>
          <button
            onClick={() => handleLinkClick(onScrollToFeatures)}
            className="block w-full text-left py-2 text-sm font-semibold text-[#111844] hover:text-[#4B5694]"
          >
            Features
          </button>
          <button
            onClick={() => handleLinkClick(onScrollToPortals)}
            className="block w-full text-left py-2 text-sm font-semibold text-[#4B5694]"
          >
            Portals
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleLinkClick(onScrollToPortals)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#111844] to-[#4B5694] rounded-full shadow-md"
            >
              <span>Enter Portal</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EAE0CF]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
