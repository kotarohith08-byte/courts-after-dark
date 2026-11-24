import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Court, MaintenanceReport } from '../types';
import { 
  Lock, 
  Unlock, 
  Lightbulb, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Users, 
  Trash2, 
  Activity,
  Sliders,
  Sparkles,
  BarChart3
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    courts, 
    bookings, 
    cancelBooking, 
    maintenanceReports, 
    updateReportStatus, 
    toggleCourtLighting, 
    updateCourtStatus,
    isAdminLoggedIn, 
    setIsAdminLoggedIn 
  } = useApp();

  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'courts' | 'bookings' | 'reports' | 'stats'>('courts');

  // Simple secure demo login logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'lpu2026' || adminPassword === 'admin') {
      setIsAdminLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminPassword('');
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-dark-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-electric-500/10 border border-electric-500/30 text-electric-400 flex items-center justify-center mx-auto shadow-glow-blue">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
            LPU Sports Facility Admin Portal
          </h2>
          <p className="text-xs text-slate-400">
            Restricted access for sports department coordinators, electrical maintenance engineers, and venue administrators.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 text-center">
              Invalid credentials. For demonstration, use password: <strong className="font-mono text-white">lpu2026</strong> or <strong className="font-mono text-white">admin</strong>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Administrator Access Key
            </label>
            <input
              type="password"
              required
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password..."
              className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all font-['Space_Grotesk']"
          >
            Authenticate & Access Portal
          </button>

          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800/80 text-[11px] text-slate-400 text-center">
            💡 <strong>Evaluation Demo Key:</strong> Enter <code className="text-electric-400 font-bold">lpu2026</code> to unlock administrator controls.
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-dark-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon-500/20 text-neon-400 border border-neon-500/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Facility Administrator Console
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neon-500/10 text-neon-400 border border-neon-500/30">
                Authorized
              </span>
            </div>
            <p className="text-xs text-slate-400">
              LPU Department of Sports & Infrastructure Management
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="whitespace-nowrap px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Unlock className="w-3.5 h-3.5 text-rose-400" />
          Exit Admin Session
        </button>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveAdminTab('courts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'courts'
              ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40 shadow-glow-subtle'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Court Operations & Lighting ({courts.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'bookings'
              ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40 shadow-glow-subtle'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Booking Requests ({bookings.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'reports'
              ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40 shadow-glow-subtle'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Maintenance Tickets ({maintenanceReports.length})
        </button>
      </div>

      {/* COURTS MANAGEMENT TAB */}
      {activeAdminTab === 'courts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Manage active status and toggle floodlighting for all campus facilities</span>
            <span className="font-mono text-neon-400">
              {courts.filter(c => c.lighting.status === 'Active').length} Courts Illuminated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courts.map((court) => (
              <div
                key={court.id}
                className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-xl"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-electric-400 font-bold">
                      {court.sport} • {court.indoorOutdoor}
                    </span>
                    <h3 className="font-bold text-sm text-white mt-0.5 font-['Space_Grotesk']">
                      {court.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{court.landmark}</p>
                  </div>

                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    court.status === 'available'
                      ? 'bg-neon-500/10 text-neon-400 border-neon-500/30'
                      : court.status === 'occupied'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {court.status}
                  </span>
                </div>

                {/* Status Switcher & Lighting Toggle Controls */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase block mb-1">
                      Court Operational Status
                    </label>
                    <select
                      value={court.status}
                      onChange={(e) => updateCourtStatus(court.id, e.target.value as Court['status'])}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none"
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 uppercase block mb-1">
                      Night Floodlighting
                    </label>
                    <button
                      onClick={() => toggleCourtLighting(court.id)}
                      className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        court.lighting.status === 'Active'
                          ? 'bg-neon-500/20 text-neon-300 border border-neon-500/40 shadow-glow-green'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      {court.lighting.status === 'Active' ? 'Lights ON' : 'Lights OFF'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKINGS AUDIT TAB */}
      {activeAdminTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Audit and oversee all student slot reservations</span>
            <span className="font-mono text-electric-400">{bookings.length} Total Bookings</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-dark-900 shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-dark-950 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Court Name</th>
                  <th className="p-3">Slot & Date</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Reg ID</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-electric-400">{b.id}</td>
                    <td className="p-3 font-semibold text-white">{b.courtName}</td>
                    <td className="p-3 font-mono text-slate-300">{b.date} • {b.timeSlot}</td>
                    <td className="p-3 text-slate-300">{b.bookerName}</td>
                    <td className="p-3 font-mono text-slate-400">{b.studentIdMasked}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                        b.status === 'confirmed'
                          ? 'bg-neon-500/10 text-neon-400 border-neon-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => cancelBooking(b.id)}
                          className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-[11px] transition-colors"
                        >
                          Revoke Slot
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MAINTENANCE TICKETS TAB */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Review and assign maintenance crews to reported issues</span>
            <span className="font-mono text-rose-400">{maintenanceReports.length} Reports</span>
          </div>

          <div className="space-y-3">
            {maintenanceReports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-electric-400 font-bold uppercase">
                      {report.id} • {report.category} ({report.severity})
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5 font-['Space_Grotesk']">
                      {report.courtName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {(['Submitted', 'Under Review', 'Maintenance Dispatched', 'Resolved'] as MaintenanceReport['status'][]).map(st => (
                      <button
                        key={st}
                        onClick={() => updateReportStatus(report.id, st)}
                        className={`px-2 py-1 rounded text-[10px] font-semibold border transition-all ${
                          report.status === st
                            ? 'bg-electric-500 text-dark-950 font-bold border-electric-400'
                            : 'bg-dark-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-dark-950 p-3 rounded-xl border border-slate-800/80">
                  "{report.description}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Reported by: {report.reportedBy} ({report.reportedAt})</span>
                  {report.resolutionNotes && (
                    <span className="text-neon-400">Status: {report.resolutionNotes}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
