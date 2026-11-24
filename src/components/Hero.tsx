import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SportCategory } from '../types';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Lightbulb, 
  Zap,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, setSelectedCourt, setSelectedSportFilter, courts } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const sportsCards: Array<{
    name: SportCategory;
    icon: string;
    courtsCount: number;
    popularVenues: string;
    bgImage: string;
  }> = [
    {
      name: 'Badminton',
      icon: '🏸',
      courtsCount: 8,
      popularVenues: 'Shanti Devi Mittal Arena & GH Enclave',
      bgImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Basketball',
      icon: '🏀',
      courtsCount: 4,
      popularVenues: 'BH-4 & BH-5 Floodlit Courts & Unipolis',
      bgImage: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Football',
      icon: '⚽',
      courtsCount: 2,
      popularVenues: 'LPU Main Athletics Stadium & Block 34 Futsal',
      bgImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Volleyball',
      icon: '🏐',
      courtsCount: 3,
      popularVenues: 'Uni-Center Floodlit Arena & BH-2 Grounds',
      bgImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Table Tennis',
      icon: '🏓',
      courtsCount: 8,
      popularVenues: 'Shanti Devi Mittal 1st Floor Arena',
      bgImage: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Tennis',
      icon: '🎾',
      courtsCount: 3,
      popularVenues: 'LPU Lawn Tennis Hardcourts East',
      bgImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Cricket',
      icon: '🏏',
      courtsCount: 5,
      popularVenues: 'Cricket Oval & Practice Turf Bays',
      bgImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Squash',
      icon: '🎾',
      courtsCount: 2,
      popularVenues: 'Glass-backed Stadium Courts',
      bgImage: 'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredCourts = courts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.landmark.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSport = (sport: SportCategory) => {
    setSelectedSportFilter(sport);
    setActiveTab('courts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourtResult = (courtId: string) => {
    const found = courts.find(c => c.id === courtId);
    if (found) {
      setSelectedCourt(found);
      setActiveTab('courts');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950 px-6 py-16 sm:px-12 sm:py-24 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-electric-500/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-neon-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Ambient Grid Background */}
        <div 
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        ></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 shadow-glow-subtle">
            <span className="w-2 h-2 rounded-full bg-electric-400 animate-ping"></span>
            <span className="font-semibold text-electric-400">Lovely Professional University</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Design Thinking Sports Platform</span>
          </div>

          {/* Heading & Tagline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Space_Grotesk']">
              COURTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-electric-glow">AFTER</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-400 to-neon-glow">DARK</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 font-light tracking-wide font-['Space_Grotesk']">
              "Your Campus. Your Court. Your Game."
            </p>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Discover real LPU sports facilities, check live court availability under the floodlights, book simulated slots, find fellow players, and navigate your campus safely at night.
            </p>
          </div>

          {/* Search Bar with Autocomplete Dropdown */}
          <div className="max-w-2xl mx-auto relative text-left">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-electric-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Find a sports court at LPU (e.g. Badminton, Basketball, BH-4, Shanti Devi...)"
                className="w-full pl-12 pr-28 py-4 rounded-2xl bg-dark-900/90 border border-slate-700/90 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-electric-400 focus:ring-2 focus:ring-electric-400/30 backdrop-blur-xl shadow-2xl transition-all"
              />
              <button
                onClick={() => {
                  setActiveTab('courts');
                }}
                className="absolute right-2 px-4 py-2 rounded-xl bg-electric-500 hover:bg-electric-400 text-dark-950 font-semibold text-xs transition-colors flex items-center gap-1 shadow-glow-blue"
              >
                Search
              </button>
            </div>

            {/* Suggestions Overlay */}
            {showSuggestions && searchQuery.trim() !== '' && (
              <div className="absolute top-full mt-2 w-full bg-dark-900/95 backdrop-blur-2xl border border-slate-700 rounded-2xl p-2 shadow-2xl z-40 max-h-72 overflow-y-auto space-y-1">
                {filteredCourts.length > 0 ? (
                  filteredCourts.map(court => (
                    <div
                      key={court.id}
                      onClick={() => handleSelectCourtResult(court.id)}
                      className="p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          <span>{court.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded border ${
                            court.isVerified 
                              ? 'bg-neon-500/10 text-neon-400 border-neon-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {court.isVerified ? 'Verified LPU' : 'Demo Entry'}
                          </span>
                        </div>
                        <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-electric-400" />
                          {court.landmark}
                        </div>
                      </div>
                      <span className="text-electric-300 font-medium capitalize bg-electric-500/10 px-2 py-0.5 rounded border border-electric-500/20">
                        {court.sport}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-400 text-xs">
                    No matching LPU sports court found for "{searchQuery}". Try "Badminton" or "BH-4".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Access Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('courts')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-electric-500 to-electric-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all active:scale-95 font-['Space_Grotesk']"
            >
              <MapPin className="w-4 h-4" />
              Explore Courts
            </button>
            <button
              onClick={() => {
                setActiveTab('courts');
                // Auto scroll to map
                setTimeout(() => {
                  const mapEl = document.getElementById('campus-map-section');
                  if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all hover:border-slate-500 active:scale-95 font-['Space_Grotesk']"
            >
              <Sparkles className="w-4 h-4 text-electric-400" />
              Find Nearby Courts
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all hover:border-slate-500 active:scale-95 font-['Space_Grotesk']"
            >
              <Calendar className="w-4 h-4 text-neon-400" />
              Book a Court
            </button>
            <button
              onClick={() => setActiveTab('players')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all hover:border-slate-500 active:scale-95 font-['Space_Grotesk']"
            >
              <Users className="w-4 h-4 text-amber-400" />
              Find Players
            </button>
          </div>

          {/* Quick Metrics Bar from Research */}
          <div className="pt-6 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-3 rounded-xl bg-dark-900/50 border border-slate-800/60">
              <div className="text-xl font-bold text-white font-['Space_Grotesk']">11 Facilities</div>
              <div className="text-[11px] text-slate-400">Indoor & Outdoor Venues</div>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/50 border border-slate-800/60">
              <div className="text-xl font-bold text-neon-400 font-['Space_Grotesk']">68.8% Need</div>
              <div className="text-[11px] text-slate-400">Miss Play Due to Closure</div>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/50 border border-slate-800/60">
              <div className="text-xl font-bold text-electric-400 font-['Space_Grotesk']">93.8% Demand</div>
              <div className="text-[11px] text-slate-400">Would Use Night Courts</div>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/50 border border-slate-800/60">
              <div className="text-xl font-bold text-amber-400 font-['Space_Grotesk']">OpenStreetMap</div>
              <div className="text-[11px] text-slate-400">Interactive Navigation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Your Sports World Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neon-400 mb-1">
              <Zap className="w-3.5 h-3.5" />
              LPU Sports Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
              Explore Your Sports World
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select any discipline to filter verified LPU facilities, check illumination ratings, and view available slots.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedSportFilter('All');
              setActiveTab('courts');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-electric-400 hover:text-electric-300 transition-colors"
          >
            View all 11 campus courts
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sports Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sportsCards.map((sport) => (
            <div
              key={sport.name}
              onClick={() => handleSelectSport(sport.name)}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-dark-900/80 p-5 hover:border-electric-500/60 hover:shadow-glow-blue transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px]"
            >
              {/* Background preview image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity duration-300"
                style={{ backgroundImage: `url(${sport.bgImage})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/80 to-transparent"></div>

              <div className="relative z-10 flex items-start justify-between">
                <span className="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
                  {sport.icon}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-electric-500/10 text-electric-300 border border-electric-500/20">
                  {sport.courtsCount} courts
                </span>
              </div>

              <div className="relative z-10 space-y-1 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-electric-300 transition-colors font-['Space_Grotesk']">
                    {sport.name}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-electric-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {sport.popularVenues}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Thinking Project Context Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-electric-400">
            <ShieldCheck className="w-4 h-4" />
            LPU Design Thinking Research Integration
          </div>
          <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
            Driven by 32 Verified Student Survey Responses
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Our empirical research revealed that 68.8% of LPU students avoid evening sports due to early closures and lack of lighting info. Courts After Dark provides the complete solution.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('survey')}
          className="whitespace-nowrap px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold transition-all hover:border-electric-400 font-['Space_Grotesk']"
        >
          Explore Survey Data & Charts →
        </button>
      </section>
    </div>
  );
};
