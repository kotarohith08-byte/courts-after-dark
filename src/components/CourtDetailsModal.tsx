import React from 'react';
import { useApp } from '../context/AppContext';
import { Court } from '../types';
import { 
  X, 
  MapPin, 
  Clock, 
  Lightbulb, 
  ShieldCheck, 
  Heart, 
  Footprints, 
  Share2, 
  Calendar,
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const CourtDetailsModal: React.FC = () => {
  const { detailsModalCourt, setDetailsModalCourt, setBookingModalCourt, isFavorite, toggleFavorite } = useApp();

  if (!detailsModalCourt) return null;

  const court = detailsModalCourt;
  const isFav = isFavorite(court.id);

  const handleOpenBooking = () => {
    const targetCourt = court;
    setDetailsModalCourt(null);
    setBookingModalCourt(targetCourt);
  };

  const handleOpenGoogleMaps = () => {
    const [lat, lng] = court.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setDetailsModalCourt(null)}
    >
      <div 
        className="relative w-full max-w-3xl bg-dark-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-dark-950">
          <img 
            src={court.photos[0] || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80'} 
            alt={court.name}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
          
          {/* Top Bar Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-dark-900/80 backdrop-blur-md text-neon-400 border border-neon-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified LPU Facility
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(court.id)}
                className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                  isFav 
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                    : 'bg-dark-900/70 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title={isFav ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-400' : ''}`} />
              </button>

              <button
                onClick={() => setDetailsModalCourt(null)}
                className="p-2.5 rounded-full bg-dark-900/70 text-slate-300 border border-slate-700 hover:text-white hover:bg-dark-850 transition-all"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Court Info Overlay on Bottom of Image */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-md bg-neon-500/20 text-neon-300 border border-neon-500/30">
                {court.sport}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-dark-850/80 text-slate-300 border border-slate-700">
                {court.indoorOutdoor === 'indoor' ? 'Indoor Arena' : 'Outdoor Court'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {court.name}
            </h2>
            <p className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
              <MapPin className="w-3.5 h-3.5 text-electric-400" />
              {court.locationName} • {court.landmark}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-neon-400" />
                <span>Operating Hours</span>
              </div>
              <p className="text-sm font-bold text-white">{court.timings.open} - {court.timings.close}</p>
            </div>

            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-electric-400" />
                <span>Night Lighting</span>
              </div>
              <p className="text-sm font-bold text-neon-400">{court.lighting.type}</p>
            </div>

            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Footprints className="w-3.5 h-3.5 text-purple-400" />
                <span>From Uni-Mall</span>
              </div>
              <p className="text-sm font-bold text-white">~{court.walkingMinutesFromUniMall} min walk</p>
            </div>

            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Player Capacity</span>
              </div>
              <p className="text-sm font-bold text-white">{court.capacity} players max</p>
            </div>
          </div>

          {/* Facility Status Notice */}
          <div className="p-4 rounded-2xl bg-neon-500/10 border border-neon-500/20 flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-400 mt-1 animate-pulse" />
            <div>
              <p className="text-xs font-bold text-white">Real-Time Facility Status</p>
              <p className="text-xs text-slate-300 mt-0.5">
                {court.statusNote || 'Available for open student practice. Floodlights operational after sunset.'}
              </p>
            </div>
          </div>

          {/* Amenities & Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-dark-850/60 border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Facility Amenities
              </h3>
              <ul className="space-y-1.5">
                {court.amenities.map((amenity, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-400" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-dark-850/60 border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Campus Court Guidelines
              </h3>
              <ul className="space-y-1.5">
                {court.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-400 mt-1" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-dark-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleOpenGoogleMaps}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-850 border border-slate-700 text-slate-200 text-xs font-semibold hover:border-slate-500 hover:text-white transition-all"
          >
            <MapPin className="w-4 h-4 text-electric-400" />
            Get Campus Directions
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDetailsModalCourt(null)}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon-400 hover:bg-neon-300 text-dark-950 font-bold text-xs shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Request Court Slot
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
