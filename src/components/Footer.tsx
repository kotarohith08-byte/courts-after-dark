import React from 'react';
import { useApp } from '../context/AppContext';
import { RunnerLogo } from './Navbar';
import { 
  Heart, 
  MapPin, 
  Github, 
  Instagram, 
  Youtube, 
  Twitter 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 relative bg-[#050811] text-slate-400 text-xs border-t border-slate-800/80 overflow-hidden">
      {/* Neon green subtle glow accent line on top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-neon-400 to-transparent shadow-[0_0_12px_#22c55e]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        
        {/* Main Footer Row matching mockup */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-850">
          
          {/* Left: Brand + Cursive Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div 
              onClick={() => handleNav('home')} 
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-neon-500/10 border border-neon-500/30">
                <RunnerLogo className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold tracking-tight text-white leading-tight text-base">
                  Courts
                </span>
                <span className="font-extrabold tracking-tight text-slate-300 leading-tight text-base">
                  After Dark
                </span>
              </div>
            </div>

            <div className="hidden sm:block h-6 w-px bg-slate-800" />

            <div className="font-script text-2xl text-slate-200/90 tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              Play More. Live Better.
            </div>
          </div>

          {/* Center / Right Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-300">
            <button 
              onClick={() => handleNav('about')}
              className="hover:text-neon-400 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNav('about')}
              className="hover:text-neon-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNav('feedback')}
              className="hover:text-neon-400 transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a 
              href="https://github.com/kotarohith08-byte/courts-after-dark" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-pink-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-rose-500 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors"
              aria-label="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; 2026 Courts After Dark • Lovely Professional University (LPU), Punjab.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built for campus athletes</span>
            <span className="text-neon-400">⚡</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
