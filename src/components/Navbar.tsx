import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  MapPin, 
  CalendarCheck, 
  Users, 
  ShieldCheck, 
  CloudSun, 
  BarChart3, 
  Info, 
  Menu, 
  X, 
  Lock, 
  AlertCircle,
  Lightbulb,
  Clock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, courts, weather, isAdminLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const litCourtsCount = courts.filter(c => c.lighting.status === 'Active').length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Flame },
    { id: 'courts', label: 'Explore Courts & Map', icon: MapPin },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'players', label: 'Find Players', icon: Users },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'safety', label: 'Night Safety & Lighting', icon: Lightbulb },
    { id: 'report', label: 'Report Issue', icon: AlertCircle },
    { id: 'survey', label: 'Student Research', icon: BarChart3 },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      {/* Top University Ticker Bar */}
      <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border-b border-slate-800/40 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-electric-400">
              <span className="w-2 h-2 rounded-full bg-neon-400 animate-pulse"></span>
              Lovely Professional University (LPU), Punjab
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">
              Nighttime Sports Accessibility Initiative
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-neon-400 bg-neon-500/10 px-2 py-0.5 rounded-full border border-neon-500/20">
              <Lightbulb className="w-3.5 h-3.5" />
              {litCourtsCount} Courts Floodlit
            </span>
            <span className="flex items-center gap-1.5 text-electric-300 bg-electric-500/10 px-2 py-0.5 rounded-full border border-electric-500/20">
              <CloudSun className="w-3.5 h-3.5" />
              {weather.temperature}°C {weather.condition}
            </span>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
                isAdminLoggedIn 
                  ? 'border-neon-500/40 text-neon-400 bg-neon-500/10 font-semibold' 
                  : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              <Lock className="w-3 h-3" />
              {isAdminLoggedIn ? 'Admin Portal (Active)' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-neon-500 p-0.5 shadow-glow-blue group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-electric-400 group-hover:text-neon-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base sm:text-lg bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent uppercase font-['Space_Grotesk']">
                  COURTS <span className="text-electric-400">AFTER</span> <span className="text-neon-400">DARK</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-electric-500/20 text-electric-400 border border-electric-500/30">
                  LPU
                </span>
              </div>
              <p className="text-[10px] tracking-wide text-slate-400 hidden sm:block">
                Your Campus. Your Court. Your Game.
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-electric-500/20 text-electric-300 border border-electric-500/30 shadow-glow-subtle'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-electric-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('courts')}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 hover:brightness-110 shadow-glow-blue transition-all active:scale-95 font-['Space_Grotesk'] tracking-wide"
            >
              <MapPin className="w-3.5 h-3.5" />
              Explore Courts
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-900/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-electric-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800/60 mt-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800"
            >
              <Lock className="w-4 h-4 text-slate-400" />
              {isAdminLoggedIn ? 'Admin Portal Dashboard' : 'Administrator Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
