import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Court, SportCategory } from '../types';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Filter,
  Sparkles,
  ChevronRight,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';

export const AvailabilityDashboard: React.FC = () => {
  const { courts, bookings, setBookingModalCourt } = useApp();

  const [selectedSport, setSelectedSport] = useState<SportCategory>('All');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'all' | 'evening' | 'night'>('all');

  const timeSlots = [
    { id: '06:00 AM – 07:00 AM', label: '6:00 AM – 7:00 AM', period: 'morning' },
    { id: '07:00 AM – 08:00 AM', label: '7:00 AM – 8:00 AM', period: 'morning' },
    { id: '04:00 PM – 05:00 PM', label: '4:00 PM – 5:00 PM', period: 'afternoon' },
    { id: '05:00 PM – 06:00 PM', label: '5:00 PM – 6:00 PM', period: 'evening' },
    { id: '06:00 PM – 07:00 PM', label: '6:00 PM – 7:00 PM', period: 'evening' },
    { id: '07:00 PM – 08:00 PM', label: '7:00 PM – 8:00 PM', period: 'evening' },
    { id: '08:00 PM – 09:00 PM', label: '8:00 PM – 9:00 PM', period: 'night' },
    { id: '09:00 PM – 10:00 PM', label: '9:00 PM – 10:00 PM', period: 'night' },
    { id: '10:00 PM – 11:00 PM', label: '10:00 PM – 11:00 PM', period: 'night' }
  ];

  const filteredSlots = timeSlots.filter(s => {
    if (selectedTimeFilter === 'evening') return s.period === 'evening';
    if (selectedTimeFilter === 'night') return s.period === 'night';
    return true;
  });

  const filteredCourts = courts.filter(c => {
    if (selectedSport !== 'All' && c.sport !== selectedSport) return false;
    return true;
  });

  // Calculate court slot status for matrix
  const getSlotStatus = (court: Court, slotId: string) => {
    if (court.status === 'maintenance') return 'maintenance';
    if (court.status === 'closed') return 'closed';

    // Check if slot has a confirmed booking for this court & date
    const booked = bookings.find(b => 
      b.courtId === court.id && 
      b.date === selectedDate && 
      b.timeSlot === slotId &&
      b.status === 'confirmed'
    );

    if (booked) return 'reserved';
    return 'available';
  };

  return (
    <div className="space-y-8">
      {/* Header & Disclaimer */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-500/10 border border-neon-500/20 text-xs text-neon-400 font-semibold">
          <Clock className="w-3.5 h-3.5" />
          Smart Slot & Availability Matrix
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
          Court Availability & Timetable
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Check which LPU courts are available, occupied, under maintenance, or booked by fellow students across different hourly slots.
        </p>

        {/* Prototype Transparency Notice as requested */}
        <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-white">Demonstration Availability Engine:</span>
            <p className="text-slate-400 leading-relaxed">
              Availability indicators shown here are simulation models and manually synced university schedules. Live biometric turnstile sensor data will be linked upon official campus administrative integration.
            </p>
          </div>
        </div>
      </div>

      {/* Date & Filter Toolbar */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Date Picker */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Calendar className="w-4 h-4 text-electric-400" />
              <span>Select Date:</span>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
            />
          </div>

          {/* Time Period Filter */}
          <div className="flex items-center gap-1.5 bg-dark-950 p-1 rounded-xl border border-slate-700 text-xs w-full md:w-auto justify-center">
            <button
              onClick={() => setSelectedTimeFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                selectedTimeFilter === 'all'
                  ? 'bg-electric-500 text-dark-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Day
            </button>
            <button
              onClick={() => setSelectedTimeFilter('evening')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                selectedTimeFilter === 'evening'
                  ? 'bg-electric-500 text-dark-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sunset className="w-3.5 h-3.5 text-amber-400" />
              Evening (5–8 PM)
            </button>
            <button
              onClick={() => setSelectedTimeFilter('night')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                selectedTimeFilter === 'night'
                  ? 'bg-neon-500 text-dark-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-neon-300" />
              Night (8–11 PM)
            </button>
          </div>
        </div>

        {/* Sport Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {(['All', 'Badminton', 'Basketball', 'Football', 'Volleyball', 'Table Tennis', 'Tennis'] as SportCategory[]).map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(!selectedSport || selectedSport !== sport ? sport : 'All')}
              className={`px-3 py-1 rounded-xl text-xs whitespace-nowrap transition-all ${
                selectedSport === sport
                  ? 'bg-electric-500 text-dark-950 font-bold shadow-glow-blue'
                  : 'bg-dark-950 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Status Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-dark-950/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-neon-500/20 border border-neon-500 text-neon-400 flex items-center justify-center text-[10px] font-bold">✓</span>
            <span className="text-slate-300">Available to Book</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center text-[10px] font-bold">●</span>
            <span className="text-slate-300">Reserved / Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-rose-500/20 border border-rose-500 text-rose-400 flex items-center justify-center text-[10px] font-bold">✕</span>
            <span className="text-slate-300">Maintenance / Offline</span>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          Showing slots for: {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* Availability Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-dark-900/90 shadow-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-dark-950/90 border-b border-slate-800 text-slate-400 font-mono">
              <th className="p-4 font-semibold text-slate-300 sticky left-0 bg-dark-950 z-20 min-w-[240px]">
                Court / Facility Venue
              </th>
              {filteredSlots.map(slot => (
                <th key={slot.id} className="p-3 text-center min-w-[130px] font-semibold">
                  <div className="text-white text-[11px]">{slot.label.split('–')[0]}</div>
                  <div className="text-[10px] text-slate-500">{slot.period}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredCourts.map(court => (
              <tr key={court.id} className="hover:bg-slate-800/40 transition-colors">
                {/* Court Name Col */}
                <td className="p-4 sticky left-0 bg-dark-900/95 z-10 border-r border-slate-800 backdrop-blur-md">
                  <div className="font-bold text-white text-xs font-['Space_Grotesk']">
                    {court.name}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span className="text-electric-400">{court.sport}</span>
                    <span>•</span>
                    <span className="text-slate-400 truncate max-w-[170px]">{court.landmark}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[10px] text-neon-400 bg-neon-500/10 px-1.5 py-0.2 rounded border border-neon-500/20 font-mono">
                      {court.lighting.type}
                    </span>
                  </div>
                </td>

                {/* Slots Grid */}
                {filteredSlots.map(slot => {
                  const status = getSlotStatus(court, slot.id);
                  return (
                    <td key={slot.id} className="p-2.5 text-center align-middle">
                      {status === 'available' ? (
                        <button
                          onClick={() => setBookingModalCourt(court)}
                          className="w-full py-2 px-2 rounded-lg bg-neon-500/10 hover:bg-neon-500/25 border border-neon-500/30 text-neon-300 hover:text-white font-medium transition-all group flex flex-col items-center gap-0.5 shadow-sm hover:shadow-glow-green"
                        >
                          <span className="text-[10px] font-semibold">Available</span>
                          <span className="text-[9px] text-neon-400/80 group-hover:text-neon-300">Click to Book</span>
                        </button>
                      ) : status === 'reserved' ? (
                        <div className="w-full py-2 px-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 flex flex-col items-center gap-0.5">
                          <span className="text-[10px] font-bold">Reserved</span>
                          <span className="text-[9px] text-amber-400/80">Simulated Slot</span>
                        </div>
                      ) : (
                        <div className="w-full py-2 px-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 flex flex-col items-center gap-0.5">
                          <span className="text-[10px] font-bold">Maintenance</span>
                          <span className="text-[9px] text-rose-400/80">Offline</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
