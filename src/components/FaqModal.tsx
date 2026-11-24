import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

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
      a: 'Click on the "Feedback" or "Report Issue" tab on Courts After Dark. Choose the category (Lighting, Court Surface, Equipment) and submit a quick note. Reports are routed to the campus sports maintenance desk.'
    },
    {
      q: 'Can Day Scholars use hostel courts after evening hours?',
      a: 'Residential hostel courts (BH-4, BH-5, GH-2) are located inside residential zones where campus biometric pass rules apply. Day scholars are encouraged to use the centralized Shanti Devi Mittal Arena and Uni-Center facilities.'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-dark-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-500/10 border border-neon-500/30 flex items-center justify-center text-neon-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-400">Everything you need to know about LPU sports facilities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-850 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 overflow-y-auto space-y-3 pr-1">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-dark-850/70 border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left text-sm font-semibold text-slate-200 hover:text-white transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neon-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/50 bg-dark-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Still have questions? Check the Feedback tab.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neon-400 hover:bg-neon-300 text-dark-950 font-bold text-xs transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
