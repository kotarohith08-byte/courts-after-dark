import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { computeSurveyStats, RAW_SURVEY_RECORDS } from '../data/surveyData';
import { SurveyRecord } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  Upload, 
  CheckCircle2, 
  FileSpreadsheet, 
  Sparkles, 
  MessageSquare,
  ShieldCheck,
  Target,
  ArrowRight,
  Clock,
  Droplets
} from 'lucide-react';

export const SurveyInsights: React.FC = () => {
  const { surveyRecords, setSurveyRecords } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'methodology' | 'responses'>('analytics');
  const [csvUploadSuccess, setCsvUploadSuccess] = useState<string | null>(null);

  const stats = computeSurveyStats(surveyRecords);

  const PIE_COLORS = ['#00e5ff', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#64748b'];

  // Handle Dynamic CSV upload
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const parsed = parseCsvToRecords(text);
        if (parsed.length > 0) {
          setSurveyRecords(parsed);
          setCsvUploadSuccess(`Successfully imported ${parsed.length} survey responses! Dynamic charts updated.`);
          setTimeout(() => setCsvUploadSuccess(null), 6000);
        }
      } catch (err) {
        alert('Could not parse CSV format. Please ensure headers match Google Forms.');
      }
    };
    reader.readAsText(file);
  };

  const parseCsvToRecords = (csvText: string): SurveyRecord[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    // Simple robust regex CSV splitter supporting quotes
    const parseRow = (line: string): string[] => {
      const row: string[] = [];
      let inQuotes = false;
      let current = '';
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      row.push(current.trim());
      return row;
    };

    const records: SurveyRecord[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const r = parseRow(line);
      if (r.length >= 10) {
        records.push({
          timestamp: r[0] || '',
          ageGroup: r[1] || '18–21',
          occupation: r[2] || 'Student',
          frequency: r[3] || 'Weekly',
          hasAccess: r[4] || 'Yes',
          preferredTime: r[5] || 'Evening',
          avoidedDueToEveningClosure: r[6] || 'No',
          adequateIllumination: r[7] || 'Partially',
          majorProblems: r[8] ? r[8].split(',').map(s => s.trim().replace(/^"|"$/g, '')) : [],
          feelSafeAfterSunset: r[9] || 'Yes',
          lightingEncouragesPlay: r[10] || 'Yes',
          suggestedImprovements: r[11] || '',
          wouldUseNightCourt: r[12] || 'Definitely',
          desiredAmenities: r[13] ? r[13].split(',').map(s => s.trim().replace(/^"|"$/g, '')) : [],
          idealClosingTime: r[14] || 'Until 9 PM',
          recommendProject: r[15] || 'Yes',
          additionalComments: r[16] || ''
        });
      }
    }
    return records;
  };

  if (!stats) return null;

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-400 uppercase tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            LPU Design Thinking Project Research
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
            Student Research & Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Empirical data collected from LPU students through the "Courts After Dark – Sports Accessibility and Nighttime Court Usage Survey".
          </p>
        </div>

        {/* Dynamic CSV Import Button */}
        <div>
          <label className="cursor-pointer whitespace-nowrap px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-electric-400 text-xs font-semibold flex items-center gap-2 transition-all shadow-md">
            <Upload className="w-3.5 h-3.5 text-electric-400" />
            Import Updated CSV
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleCsvUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {csvUploadSuccess && (
        <div className="p-4 rounded-2xl bg-neon-500/10 border border-neon-500/30 text-xs text-neon-300 flex items-center gap-2 animate-in zoom-in-95">
          <CheckCircle2 className="w-4 h-4 text-neon-400 shrink-0" />
          <span>{csvUploadSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'analytics'
              ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40 shadow-glow-subtle'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Dynamic Analytics & Charts
        </button>
        <button
          onClick={() => setActiveTab('methodology')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'methodology'
              ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40 shadow-glow-subtle'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Design Thinking Framework
        </button>
        <button
          onClick={() => setActiveTab('responses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'responses'
              ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40 shadow-glow-subtle'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Raw Responses & Voices ({stats.totalResponses})
        </button>
      </div>

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Headline Stats Banner */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500">Sample Size</div>
              <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                {stats.totalResponses}
              </div>
              <div className="text-[11px] text-electric-400">Authentic LPU Responses</div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500">Evening Inaccessibility</div>
              <div className="text-3xl font-extrabold text-rose-400 font-['Space_Grotesk']">
                {stats.headline.avoidedEveningPercent}%
              </div>
              <div className="text-[11px] text-slate-400">Avoided play due to closed courts</div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500">Lighting Leverage</div>
              <div className="text-3xl font-extrabold text-neon-400 font-['Space_Grotesk']">
                {stats.headline.lightingEncouragesPercent}%
              </div>
              <div className="text-[11px] text-slate-400">Encouraged by better lighting</div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500">Night Court Demand</div>
              <div className="text-3xl font-extrabold text-electric-400 font-['Space_Grotesk']">
                {stats.headline.wouldUseNightCourtPercent}%
              </div>
              <div className="text-[11px] text-slate-400">Would use Courts After Dark</div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-1 col-span-2 lg:col-span-1">
              <div className="text-[10px] font-mono uppercase text-slate-500">Active Sports Base</div>
              <div className="text-3xl font-extrabold text-amber-400 font-['Space_Grotesk']">
                {stats.headline.dailyOrFrequentPercent}%
              </div>
              <div className="text-[11px] text-slate-400">Play Daily or 3-4x weekly</div>
            </div>
          </div>

          {/* Charts Row 1: Problems Faced & Desired Amenities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart: Major Nighttime Obstacles */}
            <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400">
                  Pain Points Identified
                </span>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Major Problems Faced at Night (Multiple Select)
                </h3>
              </div>

              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.problemsData.slice(0, 6)} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <XAxis type="number" stroke="#64748b" textAnchor="end" fontSize={11} />
                    <YAxis dataKey="name" type="category" stroke="#cbd5e1" width={110} fontSize={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#090e1d', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      formatter={(val: any) => [`${val} students`, 'Responses']}
                    />
                    <Bar dataKey="count" fill="#38bdf8" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                *Poor lighting (53%), limited hours (44%), and safety concerns (38%) emerge as the primary campus sports friction points.
              </p>
            </div>

            {/* Chart: Desired Amenities */}
            <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neon-400">
                  Student Wishlist
                </span>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Most Desired Amenities in Night Courts
                </h3>
              </div>

              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.amenitiesData.slice(0, 6)} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <XAxis type="number" stroke="#64748b" fontSize={11} />
                    <YAxis dataKey="name" type="category" stroke="#cbd5e1" width={110} fontSize={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#090e1d', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      formatter={(val: any) => [`${val} students`, 'Demand']}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                *Drinking water stations (66%), LED floodlights (56%), seating (56%), and CCTV/security (50%) rank highest.
              </p>
            </div>
          </div>

          {/* Charts Row 2: Preferred Playing Time & Ideal Closing Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Preferred Playing Time Pie */}
            <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase text-electric-400">
                  Schedule Preference
                </span>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Preferred Playing Time
                </h3>
              </div>

              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.timeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={35}
                      paddingAngle={3}
                    >
                      {stats.timeData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#090e1d', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Avoided Evening Sports Pie */}
            <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase text-rose-400">
                  Impact Severity
                </span>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Avoided Sports Due to Closure?
                </h3>
              </div>

              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.avoidedData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={35}
                      paddingAngle={3}
                    >
                      {stats.avoidedData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#10b981'} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#090e1d', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ideal Closing Time Bar */}
            <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400">
                  Curfew Consensus
                </span>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Ideal Operating Hours
                </h3>
              </div>

              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.closingData}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={9} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#090e1d', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                    />
                    <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* METHODOLOGY & DESIGN THINKING TAB */}
      {activeTab === 'methodology' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Design Thinking Framework Mapping
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
              How the 5 stages of Design Thinking were applied to translate student survey data into the Courts After Dark feature set:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-electric-400">01. EMPATHIZE</span>
              <h3 className="text-sm font-bold text-white">Surveying 32+ Students</h3>
              <p className="text-xs text-slate-400">
                Discovered hostellers and sports enthusiasts struggle with evening lockouts, dark fields, and lack of player coordination.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400">02. DEFINE</span>
              <h3 className="text-sm font-bold text-white">The Core Problem</h3>
              <p className="text-xs text-slate-400">
                68.8% miss games because courts close early or lack lighting. Students need a unified way to locate courts, check lighting, and book slots.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-neon-400">03. IDEATE</span>
              <h3 className="text-sm font-bold text-white">Feature Brainstorming</h3>
              <p className="text-xs text-slate-400">
                Conceived interactive OpenStreetMap navigation, real-time availability matrix, simulated booking, and smart IoT lighting automation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">04. PROTOTYPE</span>
              <h3 className="text-sm font-bold text-white">Courts After Dark Web App</h3>
              <p className="text-xs text-slate-400">
                Built this responsive sports tech platform with verified LPU coordinates, weather forecasts, and community matchmaking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400">05. TEST</span>
              <h3 className="text-sm font-bold text-white">Continuous Feedback</h3>
              <p className="text-xs text-slate-400">
                Live issue reporting module and survey update capability allow students to continuously refine campus sports accessibility.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RAW VOICES & QUALITATIVE TAB */}
      {activeTab === 'responses' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-2">
            <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Direct Student Voice & Unfiltered Suggestions
            </h2>
            <p className="text-xs text-slate-400">
              Verbatim quotes provided by survey respondents during the field research phase:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.qualitativeFeedback.map((fb, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="text-electric-400 font-semibold">{fb.occupation}</span>
                    <span>•</span>
                    <span>Age {fb.ageGroup}</span>
                  </div>

                  {fb.comment && (
                    <blockquote className="text-xs text-slate-200 italic border-l-2 border-neon-400 pl-3">
                      "{fb.comment}"
                    </blockquote>
                  )}

                  {fb.improvement && (
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-500 text-[11px] block">Suggested Improvement:</span>
                      <span className="text-white font-medium">{fb.improvement}</span>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-600 font-mono pt-2 border-t border-slate-800/80">
                  Recorded: {fb.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
