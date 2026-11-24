import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, MapPin, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-dark-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div 
              onClick={() => handleNav('home')} 
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-500 to-neon-500 p-0.5 shadow-glow-blue flex items-center justify-center">
                <Flame className="w-4 h-4 text-dark-950" />
              </div>
              <span className="font-bold text-white font-['Space_Grotesk'] text-base tracking-wider uppercase">
                COURTS <span className="text-electric-400">AFTER</span> <span className="text-neon-400">DARK</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Your Campus. Your Court. Your Game."
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Smart sports & nighttime court discovery platform for students of Lovely Professional University (LPU), Punjab, India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
              Platform Features
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => handleNav('courts')} className="hover:text-electric-400 transition-colors">
                  Explore Courts & Campus Map
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('availability')} className="hover:text-electric-400 transition-colors">
                  Court Timetable & Availability
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bookings')} className="hover:text-electric-400 transition-colors">
                  Bookings & Match Passes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('players')} className="hover:text-electric-400 transition-colors">
                  Find Players (Community Pickup)
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Insights */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
              Safety & Research
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => handleNav('weather')} className="hover:text-electric-400 transition-colors">
                  Live Phagwara Campus Weather
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('safety')} className="hover:text-electric-400 transition-colors">
                  Nighttime Safety & Smart Lighting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('report')} className="hover:text-electric-400 transition-colors">
                  Report Broken Lights or Issues
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('survey')} className="hover:text-electric-400 transition-colors">
                  Survey Research & Analytics (32+ Responses)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-electric-400 transition-colors">
                  About Project & Methodology
                </button>
              </li>
            </ul>
          </div>

          {/* LPU Emergency Directory */}
          <div className="space-y-2 font-mono">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
              LPU 24x7 Emergency Helplines
            </h4>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div>
                <span className="text-slate-500 block">Campus Security Control:</span>
                <span className="text-electric-400 font-bold">01824-517000 (Ext. 1000)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Uni-Hospital Ambulance:</span>
                <span className="text-rose-400 font-bold">01824-517200 (Ext. 200)</span>
              </div>
              <div className="pt-1 text-[10px] text-slate-500">
                Jalandhar - Delhi G.T. Road, Phagwara, Punjab 144411
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2026 <strong>Courts After Dark</strong> • Lovely Professional University Design Thinking Project.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with passion for campus sports accessibility</span>
            <Flame className="w-3.5 h-3.5 text-electric-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
