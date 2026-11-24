import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Court, Booking } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { bookingModalCourt, setBookingModalCourt, courts, addBooking } = useApp();

  const [selectedCourtId, setSelectedCourtId] = useState<string>(bookingModalCourt?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('07:00 PM – 08:00 PM');
  const [participantsCount, setParticipantsCount] = useState<number>(4);
  const [bookerName, setBookerName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [hostelOrDept, setHostelOrDept] = useState<string>('');
  const [needsEquipment, setNeedsEquipment] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync selected court when modal opens with a specific court
  useEffect(() => {
    if (bookingModalCourt) {
      setSelectedCourtId(bookingModalCourt.id);
    }
  }, [bookingModalCourt]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && bookingModalCourt) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookingModalCourt]);

  // If no court is being booked, do not render the modal
  if (!bookingModalCourt) return null;

  const currentCourt = courts.find(c => c.id === selectedCourtId) || bookingModalCourt;

  const availableSlots = [
    '06:00 AM – 07:00 AM',
    '07:00 AM – 08:00 AM',
    '04:00 PM – 05:00 PM',
    '05:00 PM – 06:00 PM',
    '06:00 PM – 07:00 PM',
    '07:00 PM – 08:00 PM',
    '08:00 PM – 09:00 PM',
    '09:00 PM – 10:00 PM',
    '10:00 PM – 11:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!bookerName.trim()) {
      setErrorMessage('Please enter your full student name.');
      return;
    }
    if (!studentId.trim()) {
      setErrorMessage('Please enter your LPU Student Registration Number.');
      return;
    }

    // Mask registration ID to protect privacy (e.g., 12204567 -> 1220****)
    const rawId = studentId.trim();
    const maskedId = rawId.length > 4 ? `${rawId.slice(0, 4)}****` : '1220****';

    const result = addBooking({
      courtId: currentCourt.id,
      courtName: currentCourt.name,
      sport: currentCourt.sport,
      date: selectedDate,
      timeSlot: selectedSlot,
      participantsCount: Number(participantsCount),
      bookerName: bookerName.trim(),
      bookerDept: hostelOrDept.trim() || 'LPU Student',
      studentIdMasked: maskedId,
      needsEquipment,
      notes: notes.trim()
    });

    if (result.success && result.booking) {
      setConfirmedBooking(result.booking);
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleClose = () => {
    setBookingModalCourt(null);
    setConfirmedBooking(null);
    setErrorMessage('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md animate-in fade-in"
      onClick={handleClose}
    >
      <div 
        className="bg-dark-900 border border-slate-700/80 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neon-400 bg-neon-500/10 px-2.5 py-0.5 rounded-full border border-neon-500/20">
              <Sparkles className="w-3 h-3" />
              Courts After Dark • Slot Reservation
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 font-['Space_Grotesk']">
              {confirmedBooking ? 'Booking Confirmed!' : 'Request a Court Slot'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-3.5 rounded-xl bg-electric-500/10 border border-electric-500/20 text-xs text-electric-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-electric-400" />
          <span>
            <strong>Simulated Prototype Reservation:</strong> This is a design thinking demonstration feature. Bookings are stored locally for testing and will not enforce physical court clearance until official university integration.
          </span>
        </div>

        {confirmedBooking ? (
          /* Confirmation Screen */
          <div className="space-y-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-neon-500/20 border-2 border-neon-500 flex items-center justify-center mx-auto text-neon-400 shadow-glow-green">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Your Night Slot is Reserved!
              </h3>
              <p className="text-xs text-slate-400">
                Please present this digital pass at the court reception or hostel guard booth if requested.
              </p>
            </div>

            {/* Digital Match Pass Badge */}
            <div className="p-5 rounded-2xl bg-dark-950 border border-slate-700/80 text-left space-y-4 font-mono shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Booking Pass ID</div>
                  <div className="text-base font-bold text-electric-400">{confirmedBooking.id}</div>
                </div>
                <div className="p-2 rounded-lg bg-white text-dark-950">
                  <QrCode className="w-8 h-8" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Sports Facility</div>
                  <div className="font-semibold text-white truncate">{confirmedBooking.courtName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Discipline</div>
                  <div className="font-semibold text-neon-400">{confirmedBooking.sport}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Date & Time</div>
                  <div className="font-semibold text-white">{confirmedBooking.date} • {confirmedBooking.timeSlot}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Players</div>
                  <div className="font-semibold text-white">{confirmedBooking.participantsCount} Students</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Reserved By</div>
                  <div className="font-semibold text-white">{confirmedBooking.bookerName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Registration ID</div>
                  <div className="font-semibold text-slate-300">{confirmedBooking.studentIdMasked}</div>
                </div>
              </div>

              {confirmedBooking.needsEquipment && (
                <div className="p-2 rounded-lg bg-dark-900 border border-slate-800 text-[11px] text-electric-300">
                  ⚡ Equipment Request: Student checked out sports gear at facility kiosk.
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all font-['Space_Grotesk']"
            >
              Done / Return to Platform
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Select Court */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Sports Court / Venue
              </label>
              <select
                value={selectedCourtId}
                onChange={(e) => setSelectedCourtId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
              >
                {courts.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.sport} • {c.lighting.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Slot in 2 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-electric-400" />
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neon-400" />
                  Time Slot
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
                >
                  {availableSlots.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Participants Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-electric-400" />
                  Number of Players
                </span>
                <span className="text-electric-400 font-mono">{participantsCount} Players</span>
              </label>
              <input
                type="range"
                min="1"
                max={Math.min(currentCourt.capacity, 20)}
                value={participantsCount}
                onChange={(e) => setParticipantsCount(Number(e.target.value))}
                className="w-full accent-electric-400 cursor-pointer"
              />
            </div>

            {/* Student Name & Reg ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={bookerName}
                  onChange={(e) => setBookerName(e.target.value)}
                  placeholder="e.g. Tanmay Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  LPU Reg. Number *
                </label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 12208942"
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400 font-mono"
                />
              </div>
            </div>

            {/* Hostel / Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Hostel / Academic Department (Optional)
              </label>
              <input
                type="text"
                value={hostelOrDept}
                onChange={(e) => setHostelOrDept(e.target.value)}
                placeholder="e.g. Boys Hostel BH-4 / B.Tech CSE"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
              />
            </div>

            {/* Equipment rental checkbox */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-dark-950 border border-slate-800">
              <input
                type="checkbox"
                id="equip"
                checked={needsEquipment}
                onChange={(e) => setNeedsEquipment(e.target.checked)}
                className="rounded border-slate-700 text-electric-500 focus:ring-0 cursor-pointer w-4 h-4"
              />
              <label htmlFor="equip" className="text-xs text-slate-300 cursor-pointer select-none">
                Request basic sport equipment (ball, racquets, or bibs) from campus sports desk
              </label>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Match Purpose / Remarks (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Inter-wing badminton practice match"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 hover:brightness-110 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-blue font-['Space_Grotesk']"
              >
                Confirm Slot Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
