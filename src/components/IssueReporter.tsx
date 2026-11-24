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
  ArrowRight,
  MessageSquare,
  HelpCircle,
  Star,
  ThumbsUp,
  Sparkles
} from 'lucide-react';

export const IssueReporter: React.FC = () => {
  const { courts, maintenanceReports, addMaintenanceReport } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'feedback' | 'maintenance' | 'faqs'>('feedback');

  // Maintenance form state
  const [selectedCourtId, setSelectedCourtId] = useState<string>(courts[0]?.id || '');
  const [category, setCategory] = useState<MaintenanceReport['category']>('Lighting');
  const [severity, setSeverity] = useState<MaintenanceReport['severity']>('Medium');
  const [description, setDescription] = useState<string>('');
  const [reporterName, setReporterName] = useState<string>('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [submissionSuccessId, setSubmissionSuccessId] = useState<string | null>(null);

  // Student Feedback Form state
  const [feedbackSport, setFeedbackSport] = useState<string>('Badminton');
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackCategory, setFeedbackCategory] = useState<string>('Lighting & Hours');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackAuthor, setFeedbackAuthor] = useState<string>('');
  const [feedbackSuccess, setFeedbackSuccess] = useState<boolean>(false);

  // Community feedback items
  const [communityFeedback, setCommunityFeedback] = useState<Array<{
    id: string;
    author: string;
    sport: string;
    rating: number;
    text: string;
    date: string;
    likes: number;
  }>>([
    {
      id: 'FB-01',
      author: 'Arjun M. (B.Tech CSE)',
      sport: 'Badminton',
      rating: 5,
      text: 'Shanti Devi Mittal Arena badminton courts are incredible, but evening slots fill up in minutes. Would love 2 additional indoor bays!',
      date: 'Yesterday',
      likes: 18
    },
    {
      id: 'FB-02',
      author: 'Simran K. (MBA)',
      sport: 'Basketball',
      rating: 4,
      text: 'BH-4 floodlit basketball courts have great energy after 8 PM. Replacing the west pole LED ballast made a huge difference.',
      date: '2 days ago',
      likes: 12
    },
    {
      id: 'FB-03',
      author: 'Gaurav P. (B.Design)',
      sport: 'Volleyball',
      rating: 5,
      text: 'Uni-Center volleyball pickup games are the best stressbuster after studio classes. Safe lighting and great atmosphere.',
      date: '3 days ago',
      likes: 9
    }
  ]);

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

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
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

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const newFB = {
      id: `FB-${Math.floor(10 + Math.random() * 90)}`,
      author: feedbackAuthor.trim() || 'LPU Student Athlete',
      sport: feedbackSport,
      rating: feedbackRating,
      text: feedbackText.trim(),
      date: 'Just now',
      likes: 1
    };

    setCommunityFeedback([newFB, ...communityFeedback]);
    setFeedbackText('');
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 4000);
  };

  const faqs = [
    {
      q: 'How do I access the Shanti Devi Mittal Indoor Sports Stadium?',
      a: 'The Indoor Stadium is open to all registered LPU students from 06:00 AM to 10:00 PM daily. A valid physical LPU Student ID card is required at the entry turnstile. Non-marking indoor court shoes are mandatory for the badminton and squash arenas.'
    },
    {
      q: 'What are the night floodlight timings for outdoor campus courts?',
      a: 'Outdoor floodlit courts (including BH-4/5 Basketball, Uni-Center Volleyball, and the Cricket practice bays) illuminate automatically at sunset (~06:00 PM in winter, ~07:15 PM in summer) and remain lit until 10:00 PM every evening.'
    },
    {
      q: 'Are court slot bookings guaranteed or walk-in?',
      a: 'Courts operate on a hybrid system. Peak evening hours (06:00 PM to 09:00 PM) prioritize reserved slots requested through the portal or department sports desk. Open hours remain walk-in friendly on a first-come, first-served basis with 45-minute turnaround rules.'
    },
    {
      q: 'Where can I issue sports equipment (basketballs, shuttles, racquets)?',
      a: 'Equipment checkout counters are located at: 1) Shanti Devi Mittal Ground Floor Desk, 2) Uni-Center Sports Office, and 3) BH-4 Warden Office sports locker. Bring your student ID; checkout is free of charge for up to 2 hours.'
    },
    {
      q: 'How can I report a broken floodlight, damaged net, or water leakage?',
      a: 'Click on the "Report Maintenance" tab above. Choose the category (Lighting, Court Surface, Equipment) and submit a quick note. Reports are routed to the campus sports maintenance desk.'
    },
    {
      q: 'Can Day Scholars use hostel courts after evening hours?',
      a: 'Residential hostel courts (BH-4, BH-5, GH-2) are located inside residential zones where campus biometric pass rules apply. Day scholars are encouraged to use the centralized Shanti Devi Mittal Arena and Uni-Center facilities.'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-500/10 border border-neon-500/30 text-neon-400 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          Student Voice & Campus Maintenance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Feedback, Maintenance & Help
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Share your ideas, report broken lighting or equipment, and get quick answers to frequently asked questions.
        </p>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex justify-center">
        <div className="flex items-center bg-dark-900/90 border border-slate-800 p-1.5 rounded-2xl shadow-xl">
          <button
            onClick={() => setActiveSubTab('feedback')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'feedback'
                ? 'bg-neon-400 text-dark-950 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Student Feedback</span>
          </button>

          <button
            onClick={() => setActiveSubTab('maintenance')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'maintenance'
                ? 'bg-neon-400 text-dark-950 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Report Issue</span>
          </button>

          <button
            onClick={() => setActiveSubTab('faqs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'faqs'
                ? 'bg-neon-400 text-dark-950 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Campus FAQs</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: STUDENT SUGGESTIONS & FEEDBACK
          ========================================================================= */}
      {activeSubTab === 'feedback' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          
          {/* Feedback Form */}
          <div className="lg:col-span-5 bg-dark-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-400" />
              Submit Student Suggestion
            </h2>
            <p className="text-xs text-slate-400">
              Help shape LPU sporting facilities. Your input directly influences scheduling, lighting, and court upgrades.
            </p>

            {feedbackSuccess && (
              <div className="p-3 rounded-2xl bg-neon-500/10 border border-neon-500/30 text-neon-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-neon-400" />
                <span>Thank you! Your suggestion has been posted to community feedback.</span>
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Your Name / Department</label>
                <input
                  type="text"
                  value={feedbackAuthor}
                  onChange={(e) => setFeedbackAuthor(e.target.value)}
                  placeholder="e.g. Rahul Sharma (B.Tech 3rd Yr)"
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-neon-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Sport Category</label>
                  <select
                    value={feedbackSport}
                    onChange={(e) => setFeedbackSport(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-white focus:outline-none focus:border-neon-400"
                  >
                    <option value="Badminton">Badminton</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Other">Other Sport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Feedback Area</label>
                  <select
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-white focus:outline-none focus:border-neon-400"
                  >
                    <option value="Lighting & Hours">Lighting & Hours</option>
                    <option value="Court Cleanliness">Court Cleanliness</option>
                    <option value="Slot Booking Policy">Slot Booking Policy</option>
                    <option value="Equipment Checkout">Equipment Checkout</option>
                    <option value="New Facility Request">New Facility Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className="p-1 text-slate-600 hover:text-amber-400 transition-colors"
                    >
                      <Star className={`w-5 h-5 ${star <= feedbackRating ? 'text-amber-400 fill-amber-400' : ''}`} />
                    </button>
                  ))}
                  <span className="text-slate-400 ml-2 font-medium">{feedbackRating} / 5</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Your Thoughts / Suggestion</label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share details about what can be improved..."
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-neon-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-neon-400 hover:bg-neon-300 text-dark-950 font-bold tracking-wide shadow-[0_0_12px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Feedback
              </button>
            </form>
          </div>

          {/* Community Suggestions Feed */}
          <div className="lg:col-span-7 bg-dark-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-electric-400" />
                  Recent Student Voices
                </h2>
                <span className="text-[11px] text-slate-400">
                  {communityFeedback.length} community posts
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {communityFeedback.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 rounded-2xl bg-dark-850/80 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{item.author}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neon-500/10 text-neon-400 border border-neon-500/20">
                          {item.sport}
                        </span>
                      </div>
                      <div className="flex items-center text-amber-400 text-xs">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      "{item.text}"
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                      <span>{item.date}</span>
                      <button 
                        onClick={() => {
                          setCommunityFeedback(prev => prev.map(f => f.id === item.id ? { ...f, likes: f.likes + 1 } : f));
                        }}
                        className="flex items-center gap-1 text-slate-400 hover:text-neon-400 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{item.likes} upvotes</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/70 text-xs text-slate-400 flex items-center justify-between">
              <span>Have an urgent physical maintenance issue?</span>
              <button
                onClick={() => setActiveSubTab('maintenance')}
                className="text-neon-400 hover:underline font-semibold"
              >
                File Maintenance Ticket →
              </button>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: REPORT FACILITY MAINTENANCE
          ========================================================================= */}
      {activeSubTab === 'maintenance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          
          {/* Issue Form */}
          <div className="lg:col-span-6 bg-dark-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              LPU Maintenance Dispatch Ticket
            </h2>
            <p className="text-xs text-slate-400">
              Report malfunctioning floodlights, court cracks, or broken sports equipment.
            </p>

            {submissionSuccessId && (
              <div className="p-4 rounded-2xl bg-neon-500/10 border border-neon-500/30 text-neon-300 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-neon-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Ticket #{submissionSuccessId} Dispatched!
                </div>
                <p className="text-slate-300">
                  Your report has been logged. Campus maintenance teams inspect tickets within 24 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleMaintenanceSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Target Facility</label>
                <select
                  value={selectedCourtId}
                  onChange={(e) => setSelectedCourtId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-white focus:outline-none focus:border-neon-400"
                >
                  {courts.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.landmark})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Issue Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(cat => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        category === cat.id
                          ? 'bg-neon-500/15 border-neon-500/40 text-white font-semibold'
                          : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{cat.icon}</span>
                      <span className="truncate text-[11px]">{cat.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-white focus:outline-none focus:border-neon-400"
                  >
                    <option value="Low">Low (Cosmetic)</option>
                    <option value="Medium">Medium (Affects Play)</option>
                    <option value="High">High (Court Impassable)</option>
                    <option value="Critical / Safety Hazard">Critical Safety Hazard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Reported By</label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Student / Club Name"
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-neon-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Description of Problem</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe location, light pole number, or damage details..."
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-neon-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-neon-400 hover:bg-neon-300 text-dark-950 font-bold tracking-wide shadow-[0_0_12px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch Ticket
              </button>
            </form>
          </div>

          {/* Ticket Tracker Feed */}
          <div className="lg:col-span-6 bg-dark-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-400" />
                Active Maintenance Status ({maintenanceReports.length})
              </h2>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
              {maintenanceReports.map(report => (
                <div 
                  key={report.id}
                  className="p-3.5 rounded-2xl bg-dark-850/70 border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{report.id} • {report.category}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-dark-950 text-neon-400 border border-neon-500/30">
                      {report.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">{report.courtName}</p>
                  <p className="text-xs text-slate-300">{report.description}</p>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
                    <span>Severity: {report.severity}</span>
                    <span>{report.reportedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 3: CAMPUS FAQS
          ========================================================================= */}
      {activeSubTab === 'faqs' && (
        <div className="max-w-3xl mx-auto bg-dark-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-neon-500/10 border border-neon-500/30 flex items-center justify-center text-neon-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Campus Sports FAQs</h2>
              <p className="text-xs text-slate-400">Frequently asked questions about LPU grounds, courts & access</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-dark-850/80 border border-slate-800 space-y-2"
              >
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-400 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed pl-3.5 border-l border-slate-800">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
