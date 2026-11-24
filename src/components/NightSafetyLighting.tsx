import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lightbulb, 
  ShieldCheck, 
  PhoneCall, 
  Sliders, 
  Cpu, 
  Zap, 
  AlertTriangle, 
  Clock, 
  Radio, 
  Info,
  CheckCircle2,
  Activity
} from 'lucide-react';

export const NightSafetyLighting: React.FC = () => {
  const { courts, toggleCourtLighting, setActiveTab } = useApp();

  // Conceptual IoT controls state
  const [simulationBrightness, setSimulationBrightness] = useState<number>(85);
  const [motionSensorActive, setMotionSensorActive] = useState<boolean>(true);
  const [ecoModeEnabled, setEcoModeEnabled] = useState<boolean>(true);

  // Emergency contact directory for LPU
  const verifiedEmergencyContacts = [
    { title: 'LPU Security Central Control Room', phone: '01824-517000', ext: 'Ext. 1000', note: '24x7 Main Control & Quick Reaction Team (QRT)', icon: ShieldCheck },
    { title: 'LPU Uni-Hospital 24x7 Emergency Ambulance', phone: '01824-517200', ext: 'Ext. 200', note: 'Located adjacent to Block 25, Trauma & Sports Injury Unit', icon: PhoneCall },
    { title: 'Campus Women Safety & Help Desk', phone: '01824-517100', ext: 'Ext. 1100', note: 'Dedicated female security personnel & escorts', icon: ShieldCheck },
    { title: 'Hostel Maintenance & Electrical Helpdesk', phone: '01824-517555', ext: 'Ext. 555', note: 'Prompt response for high-mast floodlight faults', icon: Lightbulb }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-500/10 border border-neon-500/20 text-xs text-neon-400 font-semibold">
          <Lightbulb className="w-3.5 h-3.5" />
          Courts After Dark • Nighttime Safety & Illumination Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
          Nighttime Safety & Smart Lighting
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Empowering LPU students with verified lighting audits, emergency campus hotlines, and an intelligent IoT lighting model designed to eliminate dark spots and enhance campus recreation after sunset.
        </p>
      </div>

      {/* Verified LPU Emergency Contacts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-rose-400" />
            Verified LPU Campus Emergency Hotlines
          </h2>
          <span className="text-xs text-slate-400">24x7 Campus Services</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verifiedEmergencyContacts.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-dark-900 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition-all shadow-xl"
              >
                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 text-rose-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-sm text-white font-['Space_Grotesk']">
                    {contact.title}
                  </h3>
                  <div className="text-base font-extrabold text-electric-400 font-mono">
                    {contact.phone} <span className="text-xs text-slate-400 font-normal">({contact.ext})</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {contact.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Conceptual Smart Lighting IoT Dashboard */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-dark-900 via-dark-850 to-dark-950 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-neon-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-400">
              <Cpu className="w-4 h-4" />
              Next-Gen Campus IoT Infrastructure Concept
            </div>
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] mt-1">
              Smart Adaptive Lighting Dashboard
            </h2>
          </div>

          {/* Prototype disclaimer label as strictly mandated */}
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Simulation Only — Conceptual IoT Prototype
          </span>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800/80 space-y-1">
            <div className="text-slate-500 text-[10px] uppercase">Active Output</div>
            <div className="text-2xl font-bold text-white font-['Space_Grotesk']">{simulationBrightness}%</div>
            <div className="text-[11px] text-neon-400">~{Math.round(simulationBrightness * 6.5)} Lux avg.</div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800/80 space-y-1">
            <div className="text-slate-500 text-[10px] uppercase">Energy Conserved</div>
            <div className="text-2xl font-bold text-neon-400 font-['Space_Grotesk']">
              {ecoModeEnabled ? '34.8%' : '12.0%'}
            </div>
            <div className="text-[11px] text-slate-400">vs Legacy Metal Halide</div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800/80 space-y-1">
            <div className="text-slate-500 text-[10px] uppercase">PIR Motion Status</div>
            <div className="text-base font-bold text-electric-400 font-['Space_Grotesk']">
              {motionSensorActive ? 'Detecting (Players Present)' : 'Standby Mode'}
            </div>
            <div className="text-[11px] text-slate-400">Auto-dim 5 min after exit</div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800/80 space-y-1">
            <div className="text-slate-500 text-[10px] uppercase">Night Curfew Automation</div>
            <div className="text-base font-bold text-amber-400 font-['Space_Grotesk']">10:30 PM Cutoff</div>
            <div className="text-[11px] text-slate-400">Security path lighting remains</div>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-dark-950/70 border border-slate-800">
          {/* Dimmer Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-electric-400" />
                Simulated Floodlight Lux Dimmer
              </span>
              <span className="font-mono text-electric-400 font-bold">{simulationBrightness}% Output</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={simulationBrightness}
              onChange={(e) => setSimulationBrightness(Number(e.target.value))}
              className="w-full accent-electric-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Simulates LED driver dimming to reduce glare during warm-up drills and lower university energy footprint.
            </p>
          </div>

          {/* Automation Toggles */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-200">
              Autonomous Energy Saving Algorithms
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-slate-800 cursor-pointer text-xs">
                <span className="text-slate-300">Motion-Triggered Boost (PIR Sensor)</span>
                <input
                  type="checkbox"
                  checked={motionSensorActive}
                  onChange={(e) => setMotionSensorActive(e.target.checked)}
                  className="w-4 h-4 rounded text-electric-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-slate-800 cursor-pointer text-xs">
                <span className="text-slate-300">Eco Curfew Auto-Dimming after 10:00 PM</span>
                <input
                  type="checkbox"
                  checked={ecoModeEnabled}
                  onChange={(e) => setEcoModeEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-neon-500 focus:ring-0"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Facility Lighting Status Audit */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Activity className="w-4 h-4 text-neon-400" />
            Facility-by-Facility Illumination Audit
          </h2>
          <button
            onClick={() => setActiveTab('report')}
            className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Report a broken floodlight fixture
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courts.map((court) => (
            <div
              key={court.id}
              className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-white line-clamp-1 font-['Space_Grotesk']">
                    {court.name}
                  </h3>
                  <div className="text-[11px] text-slate-400">{court.landmark}</div>
                </div>

                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                  court.lighting.status === 'Active'
                    ? 'bg-neon-500/10 text-neon-400 border-neon-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {court.lighting.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-xl bg-dark-950 border border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Hardware</div>
                  <div className="text-white text-[11px] font-semibold">{court.lighting.type}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Lux Level</div>
                  <div className="text-electric-400 text-[11px] font-semibold">{court.lighting.luxLevel} Lux</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400">
                  Lit Until: <span className="text-white font-mono font-semibold">{court.timings.nightLitUntil}</span>
                </span>
                <span className="text-[10px] text-neon-400 bg-neon-500/10 px-2 py-0.5 rounded border border-neon-500/20">
                  {court.lighting.energySavedPercent}% Eco Efficiency
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
