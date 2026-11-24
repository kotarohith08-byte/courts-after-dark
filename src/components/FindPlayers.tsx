import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GameInvitation, SportCategory } from '../types';
import { 
  Users, 
  Plus, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  X, 
  MessageSquare,
  Lock,
  ChevronRight,
  Filter
} from 'lucide-react';

export const FindPlayers: React.FC = () => {
  const { gameInvitations, addGameInvitation, joinGameInvitation, courts } = useApp();

  const [selectedSport, setSelectedSport] = useState<SportCategory>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [joinModalGame, setJoinModalGame] = useState<GameInvitation | null>(null);
  const [joinPlayerName, setJoinPlayerName] = useState<string>('');

  // Form states for creating a new game invitation
  const [newTitle, setNewTitle] = useState('');
  const [newSport, setNewSport] = useState<SportCategory>('Basketball');
  const [newCourtId, setNewCourtId] = useState<string>(courts[0]?.id || '');
  const [newDate, setNewDate] = useState('Today');
  const [newTime, setNewTime] = useState('07:30 PM');
  const [newPlayersNeeded, setNewPlayersNeeded] = useState<number>(2);
  const [newSkill, setNewSkill] = useState<'Casual / Fun' | 'Intermediate' | 'Competitive'>('Intermediate');
  const [newHostName, setNewHostName] = useState('');
  const [newHostBadge, setNewHostBadge] = useState('LPU Hosteller');
  const [newDescription, setNewDescription] = useState('');

  const filteredGames = gameInvitations.filter(g => {
    if (selectedSport !== 'All' && g.sport !== selectedSport) return false;
    if (selectedSkill !== 'All' && g.skillLevel !== selectedSkill) return false;
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newHostName.trim()) return;

    const selectedCourtObj = courts.find(c => c.id === newCourtId) || courts[0];

    addGameInvitation({
      title: newTitle.trim(),
      sport: newSport,
      courtId: selectedCourtObj.id,
      courtName: selectedCourtObj.name,
      date: newDate,
      time: newTime,
      playersNeeded: Number(newPlayersNeeded),
      skillLevel: newSkill,
      hostName: newHostName.trim(),
      hostBadge: newHostBadge.trim() || 'LPU Student',
      description: newDescription.trim() || 'Join our pickup game under the campus floodlights!'
    });

    setCreateModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewHostName('');
    setNewDescription('');
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinModalGame || !joinPlayerName.trim()) return;

    joinGameInvitation(joinModalGame.id, joinPlayerName.trim());
    setJoinModalGame(null);
    setJoinPlayerName('');
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            Find Your Game • Student Sports Matchmaking
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
            Connect With Fellow LPU Players
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Never miss out because your wingmates are busy. Join open campus games, post pick-up invitations, and fill empty player slots.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="whitespace-nowrap px-5 py-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all flex items-center gap-2 font-['Space_Grotesk']"
        >
          <Plus className="w-4 h-4" />
          Create Game Invite
        </button>
      </div>

      {/* Privacy Safeguard Notice as explicitly required */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <Lock className="w-5 h-5 text-neon-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Student Privacy Safeguard:</span>
          <p className="text-slate-400 mt-0.5">
            To protect your privacy and campus safety, registration numbers, mobile phone numbers, and room numbers are never published. Coordinate using first names and meet directly at the designated sports court.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-dark-900 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sport:
          </span>
          {(['All', 'Basketball', 'Badminton', 'Football', 'Volleyball', 'Table Tennis'] as SportCategory[]).map(sport => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-3 py-1 rounded-xl transition-all ${
                selectedSport === sport
                  ? 'bg-electric-500 text-dark-950 font-bold'
                  : 'bg-dark-950 text-slate-300 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Tempo:</span>
          {['All', 'Casual / Fun', 'Intermediate', 'Competitive'].map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                selectedSkill === skill
                  ? 'bg-neon-500/20 text-neon-300 border border-neon-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Invitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => {
          const isFilled = game.playersNeeded <= 0;
          return (
            <div
              key={game.id}
              className="p-5 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-electric-500/10 text-electric-300 border border-electric-500/20">
                      {game.sport}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {game.skillLevel}
                    </span>
                  </div>

                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                    !isFilled 
                      ? 'bg-neon-500/10 text-neon-400 border-neon-500/30' 
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {isFilled ? 'Roster Full' : `${game.playersNeeded} needed`}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-white font-['Space_Grotesk']">
                  {game.title}
                </h3>

                {/* Court & Time */}
                <div className="space-y-1.5 text-xs text-slate-400 font-mono p-3 rounded-xl bg-dark-950 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-electric-400 shrink-0" />
                    <span className="truncate">{game.courtName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neon-400 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-neon-400 shrink-0" />
                    <span>{game.date} • {game.time}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {game.description}
                </p>

                {/* Current Roster */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Confirmed Players:</span>
                    <span className="text-white font-mono font-bold">{game.currentPlayers} joined</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {game.joinedUsers.map((player, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {player}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-500">
                  Host: <span className="text-slate-300 font-medium">{game.hostName}</span> ({game.hostBadge})
                </div>

                <button
                  disabled={isFilled}
                  onClick={() => setJoinModalGame(game)}
                  className={`py-1.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-['Space_Grotesk'] ${
                    isFilled
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 hover:brightness-110 shadow-glow-blue'
                  }`}
                >
                  {isFilled ? 'Full' : 'Join Game'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Game Invitation Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-dark-900 border border-slate-700 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Post a Game Invitation
              </h2>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Invite Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need 2 more for basketball at BH-4 court 7 PM"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Sport</label>
                  <select
                    value={newSport}
                    onChange={(e) => setNewSport(e.target.value as SportCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
                  >
                    {['Basketball', 'Badminton', 'Football', 'Volleyball', 'Table Tennis', 'Tennis'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Additional Players Needed</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newPlayersNeeded}
                    onChange={(e) => setNewPlayersNeeded(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Court / Venue</label>
                <select
                  value={newCourtId}
                  onChange={(e) => setNewCourtId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
                >
                  {courts.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Date</label>
                  <select
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Weekend">This Weekend</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 07:30 PM"
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Your First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yash"
                    value={newHostName}
                    onChange={(e) => setNewHostName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Skill Level</label>
                  <select
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
                  >
                    <option value="Casual / Fun">Casual / Fun</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Competitive">Competitive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Notes / Rules</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bring extra water, we have the match ball ready!"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all font-['Space_Grotesk']"
              >
                Publish Invitation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Join Game Modal */}
      {joinModalGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-dark-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-base font-['Space_Grotesk']">
                Join {joinModalGame.sport} Game
              </h3>
              <button onClick={() => setJoinModalGame(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-1 font-mono p-3 rounded-xl bg-dark-950 border border-slate-800">
              <div className="text-white font-bold">{joinModalGame.title}</div>
              <div className="text-slate-400">{joinModalGame.courtName}</div>
              <div className="text-neon-400 font-semibold">{joinModalGame.date} • {joinModalGame.time}</div>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Your Name / Nickname *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth M."
                  value={joinPlayerName}
                  onChange={(e) => setJoinPlayerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
                />
                <p className="text-[10px] text-slate-500">
                  Visible to other players on the game roster. No contact details required.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glow-blue transition-all font-['Space_Grotesk']"
              >
                Confirm Spot on Roster
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
