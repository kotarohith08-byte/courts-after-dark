import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Users, 
  Trash2, 
  QrCode, 
  X, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const BookingsView: React.FC = () => {
  const { bookings, cancelBooking, setActiveTab, setBookingModalCourt, courts } = useApp();
  const [viewingPass, setViewingPass] = useState<Booking | null>(null);

  const activeBookings = bookings.filter(b => b.status === 'confirmed');
  const pastBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-400 uppercase tracking-wider mb-1">
            <CalendarCheck className="w-3.5 h-3.5" />
            Your Sports Schedules
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
            Student Court Reservations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review your confirmed simulated time slots, view QR entry passes, and cancel slots when plans change.
          </p>
        </div>

        <button
          onClick={() => {
            setBookingModalCourt(courts[0]);
          }}
          className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all font-['Space_Grotesk']"
        >
          + Book New Slot
        </button>
      </div>

      {/* Active Bookings Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
          <span>Active Reservations</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-neon-500/10 text-neon-400 border border-neon-500/20 font-mono">
            {activeBookings.length}
          </span>
        </h2>

        {activeBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-xl"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-electric-500/10 text-electric-300 border border-electric-500/20 font-bold">
                      {b.sport}
                    </span>
                    <h3 className="font-bold text-sm text-white mt-1.5 font-['Space_Grotesk']">
                      {b.courtName}
                    </h3>
                  </div>

                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-neon-500/20 text-neon-400 border border-neon-500/40">
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-dark-950 border border-slate-800/80">
                  <div className="text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-electric-400" />
                    <span>{b.timeSlot}</span>
                  </div>
                  <div className="text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{b.participantsCount} Players</span>
                  </div>
                  <div className="text-slate-400 text-[11px] col-span-2">
                    Booker: <span className="text-white font-sans">{b.bookerName}</span> ({b.studentIdMasked})
                  </div>
                </div>

                {b.notes && (
                  <p className="text-xs text-slate-400 italic">
                    "{b.notes}"
                  </p>
                )}

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setViewingPass(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5 text-electric-400" />
                    View QR Pass
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to cancel this booking slot?')) {
                        cancelBooking(b.id);
                      }
                    }}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 hover:underline transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Cancel Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-dark-900 border border-slate-800 text-center space-y-3">
            <p className="text-sm text-slate-400">
              You have no active court reservations right now.
            </p>
            <button
              onClick={() => {
                setBookingModalCourt(courts[0]);
              }}
              className="px-4 py-2 rounded-xl bg-electric-500 text-dark-950 font-bold text-xs uppercase tracking-wide hover:brightness-110 font-['Space_Grotesk']"
            >
              Browse Availability & Book
            </button>
          </div>
        )}
      </div>

      {/* Cancelled / Past Bookings */}
      {pastBookings.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-slate-800">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Past / Cancelled History ({pastBookings.length})
          </h2>
          <div className="space-y-2">
            {pastBookings.map((b) => (
              <div key={b.id} className="p-3 rounded-xl bg-dark-950 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div>
                  <span className="font-semibold text-slate-300">{b.courtName}</span>
                  <span className="ml-2 text-slate-500 font-mono">({b.date} • {b.timeSlot})</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Pass Inspection Modal */}
      {viewingPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-dark-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-electric-400">PASS #{viewingPass.id}</span>
              <button onClick={() => setViewingPass(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto">
              <QrCode className="w-36 h-36 text-dark-950 mx-auto" />
            </div>

            <div className="space-y-1 font-mono text-xs">
              <div className="font-bold text-white text-sm">{viewingPass.courtName}</div>
              <div className="text-slate-400">{viewingPass.date} • {viewingPass.timeSlot}</div>
              <div className="text-neon-400 font-semibold">{viewingPass.bookerName} ({viewingPass.studentIdMasked})</div>
            </div>

            <div className="text-[10px] text-slate-400 bg-dark-950 p-2.5 rounded-xl border border-slate-800">
              Simulated demonstration pass. Show this screen at LPU sports kiosk for testing.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
