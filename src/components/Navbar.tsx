import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  CalendarCheck,
  Users,
  CloudSun,
  ShieldCheck,
  Info
} from 'lucide-react';

export const RunnerLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`text-neon-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)] ${className}`}
  >
    <circle cx="14" cy="4" r="2.2" />
    <path d="M13.5 7.5c-.8 0-1.6.3-2.2.8L8.6 10.5c-.4.4-.6.9-.5 1.5.1.6.6 1 1.2 1h2.2l-1.5 4.5-3.3 2.1c-.5.3-.7.9-.5 1.5.2.5.8.9 1.4.9.2 0 .5 0 .7-.2l4.2-2.7c.4-.3.7-.7.8-1.2l1.1-3.6 2.2 2.2v4.8c0 .6.4 1 1 1s1-.4 1-1v-5.5c0-.4-.2-.8-.5-1.1l-2.6-2.6 1.1-2.4c.7.9 1.8 1.5 3 1.5.6 0 1-.4 1-1s-.4-1-1-1c-1.3 0-2.3-.9-2.7-2.1-.2-.6-.8-1-1.4-1h-1.8z" />
  </svg>
);

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, weather, isAdminLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);

  // Nav items matching the master prompt & UI mockup exactly:
  // Home, Explore Courts, Campus Map, Availability, Student Insights, Feedback
  const primaryNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'courts', label: 'Explore Courts' },
    { id: 'map', label: 'Campus Map' },
    { id: 'availability', label: 'Availability' },
    { id: 'insights', label: 'Student Insights' },
    { id: 'feedback', label: 'Feedback' },
  ];

  // Secondary tools accessible via dropdown or mobile menu
  const secondaryNavItems = [
    { id: 'bookings', label: 'My Bookings', icon: CalendarCheck },
    { id: 'players', label: 'Find Players (Pickup)', icon: Users },
    { id: 'weather', label: `LPU Weather (${weather.temperature}°C)`, icon: CloudSun },
    { id: 'safety', label: 'Night Safety & Lighting', icon: ShieldCheck },
    { id: 'about', label: 'About Project & Research', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setShowCampusDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070b14]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon-500/10 border border-neon-500/30 group-hover:border-neon-400 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <RunnerLogo className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-white leading-tight text-lg group-hover:text-neon-300 transition-colors">
                Courts
              </span>
              <span className="font-extrabold tracking-tight text-slate-300 leading-tight text-lg group-hover:text-white transition-colors">
                After Dark
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 rounded-md ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850/60'
                  }`}
                >
                  {item.label}
                  {/* Glowing neon green bottom bar matching mockup */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-neon-400 rounded-full shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Campus Selector Dropdown Pill */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowCampusDropdown(!showCampusDropdown)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900/90 border border-slate-700/80 hover:border-slate-500 text-slate-200 text-xs font-semibold tracking-wide transition-all shadow-inner focus:outline-none"
              >
                <span className="text-base leading-none">🏀</span>
                <span className="font-bold tracking-wider">LPU</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {/* Campus Selector Dropdown Menu */}
              {showCampusDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-dark-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-2xl">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Campus</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-neon-400 bg-neon-500/10 px-2 py-0.5 rounded-full border border-neon-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-dark-850/80 border border-slate-700/50 mb-2">
                    <p className="text-xs font-bold text-white">Lovely Professional University</p>
                    <p className="text-[11px] text-slate-400">Jalandhar - Delhi G.T. Road, Phagwara, Punjab 144411</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 py-1">Additional Student Tools</div>
                    {secondaryNavItems.map(item => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors text-left"
                        >
                          <Icon className="w-3.5 h-3.5 text-electric-400" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                    <div className="pt-2 border-t border-slate-800">
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-neon-400 hover:bg-slate-800/80 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5" />
                          {isAdminLoggedIn ? 'Admin Portal (Active)' : 'Admin Portal Login'}
                        </span>
                        {isAdminLoggedIn && <span className="w-2 h-2 rounded-full bg-neon-400"></span>}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-dark-900 border border-slate-700/80 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-950/98 border-b border-slate-800 px-5 pt-3 pb-6 space-y-1 backdrop-blur-2xl animate-in slide-in-from-top-2">
          {primaryNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-neon-500/15 text-white border border-neon-500/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-neon-400 shadow-[0_0_8px_#22c55e]" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800/80 space-y-1">
            <p className="px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Features & Tools</p>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-850 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4 text-electric-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-neon-400 hover:bg-slate-850"
            >
              <Lock className="w-4 h-4" />
              <span>{isAdminLoggedIn ? 'Admin Portal (Active)' : 'Admin Portal Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
