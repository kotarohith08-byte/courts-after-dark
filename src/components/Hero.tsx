import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { SportCategory, Court } from '../types';
import { 
  Search, 
  MapPin, 
  Trophy, 
  ArrowRight, 
  Heart, 
  CheckCircle2, 
  Compass, 
  BarChart3, 
  MessageSquare, 
  Sparkles, 
  ExternalLink,
  Plus,
  Minus,
  Lightbulb,
  ChevronDown
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import L from 'leaflet';
import { FaqModal } from './FaqModal';

export const Hero: React.FC = () => {
  const { 
    courts, 
    setActiveTab, 
    setSelectedCourt, 
    setDetailsModalCourt, 
    setBookingModalCourt,
    setSelectedSportFilter,
    isFavorite,
    toggleFavorite,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [activeSportFilter, setActiveSportFilter] = useState<string>('All');
  const [mapFilter, setMapFilter] = useState<'All' | 'Indoor' | 'Outdoor'>('All');
  const [showFaqModal, setShowFaqModal] = useState<boolean>(false);
  const [activeMapCourt, setActiveMapCourt] = useState<Court | null>(null);

  // Mini Map ref
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize mini map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [31.2536, 75.7037],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      // Dark canvas tiles (no API key required)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18
      }).addTo(map);

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18
      }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;
    }

    // Set default selected court for the popup preview
    const defaultCourt = courts.find(c => c.sport === 'Basketball') || courts[0];
    if (defaultCourt && !activeMapCourt) {
      setActiveMapCourt(defaultCourt);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when courts or filter change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    const filtered = courts.filter(c => {
      if (mapFilter === 'Indoor') return c.indoorOutdoor === 'indoor';
      if (mapFilter === 'Outdoor') return c.indoorOutdoor === 'outdoor';
      return true;
    });

    filtered.forEach(court => {
      const isSelected = activeMapCourt?.id === court.id;
      const getSportEmoji = (sport: string) => {
        switch (sport) {
          case 'Basketball': return '🏀';
          case 'Football': return '⚽';
          case 'Badminton': return '🏸';
          case 'Cricket': return '🏏';
          case 'Tennis': return '🎾';
          case 'Volleyball': return '🏐';
          default: return '📍';
        }
      };

      const iconHtml = `
        <div style="
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: ${isSelected ? '#22c55e' : '#0c1222'};
          border: 2px solid ${isSelected ? '#ffffff' : '#22c55e'};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 0 ${isSelected ? '20px' : '10px'} rgba(34, 197, 94, 0.6);
          cursor: pointer;
          transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
          transition: transform 0.2s ease;
        ">
          ${getSportEmoji(court.sport)}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: iconHtml,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker(court.coordinates, { icon: customIcon });
      marker.on('click', () => {
        setActiveMapCourt(court);
      });
      marker.addTo(layer);
    });
  }, [courts, mapFilter, activeMapCourt]);

  const handleZoom = (delta: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + delta);
    }
  };

  // Facility cards for Card 1
  const filteredFacilities = courts.filter(c => {
    if (activeSportFilter === 'All') return true;
    return c.sport.toLowerCase() === activeSportFilter.toLowerCase();
  }).slice(0, 4);

  // Search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setActiveTab('courts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student Insights Data matching mockup
  const sportsDonutData = [
    { name: 'Football', value: 35, color: '#00e5ff' },
    { name: 'Basketball', value: 28, color: '#f97316' },
    { name: 'Badminton', value: 22, color: '#22c55e' },
    { name: 'Others', value: 15, color: '#a855f7' },
  ];

  const commonProblems = [
    { label: 'Limited Slots', pct: 38 },
    { label: 'Maintenance', pct: 32 },
    { label: 'Location', pct: 20 },
    { label: 'Others', pct: 10 },
  ];

  return (
    <div className="space-y-12">
      {/* =========================================================================
          HERO SECTION: Find Your Game. Find Your Court.
          ========================================================================= */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#070c18] via-[#091124] to-[#050914] shadow-2xl">
        
        {/* Athletic Night Court Background with Floodlights & LPU glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Night basketball court image overlay with gradient */}
          <img 
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=2000&q=85" 
            alt="Courts After Dark Arena" 
            className="w-full h-full object-cover object-right opacity-35 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070c18] via-[#070c18]/85 to-transparent sm:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-[#070c18]/60" />

          {/* Electric stadium floodlight glare */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-10 w-80 h-80 bg-neon-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Glowing Green Energy Wave across bottom */}
          <svg 
            className="absolute bottom-0 left-0 right-0 w-full h-24 text-neon-400/30 overflow-visible" 
            preserveAspectRatio="none" 
            viewBox="0 0 1200 120"
          >
            <path 
              d="M0,80 C300,120 600,20 1200,70 L1200,120 L0,120 Z" 
              fill="url(#green-gradient-hero)" 
              opacity="0.3" 
            />
            <path 
              d="M0,85 Q450,15 1200,75" 
              fill="none" 
              stroke="#22c55e" 
              strokeWidth="2.5" 
              className="drop-shadow-[0_0_12px_#22c55e]" 
            />
            <defs>
              <linearGradient id="green-gradient-hero" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#00ff88" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Column: Heading, Subtitle, Search, CTA Buttons, Stats */}
          <div className="w-full lg:max-w-2xl space-y-6">
            
            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Find Your Game.
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neon-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.4)] leading-[1.15] mt-1">
                Find Your Court.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
              Discover sports facilities, explore campus locations and make the most of your sporting experience at LPU.
            </p>

            {/* Pill Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-md">
              <div className="flex items-center bg-[#0d1527]/90 border border-slate-700/80 hover:border-slate-500 rounded-full pl-5 pr-2 py-1.5 shadow-2xl backdrop-blur-md transition-all focus-within:border-neon-400 focus-within:ring-2 focus-within:ring-neon-400/20">
                <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for sports or facilities..."
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Submit court search"
                  className="w-10 h-10 rounded-full bg-neon-400 hover:bg-neon-300 text-dark-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(34,197,94,0.5)] shrink-0"
                >
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </form>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => {
                  setActiveTab('courts');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-neon-400 hover:bg-neon-300 text-dark-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <Trophy className="w-4 h-4 fill-dark-950" />
                <span>Explore Courts</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-dark-900/90 border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm hover:bg-dark-850 transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
              >
                <MapPin className="w-4 h-4 text-neon-400" />
                <span>Explore Campus Map</span>
              </button>
            </div>

            {/* Quick Stat Chips */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-3 text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-dark-850 border border-slate-800 flex items-center justify-center text-neon-400">
                  <span className="text-base">🏟️</span>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">8+ Sports</div>
                  <div className="text-[11px] text-slate-400">Available on Campus</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-dark-850 border border-slate-800 flex items-center justify-center text-electric-400">
                  <span className="text-base">📍</span>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">15+ Facilities</div>
                  <div className="text-[11px] text-slate-400">Verified LPU Venues</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-dark-850 border border-slate-800 flex items-center justify-center text-purple-400">
                  <span className="text-base">👥</span>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">10K+ Students</div>
                  <div className="text-[11px] text-slate-400">Active Sports Community</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column Visual: Cursive Script & Athletic Player Imagery */}
          <div className="w-full lg:w-auto relative flex flex-col items-center justify-center py-4 lg:py-0">
            {/* LPU Building Silhouette & Athlete with Cursive Script */}
            <div className="relative text-center select-none">
              <div className="font-script text-4xl sm:text-5xl lg:text-6xl text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] rotate-[-6deg] mb-4 tracking-wider">
                Play More. Live Better.
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900/80 border border-slate-700/80 backdrop-blur-md text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-neon-400 animate-pulse" />
                Lovely Professional University Sports Portal
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          THE 4-CARD SAAS DASHBOARD GRID (Exact Layout from Mockup)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* -----------------------------------------------------------------------
            CARD 1 (Top Left, 7 cols): Explore Sports Facilities
            ----------------------------------------------------------------------- */}
        <div className="lg:col-span-7 bg-[#0b1222]/90 border border-slate-800/90 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div>
            {/* Card Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/70">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-neon-400 text-lg">🏟️</span>
                  <h2 className="text-lg font-extrabold text-white tracking-tight">
                    Explore Sports Facilities
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Discover all the available sports facilities at LPU
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['All', 'Basketball', 'Football', 'Cricket', 'Badminton'].map(sport => {
                  const isActive = activeSportFilter === sport;
                  return (
                    <button
                      key={sport}
                      onClick={() => setActiveSportFilter(sport)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-neon-400 text-dark-950 font-bold shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                          : 'bg-dark-850 text-slate-300 hover:text-white border border-slate-700/70 hover:border-slate-500'
                      }`}
                    >
                      {sport}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setActiveTab('courts');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-400 hover:text-white bg-dark-850 border border-slate-700/70 flex items-center gap-1"
                >
                  More <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Horizontal Facility Cards Grid (4 items) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 pt-5">
              {filteredFacilities.map(court => {
                const isFav = isFavorite(court.id);
                const getSportIcon = (s: string) => {
                  switch (s) {
                    case 'Basketball': return '🏀';
                    case 'Football': return '⚽';
                    case 'Badminton': return '🏸';
                    case 'Cricket': return '🏏';
                    case 'Tennis': return '🎾';
                    default: return '📍';
                  }
                };

                return (
                  <div 
                    key={court.id}
                    className="group bg-[#080d1a] border border-slate-800/90 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                  >
                    {/* Facility Image with Heart Favorite */}
                    <div className="relative h-28 w-full overflow-hidden bg-dark-950">
                      <img 
                        src={court.photos[0]} 
                        alt={court.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(court.id);
                        }}
                        aria-label="Toggle favorite"
                        className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
                          isFav 
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                            : 'bg-dark-950/60 text-slate-300 hover:text-white border border-slate-700/60'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-400' : ''}`} />
                      </button>
                    </div>

                    {/* Facility Metadata */}
                    <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
                          <span>{getSportIcon(court.sport)}</span>
                          <span className="truncate">{court.name.split('–')[0].trim()}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                          <span className="truncate">📍 {court.landmark || court.locationName}</span>
                          <span className="text-[10px] font-bold text-neon-400 bg-neon-500/10 px-1.5 py-0.5 rounded border border-neon-500/20 shrink-0">
                            Verified
                          </span>
                        </div>
                      </div>

                      {/* View Details Action Button */}
                      <button
                        onClick={() => setDetailsModalCourt(court)}
                        className="w-full py-1.5 px-3 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-700/70 hover:border-slate-500 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-neon-400 transition-colors" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            CARD 2 (Top Right, 5 cols): LPU Campus Map
            ----------------------------------------------------------------------- */}
        <div className="lg:col-span-5 bg-[#0b1222]/90 border border-slate-800/90 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div>
            {/* Header with View Full Map */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/70">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-neon-400" />
                  <h2 className="text-lg font-extrabold text-white tracking-tight">
                    LPU Campus Map
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Find sports facilities across campus
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-slate-300 hover:text-neon-400 px-3 py-1.5 rounded-full bg-dark-850 border border-slate-700/80 hover:border-neon-500/40 transition-colors flex items-center gap-1"
              >
                <span>View Full Map</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Map Container with Overlays */}
            <div className="relative mt-4 h-72 w-full rounded-2xl overflow-hidden border border-slate-800">
              {/* Leaflet Mini Map */}
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Top-Left Filter Pills Overlay */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 bg-dark-950/80 p-1 rounded-xl backdrop-blur-md border border-slate-800">
                {(['All', 'Indoor', 'Outdoor'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setMapFilter(f)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold text-left transition-colors ${
                      mapFilter === f
                        ? 'bg-neon-400 text-dark-950 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Bottom-Right Zoom Controls */}
              <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1 bg-dark-950/80 p-1 rounded-xl backdrop-blur-md border border-slate-800">
                <button
                  onClick={() => handleZoom(1)}
                  aria-label="Zoom in"
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleZoom(-1)}
                  aria-label="Zoom out"
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Selected Marker Preview Popover (Top Right matching mockup) */}
              {activeMapCourt && (
                <div className="absolute top-3 right-3 z-10 max-w-[210px] bg-dark-900/95 border border-slate-700/90 rounded-2xl p-2.5 backdrop-blur-md shadow-2xl space-y-2">
                  <div className="relative h-16 w-full rounded-xl overflow-hidden">
                    <img 
                      src={activeMapCourt.photos[0]} 
                      alt={activeMapCourt.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-1 right-1 text-[10px] font-bold text-neon-400 bg-dark-950/80 px-1.5 py-0.5 rounded-full border border-neon-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-pulse" />
                      Open Now
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white truncate">{activeMapCourt.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">📍 {activeMapCourt.landmark}</p>
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    <button
                      onClick={() => {
                        const [lat, lng] = activeMapCourt.coordinates;
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                      }}
                      className="flex-1 py-1 rounded-lg bg-neon-400 hover:bg-neon-300 text-dark-950 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      Directions →
                    </button>
                    <button
                      onClick={() => setDetailsModalCourt(activeMapCourt)}
                      className="px-2 py-1 rounded-lg bg-dark-850 hover:bg-slate-800 text-slate-200 text-[10px] font-medium border border-slate-700 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            CARD 3 (Bottom Left, 7 cols): Student Insights & Analytics
            ----------------------------------------------------------------------- */}
        <div className="lg:col-span-7 bg-[#0b1222]/90 border border-slate-800/90 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div>
            {/* Header with View Full Analytics */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/70">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-neon-400" />
                  <h2 className="text-lg font-extrabold text-white tracking-tight">
                    Student Insights
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real data. Real opinions from LPU students.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('insights');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-slate-300 hover:text-neon-400 px-3 py-1.5 rounded-full bg-dark-850 border border-slate-700/80 hover:border-neon-500/40 transition-colors flex items-center gap-1"
              >
                <span>View Full Analytics</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* 4 Analytics Sub-Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-4">
              
              {/* Widget 1: Most Preferred Sports Donut */}
              <div className="p-3.5 rounded-2xl bg-[#080d1a] border border-slate-800/80 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-200 mb-1">Most Preferred Sports</span>
                <div className="h-28 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sportsDonutData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={28}
                        outerRadius={45}
                        stroke="none"
                      >
                        {sportsDonutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0c1222', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px' }}
                        formatter={(val: number) => [`${val}%`, 'Interest']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 pt-1">
                  {sportsDonutData.map(d => (
                    <div key={d.name} className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="truncate">{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 2: Facility Satisfaction Radial Gauge */}
              <div className="p-3.5 rounded-2xl bg-[#080d1a] border border-slate-800/80 flex flex-col justify-between items-center text-center">
                <span className="text-xs font-bold text-slate-200 mb-2">Facility Satisfaction</span>
                
                {/* Semi-circular Radial Gauge SVG */}
                <div className="relative w-32 h-20 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 55" className="w-full h-full">
                    {/* Background Arc */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Progress Arc: 78% of 180 deg = ~140 deg */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 82 22"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="10"
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_#22c55e]"
                    />
                  </svg>
                  <div className="absolute bottom-1 font-extrabold text-2xl text-white">
                    78%
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  Satisfied Students
                </p>
              </div>

              {/* Widget 3: Common Problems Bars */}
              <div className="p-3.5 rounded-2xl bg-[#080d1a] border border-slate-800/80 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-200 mb-2">Common Problems</span>
                <div className="space-y-2">
                  {commonProblems.map(p => (
                    <div key={p.label}>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                        <span className="truncate">{p.label}</span>
                        <span className="font-semibold text-slate-300">{p.pct}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-electric-500 to-neon-400 rounded-full" 
                          style={{ width: `${p.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 4: Student Suggestions Quote Card */}
              <div className="p-3.5 rounded-2xl bg-[#080d1a] border border-slate-800/80 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-neon-400 text-xs font-bold">
                  <Lightbulb className="w-4 h-4" />
                  <span>Student Suggestions</span>
                </div>
                <blockquote className="my-2 text-xs italic text-slate-200 leading-snug">
                  "More indoor badminton courts and extended floodlight hours during exam prep!"
                </blockquote>
                <p className="text-[10px] text-slate-500">
                  From 32 verified survey responses
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            CARD 4 (Bottom Right, 5 cols): Feedback & Help
            ----------------------------------------------------------------------- */}
        <div className="lg:col-span-5 bg-[#0b1222]/90 border border-slate-800/90 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800/70">
              <MessageSquare className="w-5 h-5 text-neon-400" />
              <div>
                <h2 className="text-lg font-extrabold text-white tracking-tight">
                  Feedback & Help
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Share your thoughts or get help
                </p>
              </div>
            </div>

            {/* Futuristic 3D Megaphone Graphic with Neon Soundwave Rings */}
            <div className="relative h-44 w-full flex items-center justify-center overflow-hidden my-2 select-none">
              {/* Radial background glow */}
              <div className="absolute w-48 h-48 bg-neon-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute w-36 h-36 bg-electric-500/10 rounded-full blur-xl pointer-events-none" />

              {/* Glowing Soundwave rings */}
              <div className="absolute right-12 w-28 h-28 rounded-full border border-neon-400/30 animate-ping opacity-30 pointer-events-none" />
              <div className="absolute right-16 w-20 h-20 rounded-full border border-electric-400/40 pointer-events-none" />
              <div className="absolute right-20 w-12 h-12 rounded-full border border-neon-400/50 pointer-events-none" />

              {/* 3D Megaphone Graphic Component */}
              <div className="relative flex items-center gap-3">
                <svg className="w-32 h-32 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]" viewBox="0 0 120 120" fill="none">
                  {/* Megaphone body */}
                  <path 
                    d="M30 50 L65 32 L65 88 L30 70 Z" 
                    fill="url(#mega-grad-1)" 
                    stroke="#22c55e" 
                    strokeWidth="2" 
                  />
                  {/* Megaphone bell */}
                  <ellipse cx="65" cy="60" rx="6" ry="28" fill="#00ff88" opacity="0.6" />
                  {/* Speaker handle */}
                  <path d="M38 70 L34 95 L46 95 L44 70" fill="#0c1222" stroke="#38bdf8" strokeWidth="2" />
                  {/* Back casing */}
                  <rect x="20" y="52" width="12" height="16" rx="4" fill="#0c1222" stroke="#22c55e" strokeWidth="2" />
                  <defs>
                    <linearGradient id="mega-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0ea5e9" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#00ff88" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-left space-y-1">
                  <div className="text-sm font-bold text-white">Have a suggestion?</div>
                  <div className="text-xs text-slate-400 max-w-[150px]">
                    Tell us what facilities or improvements LPU needs.
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('feedback');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-full bg-neon-400 hover:bg-neon-300 text-dark-950 font-bold text-xs tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Submit Feedback</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowFaqModal(true)}
                className="w-full sm:w-auto py-3 px-5 rounded-full bg-dark-850 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                View FAQs
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* FAQs Modal */}
      <FaqModal isOpen={showFaqModal} onClose={() => setShowFaqModal(false)} />
    </div>
  );
};
