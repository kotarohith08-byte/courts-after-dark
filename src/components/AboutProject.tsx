import React from 'react';
import { 
  Flame, 
  Target, 
  Users, 
  Lightbulb, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  CheckCircle2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutProject: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Hero Badge & Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300">
          <Flame className="w-3.5 h-3.5 text-electric-400" />
          <span>Lovely Professional University • Design Thinking Project</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
          About COURTS <span className="text-electric-400">AFTER</span> <span className="text-neon-400">DARK</span>
        </h1>
        <p className="text-lg text-slate-300 font-light font-['Space_Grotesk']">
          "Your Campus. Your Court. Your Game."
        </p>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A dedicated campus sports and nighttime court discovery platform built specifically for students, hostellers, and sports enthusiasts at Lovely Professional University (LPU), Punjab, India.
        </p>
      </div>

      {/* Purpose & Mission */}
      <section className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-electric-400 font-bold">
          <Target className="w-4 h-4" />
          Primary Objective & Purpose
        </div>
        <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">
          Transforming Evening & Night Sports Accessibility at LPU
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Lovely Professional University spans over 600 acres with an active student body of over 30,000 students. After rigorous academic schedules conclude at 5:00 PM, evening and nighttime hours represent the primary window when students seek outdoor exercise, physical recreation, and mental rejuvenation.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          However, students frequently face locked or unlit facilities, lack of visibility into which courts are vacant or occupied, difficulty finding other players for team sports, and uncertain campus weather conditions. <strong>Courts After Dark</strong> bridges this disconnect with an end-to-end digital ecosystem.
        </p>
      </section>

      {/* Problem Statement & User Research Insights */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-3">
          <span className="text-[10px] font-mono uppercase font-bold text-rose-400">
            The Problem Statement
          </span>
          <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
            Evening Recreational Friction
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>Early Closure & Unclear Timings:</strong> 68.8% of surveyed LPU students have avoided sports due to court inaccessibility after sunset.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>Poor Illumination:</strong> 53% identified poor lighting as their primary deterrent to playing after dark.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>Team Matchmaking Deficit:</strong> Students struggle to gather enough participants for 5v5 basketball or 6v6 volleyball pickup games.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-3">
          <span className="text-[10px] font-mono uppercase font-bold text-neon-400">
            The Proposed Solution
          </span>
          <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
            Courts After Dark Architecture
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-neon-400 font-bold">•</span>
              <span><strong>OpenStreetMap Discovery:</strong> Verified GPS coordinates of Shanti Devi Mittal Stadium, BH-4 courts, and outdoor fields with walking estimates.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-400 font-bold">•</span>
              <span><strong>Smart Availability Matrix:</strong> Visual slot indicator distinguishing available, booked, and maintenance intervals.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-400 font-bold">•</span>
              <span><strong>Community Matchmaking:</strong> "Find Your Game" privacy-safe invite board to assemble sports teams in minutes.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Design Thinking Methodology */}
      <section className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Design Thinking Methodology
          </span>
          <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">
            5-Stage Human-Centered Design Cycle
          </h2>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-electric-500/10 text-electric-400 font-bold flex items-center justify-center shrink-0 border border-electric-500/20">
              1
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Empathize: Direct Field Survey</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Conducted an in-depth Google Forms survey across 32+ LPU students, hostellers, and sports enthusiasts to map their behavioral routines, preferred playing hours (peak 5:00 PM to 8:00 PM), and safety perceptions after dark.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center shrink-0 border border-amber-500/20">
              2
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Define: Problem Synthesis</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Synthesized survey responses to articulate that student sports deprivation is not caused by a lack of courts, but rather an informational deficit regarding court lighting, operating hours, and booking access.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-neon-500/10 text-neon-400 font-bold flex items-center justify-center shrink-0 border border-neon-500/20">
              3
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Ideate: Smart Sports Tech Solutions</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Brainstormed automated floodlight telemetry, walking navigation from major residential hubs (BH-1, BH-4, GH Enclave, Uni-Mall), instant slot booking simulation, and automated weather playability indices.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center shrink-0 border border-cyan-500/20">
              4
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Prototype: Interactive Web Application</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Developed the complete Courts After Dark web application featuring Leaflet OpenStreetMap integration, live weather telemetry from Open-Meteo API, dynamic Recharts survey data, and administrator management portal.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 font-bold flex items-center justify-center shrink-0 border border-rose-500/20">
              5
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Test: Student Validation & Iteration</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Integrated a dynamic CSV upload tool allowing future survey waves to update charts instantly. Implemented campus maintenance issue tracking to close the feedback loop between students and university facility engineers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Scope & Hardware Roadmap */}
      <section className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 space-y-4 shadow-xl">
        <span className="text-xs font-mono font-bold uppercase text-electric-400 flex items-center gap-1.5">
          <Cpu className="w-4 h-4" />
          Future Technological Roadmap
        </span>
        <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
          Integration with Physical Campus Infrastructure
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800/80 space-y-1.5">
            <div className="text-electric-400 font-bold font-mono">01. Physical IoT Lighting</div>
            <p className="text-slate-400">
              Deploying LoRaWAN and ESP32 microcontrollers to high-mast floodlight towers for real-time lux sensing and automated curfew power-down.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800/80 space-y-1.5">
            <div className="text-neon-400 font-bold font-mono">02. Biometric RFID Turnstiles</div>
            <p className="text-slate-400">
              Linking booking passes with LPU student RFID smart ID cards for automated keyless turnstile entry at Shanti Devi Mittal Stadium.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800/80 space-y-1.5">
            <div className="text-amber-400 font-bold font-mono">03. University UMS Integration</div>
            <p className="text-slate-400">
              Direct API integration with the LPU University Management System (UMS) to officially validate student credentials and tournament fixtures.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="text-center pt-4">
        <button
          onClick={() => {
            setActiveTab('courts');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all font-['Space_Grotesk']"
        >
          <span>Explore Campus Courts Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
