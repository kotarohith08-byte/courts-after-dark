import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MaintenanceReport } from '../types';
import { 
  AlertTriangle, 
  Lightbulb, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Camera, 
  Send, 
  Info,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const IssueReporter: React.FC = () => {
  const { courts, maintenanceReports, addMaintenanceReport } = useApp();

  const [selectedCourtId, setSelectedCourtId] = useState<string>(courts[0]?.id || '');
  const [category, setCategory] = useState<MaintenanceReport['category']>('Lighting');
  const [severity, setSeverity] = useState<MaintenanceReport['severity']>('Medium');
  const [description, setDescription] = useState<string>('');
  const [reporterName, setReporterName] = useState<string>('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [submissionSuccessId, setSubmissionSuccessId] = useState<string | null>(null);

  const categories: Array<{ id: MaintenanceReport['category']; label: string; icon: string }> = [
    { id: 'Lighting', label: 'Floodlight Failure / Flickering', icon: '💡' },
    { id: 'Court Surface', label: 'Cracked Surface / Anti-skid Wear', icon: '⚡' },
    { id: 'Net / Ring / Post', label: 'Damaged Basketball Ring / Net', icon: '🏀' },
    { id: 'Cleanliness & Waste', label: 'Litter / Waste on Court', icon: '🧹' },
    { id: 'Drinking Water', label: 'Water Dispenser Out of Order', icon: '💧' },
    { id: 'Safety & Security', label: 'Poor Visibility / Safety Concern', icon: '🛡️' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const courtObj = courts.find(c => c.id === selectedCourtId) || courts[0];

    addMaintenanceReport({
      courtId: courtObj.id,
      courtName: courtObj.name,
      category,
      severity,
      description: description.trim(),
      reportedBy: reporterName.trim() || 'LPU Student Resident',
      photoUrl: uploadedImagePreview || undefined
    });

    const newTicketId = `REP-${Math.floor(200 + Math.random() * 800)}`;
    setSubmissionSuccessId(newTicketId);
    setDescription('');
    setUploadedImagePreview(null);
  };

  const getStatusBadge = (status: MaintenanceReport['status']) => {
    switch (status) {
      case 'Submitted':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'Under Review':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Maintenance Dispatched':
        return 'bg-electric-500/10 text-electric-300 border-electric-500/30';
      case 'Resolved':
        return 'bg-neon-500/10 text-neon-400 border-neon-500/30';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          Campus Sports Maintenance & Facility Feedback
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
          Report an Issue or Safety Hazard
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Help keep LPU sports facilities safe, properly lit, and well-maintained. Direct reports are forwarded to the university electrical and civil maintenance divisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Submit Maintenance Report
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select the affected court and specify the observed problem.
            </p>
          </div>

          {submissionSuccessId && (
            <div className="p-4 rounded-2xl bg-neon-500/10 border border-neon-500/30 text-xs text-neon-300 space-y-2 animate-in zoom-in-95">
              <div className="flex items-center gap-2 font-bold text-sm text-white">
                <CheckCircle2 className="w-5 h-5 text-neon-400" />
                Report Registered Successfully!
              </div>
              <p>
                Your ticket has been logged into the campus facility tracker. Our operations team reviews night floodlight tickets within 2 hours.
              </p>
              <button
                onClick={() => setSubmissionSuccessId(null)}
                className="text-xs text-neon-400 font-bold underline"
              >
                Log another report
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Issue Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-2.5 rounded-xl text-xs text-left border transition-all flex flex-col justify-between min-h-[64px] ${
                      category === cat.id
                        ? 'bg-electric-500/20 text-electric-300 border-electric-500/50 shadow-glow-subtle font-semibold'
                        : 'bg-dark-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="line-clamp-1">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Court */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Affected Sports Court *
              </label>
              <select
                value={selectedCourtId}
                onChange={(e) => setSelectedCourtId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
              >
                {courts.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.landmark})
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Rating */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Urgency / Severity Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Low', 'Medium', 'High', 'Critical / Safety Hazard'] as MaintenanceReport['severity'][]).map(sev => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverity(sev)}
                    className={`py-2 px-1 text-[11px] rounded-xl border text-center transition-all ${
                      severity === sev
                        ? sev.includes('Critical')
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500 font-bold'
                          : 'bg-electric-500/20 text-electric-300 border-electric-500 font-bold'
                        : 'bg-dark-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {sev.split('/')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Detailed Description of the Issue *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. North floodlight pole has 2 dead LED fixtures; corner of court is completely dark after 7:30 PM..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
              ></textarea>
            </div>

            {/* Image Upload Simulator */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Attach Photo (Optional)</span>
                <span className="text-[10px] text-slate-500">Supports JPG, PNG</span>
              </label>
              <div className="p-4 rounded-xl bg-dark-950 border border-dashed border-slate-700 text-center space-y-2">
                {uploadedImagePreview ? (
                  <div className="space-y-2">
                    <img src={uploadedImagePreview} alt="Preview" className="max-h-36 rounded-lg mx-auto object-cover" />
                    <button
                      type="button"
                      onClick={() => setUploadedImagePreview(null)}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Remove photo
                    </button>
                  </div>
                ) : (
                  <div>
                    <Camera className="w-6 h-6 text-slate-500 mx-auto" />
                    <label className="cursor-pointer text-xs text-electric-400 hover:underline block mt-1">
                      Click to upload court photo
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <span className="text-[10px] text-slate-500 block">Take a picture of damaged lights or court floor</span>
                  </div>
                )}
              </div>
            </div>

            {/* Reporter Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Your Name / Student ID (Optional for follow-up)
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="e.g. Hosteller BH-4 Wing B"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all flex items-center justify-center gap-2 font-['Space_Grotesk']"
            >
              <Send className="w-4 h-4" />
              Dispatch Maintenance Ticket
            </button>
          </form>
        </div>

        {/* Live Issue Tracker Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Live Campus Issue Board
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {maintenanceReports.length} tickets
            </span>
          </div>

          <div className="space-y-3">
            {maintenanceReports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 hover:border-slate-700 transition-all shadow-xl"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-electric-400 uppercase font-bold">
                      {report.id} • {report.category}
                    </span>
                    <h3 className="font-bold text-sm text-white mt-0.5 font-['Space_Grotesk']">
                      {report.courtName}
                    </h3>
                  </div>

                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(report.status)}`}>
                    {report.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-dark-950 p-3 rounded-xl border border-slate-800/80">
                  "{report.description}"
                </p>

                {report.resolutionNotes && (
                  <div className="text-[11px] text-neon-300 bg-neon-500/10 p-2.5 rounded-lg border border-neon-500/20 font-mono">
                    🔧 Tech Update: {report.resolutionNotes}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                  <span>Reported: {report.reportedAt}</span>
                  <span className={`font-semibold ${
                    report.severity.includes('Critical') ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {report.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
