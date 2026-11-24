import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  Thermometer, 
  Umbrella, 
  Sunset, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

export const WeatherSection: React.FC = () => {
  const { weather, refreshWeather, setActiveTab } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshWeather();
    setTimeout(() => setRefreshing(false), 500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-neon-400 border-neon-500/40 bg-neon-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const sportsSuitability = [
    { sport: 'Indoor Badminton & TT', status: 'Optimal (100%)', note: 'Shanti Devi Mittal Stadium fully air-conditioned', icon: '🏸', safe: true },
    { sport: 'Basketball (BH-4 & Unipolis)', status: weather.rainChance > 40 ? 'Risk of Wet Surface' : 'Excellent (95%)', note: 'Floodlights active until 10:30 PM', icon: '🏀', safe: weather.rainChance <= 40 },
    { sport: 'Football & Athletics Track', status: weather.rainChance > 50 ? 'Postpone Due to Rain' : 'Great (90%)', note: 'Turf firm and ready under main stadium lights', icon: '⚽', safe: weather.rainChance <= 50 },
    { sport: 'Lawn Tennis', status: weather.windSpeed > 20 ? 'Wind Drift Caution' : 'Good (85%)', note: 'Outdoor courts may experience wind gusts', icon: '🎾', safe: weather.windSpeed <= 20 },
    { sport: 'Volleyball (Uni-Center)', status: weather.rainChance > 40 ? 'Slippery Sand/Hardcourt' : 'Optimal (90%)', note: 'Ideal evening temperature under central tower', icon: '🏐', safe: weather.rainChance <= 40 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-electric-400 uppercase tracking-wider mb-1">
            <CloudSun className="w-3.5 h-3.5" />
            Live LPU Campus Meteorological Engine
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
            Weather & Playing Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time atmospheric telemetry and playing conditions for Lovely Professional University, Phagwara, Punjab (31.2536° N, 75.7037° E).
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all hover:border-slate-500"
        >
          <RotateCw className={`w-3.5 h-3.5 text-electric-400 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Syncing Weather...' : 'Refresh Campus Weather'}
        </button>
      </div>

      {/* Main Weather Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Metrics Card */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-dark-900 via-dark-900 to-dark-950 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-electric-400" />
                LPU Campus, Phagwara, Punjab
              </span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                weather.isLive 
                  ? 'bg-neon-500/10 text-neon-400 border-neon-500/30' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}>
                {weather.isLive ? '● Live Open-Meteo Feed' : '○ Verified Fallback Mode'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mt-6">
              <div>
                <div className="text-5xl sm:text-7xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
                  {weather.temperature}°C
                </div>
                <div className="text-base text-electric-300 font-medium mt-1">
                  {weather.condition} • Feels like {weather.feelsLike}°C
                </div>
              </div>

              {/* Sunset Widget */}
              <div className="p-3.5 rounded-2xl bg-dark-950/80 border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <Sunset className="w-4 h-4 text-amber-400" />
                  Campus Sunset
                </div>
                <div className="text-white font-bold text-sm">
                  {weather.sunsetTime} IST
                </div>
                <div className="text-[10px] text-neon-400 font-semibold">
                  Floodlights auto-activated
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800/80">
              <div className="text-slate-500 flex items-center gap-1 text-[10px] uppercase">
                <Droplets className="w-3 h-3 text-electric-400" />
                Humidity
              </div>
              <div className="text-white font-bold text-sm mt-0.5">{weather.humidity}%</div>
            </div>

            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800/80">
              <div className="text-slate-500 flex items-center gap-1 text-[10px] uppercase">
                <Wind className="w-3 h-3 text-cyan-400" />
                Wind Speed
              </div>
              <div className="text-white font-bold text-sm mt-0.5">{weather.windSpeed} km/h</div>
            </div>

            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800/80">
              <div className="text-slate-500 flex items-center gap-1 text-[10px] uppercase">
                <Umbrella className="w-3 h-3 text-indigo-400" />
                Rain Chance
              </div>
              <div className="text-white font-bold text-sm mt-0.5">{weather.rainChance}%</div>
            </div>
          </div>
        </div>

        {/* Playability Gauge Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              AI Playability Rating
            </span>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] mt-1">
              Outdoor Suitability
            </h3>
          </div>

          <div className="text-center space-y-3">
            <div className={`w-32 h-32 rounded-full border-4 mx-auto flex flex-col items-center justify-center ${getScoreColor(weather.playabilityIndex)}`}>
              <span className="text-4xl font-extrabold font-['Space_Grotesk'] tracking-tight">
                {weather.playabilityIndex}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">/ 100</span>
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-neon-400">
              {weather.playabilityIndex >= 80 ? 'Excellent for Sports' : weather.playabilityIndex >= 60 ? 'Moderate Playability' : 'Unfavorable Weather'}
            </span>
          </div>

          {/* Smart Notice */}
          <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
            <span>{weather.playabilityAdvice}</span>
          </div>
        </div>
      </div>

      {/* Hourly Evening / Night Forecast */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
          <Clock className="w-4 h-4 text-electric-400" />
          Hourly Evening & Night Projection
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {weather.hourly.map((h, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800/80 text-center space-y-1.5 font-mono"
            >
              <div className="text-xs text-slate-400">{h.time}</div>
              <div className="text-lg font-bold text-white font-['Space_Grotesk']">{h.temp}°C</div>
              <div className="text-[10px] text-electric-300 flex items-center justify-center gap-1">
                <Umbrella className="w-3 h-3" />
                {h.rainProb}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sport Playability Matrix */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
          Discipline-Specific Playability Advisor
        </h3>

        <div className="divide-y divide-slate-800/80 text-xs">
          {sportsSuitability.map((item, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xl p-1.5 rounded-lg bg-dark-950 border border-slate-800">
                  {item.icon}
                </span>
                <div>
                  <div className="font-semibold text-white">{item.sport}</div>
                  <div className="text-[11px] text-slate-400">{item.note}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                  item.safe 
                    ? 'bg-neon-500/10 text-neon-400 border-neon-500/30' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
