import React, { useState } from 'react';
import { Court, SportCategory } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Lightbulb, 
  ShieldCheck, 
  ShieldAlert, 
  ExternalLink, 
  CalendarCheck, 
  Users, 
  AlertTriangle,
  X,
  CheckCircle2,
  Sparkles,
  Heart
} from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

export const CourtFinder: React.FC = () => {
  const { 
    courts, 
    selectedCourt, 
    setSelectedCourt, 
    setBookingModalCourt, 
    setDetailsModalCourt,
    selectedSportFilter, 
    setSelectedSportFilter,
    setActiveTab,
    isFavorite,
    toggleFavorite
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'indoor' | 'outdoor'>('all');
  const [floodlitOnly, setFloodlitOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [detailModalCourt, setDetailModalCourt] = useState<Court | null>(null);

  const sportsList: SportCategory[] = [
    'All',
    'Badminton',
    'Basketball',
    'Football',
    'Volleyball',
    'Table Tennis',
    'Tennis',
    'Cricket',
    'Squash'
  ];

  // Filter courts logic
  const filteredCourts = courts.filter(court => {
    // Sport
    if (selectedSportFilter !== 'All' && court.sport !== selectedSportFilter) return false;
    // Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = court.name.toLowerCase().includes(q);
      const matchLoc = court.locationName.toLowerCase().includes(q) || court.landmark.toLowerCase().includes(q);
      const matchSport = court.sport.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchSport) return false;
    }
    // Indoor/Outdoor
    if (filterType !== 'all' && court.indoorOutdoor !== filterType) return false;
    // Floodlit
    if (floodlitOnly && court.lighting.type === 'Unlit') return false;
    // Available
    if (availableOnly && court.status !== 'available') return false;
    // Favorites
    if (favoritesOnly && !isFavorite(court.id)) return false;

    return true;
  });

  const handleOpenBooking = (court: Court) => {
    setBookingModalCourt(court);
    setDetailModalCourt(null);
  };

  const handleFindPlayersAtCourt = (court: Court) => {
    setActiveTab('players');
  };

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/20 text-xs text-electric-400 font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          Interactive LPU Campus Court Discovery
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
          Find & Navigate Sports Courts at LPU
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Discover verified Lovely Professional University sports facilities, check night illumination capabilities, calculate walking routes from hostels or academic blocks, and check real-time availability.
        </p>
      </div>

      {/* Interactive Map Section */}
      <section id="campus-map-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-400 animate-pulse"></span>
            Campus Sports Map (OpenStreetMap)
          </h2>
          <span className="text-xs text-slate-400">
            Click any marker to select and preview walking route
          </span>
        </div>
        <InteractiveMap
          courts={filteredCourts}
          selectedCourt={selectedCourt}
          onSelectCourt={(c) => {
            setSelectedCourt(c);
          }}
          onBookCourt={handleOpenBooking}
        />
      </section>

      {/* Search & Filter Controls */}
      <div className="space-y-4 p-5 rounded-2xl bg-dark-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by court name, sport, or landmark..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-electric-400 focus:ring-1 focus:ring-electric-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Toggles */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Indoor / Outdoor */}
            <div className="flex items-center bg-dark-950 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterType === 'all' ? 'bg-electric-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('indoor')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterType === 'indoor' ? 'bg-electric-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Indoor
              </button>
              <button
                onClick={() => setFilterType('outdoor')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterType === 'outdoor' ? 'bg-electric-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Outdoor
              </button>
            </div>

            {/* Floodlit Filter */}
            <button
              onClick={() => setFloodlitOnly(!floodlitOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all ${
                floodlitOnly
                  ? 'bg-neon-500/20 text-neon-400 border-neon-500/40 shadow-glow-green font-semibold'
                  : 'bg-dark-950 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-neon-400" />
              Night Floodlit
            </button>

            {/* Available Only */}
            <button
              onClick={() => setAvailableOnly(!availableOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all ${
                availableOnly
                  ? 'bg-electric-500/20 text-electric-300 border-electric-500/40 font-semibold'
                  : 'bg-dark-950 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-electric-400" />
              Available Now
            </button>

            {/* Favorites Only */}
            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all ${
                favoritesOnly
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 font-semibold'
                  : 'bg-dark-950 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
              Favorites Only
            </button>
          </div>
        </div>

        {/* Sport Categories Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {sportsList.map((sport) => {
            const isSelected = selectedSportFilter === sport;
            return (
              <button
                key={sport}
                onClick={() => setSelectedSportFilter(sport)}
                className={`px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 font-medium ${
                  isSelected
                    ? 'bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold shadow-glow-blue'
                    : 'bg-dark-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {sport}
              </button>
            );
          })}
        </div>
      </div>

      {/* Courts Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredCourts.length} of {courts.length} sports facilities</span>
          {selectedSportFilter !== 'All' && (
            <button
              onClick={() => setSelectedSportFilter('All')}
              className="text-electric-400 hover:underline"
            >
              Reset to all sports
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court) => {
            const isSelected = selectedCourt?.id === court.id;
            return (
              <div
                key={court.id}
                className={`group rounded-2xl border bg-dark-900/90 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
                  isSelected 
                    ? 'border-electric-400 shadow-glow-subtle' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Court Thumbnail & Badges */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={court.photos[0]}
                    alt={court.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent"></div>

                  {/* Sport & Indoor Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-dark-950/90 text-electric-400 border border-electric-500/30 backdrop-blur-md">
                      {court.sport}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-dark-950/90 text-slate-300 border border-slate-700 backdrop-blur-md">
                      {court.indoorOutdoor}
                    </span>
                  </div>

                  {/* Status Badge & Favorite Heart */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(court.id);
                      }}
                      aria-label="Toggle favorite"
                      className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                        isFavorite(court.id)
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : 'bg-dark-950/70 text-slate-300 hover:text-white border border-slate-700/60'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFavorite(court.id) ? 'fill-rose-400' : ''}`} />
                    </button>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border backdrop-blur-md ${
                      court.status === 'available'
                        ? 'bg-neon-500/20 text-neon-400 border-neon-500/40'
                        : court.status === 'occupied'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    }`}>
                      {court.status}
                    </span>
                  </div>

                  {/* Verified vs Demo label */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px]">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${
                      court.isVerified
                        ? 'bg-neon-950/80 text-neon-300 border-neon-500/30'
                        : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                    }`}>
                      {court.isVerified ? (
                        <>
                          <ShieldCheck className="w-3 h-3 text-neon-400" />
                          Verified LPU Facility
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-3 h-3 text-amber-400" />
                          Demo Data – Location Confirmation Required
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Court Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-white group-hover:text-electric-300 transition-colors font-['Space_Grotesk'] line-clamp-1">
                      {court.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-electric-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{court.landmark}</span>
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-dark-950 border border-slate-800/80">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Hours</div>
                      <div className="text-slate-200 font-semibold text-[11px] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {court.timings.open} - {court.timings.close}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Night Lighting</div>
                      <div className="text-neon-400 font-semibold text-[11px] flex items-center gap-1 mt-0.5">
                        <Lightbulb className="w-3 h-3 text-neon-400" />
                        {court.lighting.type} ({court.lighting.luxLevel} lx)
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCourt(court);
                          const mapEl = document.getElementById('campus-map-section');
                          if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700 hover:border-slate-600"
                      >
                        <MapPin className="w-3.5 h-3.5 text-electric-400" />
                        View on Map
                      </button>
                      <button
                        onClick={() => setDetailsModalCourt(court)}
                        className="py-2 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors border border-slate-700"
                      >
                        Details
                      </button>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(court)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 hover:brightness-110 text-dark-950 text-xs font-bold uppercase tracking-wider transition-all shadow-glow-blue font-['Space_Grotesk']"
                    >
                      Book Court Slot
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Court Information Modal */}
      {detailModalCourt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-dark-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-electric-500/10 text-electric-400 border border-electric-500/20">
                    {detailModalCourt.sport}
                  </span>
                  <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {detailModalCourt.indoorOutdoor}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                    detailModalCourt.status === 'available'
                      ? 'bg-neon-500/10 text-neon-400 border-neon-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {detailModalCourt.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1.5 font-['Space_Grotesk']">
                  {detailModalCourt.name}
                </h2>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-electric-400" />
                  {detailModalCourt.landmark} ({detailModalCourt.locationName})
                </p>
              </div>

              <button
                onClick={() => setDetailModalCourt(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Verification Notice */}
            {!detailModalCourt.isVerified && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  <strong>Demo Data Entry:</strong> Awaiting official LPU Sports Department registration confirmation. Hours and facility listings are conceptual prototypes.
                </span>
              </div>
            )}

            {/* Photos Carousel/Row */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-56">
              <img
                src={detailModalCourt.photos[0]}
                alt={detailModalCourt.name}
                className="w-full h-56 object-cover"
              />
            </div>

            {/* Timings & Lighting Telemetry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-electric-400" />
                  Operating Hours & Curfew
                </div>
                <div className="text-xs space-y-1 text-slate-400">
                  <div className="flex justify-between">
                    <span>Opening Time:</span>
                    <span className="font-semibold text-white">{detailModalCourt.timings.open}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Closing Time:</span>
                    <span className="font-semibold text-white">{detailModalCourt.timings.close}</span>
                  </div>
                  <div className="flex justify-between text-neon-400 font-semibold">
                    <span>Night Floodlit Until:</span>
                    <span>{detailModalCourt.timings.nightLitUntil}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-neon-400" />
                  Smart Lighting Specs
                </div>
                <div className="text-xs space-y-1 text-slate-400">
                  <div className="flex justify-between">
                    <span>Fixture Type:</span>
                    <span className="font-semibold text-white">{detailModalCourt.lighting.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Illumination Level:</span>
                    <span className="font-semibold text-white">{detailModalCourt.lighting.luxLevel} Lux</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Motion Automation:</span>
                    <span className="font-semibold text-electric-400">
                      {detailModalCourt.lighting.motionSensorEquipped ? 'Active (PIR Sensor)' : 'Fixed Timed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Court Amenities & Equipment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {detailModalCourt.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-dark-950 border border-slate-800/80 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Court Rules & Access Instructions
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {detailModalCourt.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-electric-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleOpenBooking(detailModalCourt)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all font-['Space_Grotesk']"
              >
                Book Court Slot
              </button>
              <button
                onClick={() => {
                  handleFindPlayersAtCourt(detailModalCourt);
                  setDetailModalCourt(null);
                }}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Users className="w-4 h-4 text-amber-400" />
                Find Players Here
              </button>
              <button
                onClick={() => {
                  setActiveTab('report');
                  setDetailModalCourt(null);
                }}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Report Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
