import React, { createContext, useContext, useState, useEffect } from 'react';
import { Court, Booking, GameInvitation, MaintenanceReport, WeatherInfo, SurveyRecord, SportCategory } from '../types';
import { LPU_COURTS_DATA } from '../data/lpuCourts';
import { RAW_SURVEY_RECORDS } from '../data/surveyData';
import { fetchLpuWeather, getFallbackWeather } from '../services/weatherService';

interface AppContextType {
  courts: Court[];
  setCourts: React.Dispatch<React.SetStateAction<Court[]>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCourt: Court | null;
  setSelectedCourt: (court: Court | null) => void;
  bookingModalCourt: Court | null;
  setBookingModalCourt: (court: Court | null) => void;
  detailsModalCourt: Court | null;
  setDetailsModalCourt: (court: Court | null) => void;
  selectedSportFilter: SportCategory;
  setSelectedSportFilter: (sport: SportCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (courtId: string) => void;
  isFavorite: (courtId: string) => boolean;
  
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'isSimulated'>) => { success: boolean; message: string; booking?: Booking };
  cancelBooking: (id: string) => void;
  
  // Game Invitations
  gameInvitations: GameInvitation[];
  addGameInvitation: (invite: Omit<GameInvitation, 'id' | 'createdAt' | 'joinedUsers' | 'currentPlayers' | 'status'>) => void;
  joinGameInvitation: (inviteId: string, playerName: string) => boolean;
  
  // Maintenance Reports
  maintenanceReports: MaintenanceReport[];
  addMaintenanceReport: (report: Omit<MaintenanceReport, 'id' | 'reportedAt' | 'status'>) => void;
  updateReportStatus: (id: string, status: MaintenanceReport['status'], resolutionNotes?: string) => void;

  // Weather
  weather: WeatherInfo;
  refreshWeather: () => Promise<void>;

  // Survey
  surveyRecords: SurveyRecord[];
  setSurveyRecords: React.Dispatch<React.SetStateAction<SurveyRecord[]>>;

  // Admin
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  toggleCourtLighting: (courtId: string) => void;
  updateCourtStatus: (courtId: string, status: Court['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-LPU-881',
    courtId: 'lpu-shanti-badminton',
    courtName: 'Shanti Devi Mittal Indoor Sports Stadium – Badminton Arena',
    sport: 'Badminton',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '07:00 PM – 08:00 PM',
    participantsCount: 4,
    bookerName: 'Rohan Sharma',
    bookerDept: 'B.Tech CSE (3rd Year)',
    studentIdMasked: '1220****',
    needsEquipment: true,
    notes: 'Doubles recreational match with hostel wingmates',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    isSimulated: true
  },
  {
    id: 'BK-LPU-882',
    courtId: 'lpu-bh4-basketball',
    courtName: 'BH-4 & BH-5 Residential Basketball Hardcourts',
    sport: 'Basketball',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '08:00 PM – 09:00 PM',
    participantsCount: 10,
    bookerName: 'Amanpreet Singh',
    bookerDept: 'Mechanical Engg (Final Year)',
    studentIdMasked: '1210****',
    needsEquipment: false,
    notes: 'Hostel friendly full-court scrimmage',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    isSimulated: true
  }
];

const INITIAL_GAMES: GameInvitation[] = [
  {
    id: 'GAME-01',
    title: 'Need 2 more players for 5v5 Basketball Pickup',
    sport: 'Basketball',
    courtId: 'lpu-bh4-basketball',
    courtName: 'BH-4 & BH-5 Residential Basketball Hardcourts',
    date: 'Today',
    time: '07:30 PM',
    playersNeeded: 2,
    currentPlayers: 8,
    skillLevel: 'Intermediate',
    hostName: 'Kabir V.',
    hostBadge: 'Hosteller BH-4',
    description: 'Looking for 2 more players to balance two teams of five. Friendly competitive tempo, all welcome!',
    joinedUsers: ['Kabir V.', 'Nikhil P.', 'Dev S.', 'Arjun M.', 'Tanmay K.', 'Sahil D.', 'Karan R.', 'Gaurav B.'],
    status: 'Open',
    createdAt: '1 hour ago'
  },
  {
    id: 'GAME-02',
    title: 'Evening Badminton Doubles Scrimmage (Racquets Ready)',
    sport: 'Badminton',
    courtId: 'lpu-shanti-badminton',
    courtName: 'Shanti Devi Mittal Indoor Sports Stadium – Court 3',
    date: 'Today',
    time: '08:15 PM',
    playersNeeded: 1,
    currentPlayers: 3,
    skillLevel: 'Casual / Fun',
    hostName: 'Priya K.',
    hostBadge: 'Day Scholar / Uni-Mall Hub',
    description: 'We have 3 players looking for a 4th for doubles. We have feather shuttles, just bring your indoor shoes!',
    joinedUsers: ['Priya K.', 'Simran J.', 'Akash T.'],
    status: 'Open',
    createdAt: '25 mins ago'
  },
  {
    id: 'GAME-03',
    title: 'Casual Volleyball 6v6 Under Floodlights',
    sport: 'Volleyball',
    courtId: 'lpu-unicenter-volleyball',
    courtName: 'Uni-Center Floodlit Volleyball Arena',
    date: 'Tomorrow',
    time: '06:30 PM',
    playersNeeded: 4,
    currentPlayers: 8,
    skillLevel: 'Casual / Fun',
    hostName: 'Harshit G.',
    hostBadge: 'Uni-Center Club',
    description: 'Casual rally style after class. Come de-stress and play under the evening lights!',
    joinedUsers: ['Harshit G.', 'Tushar B.', 'Manish S.', 'Yash P.', 'Vikram N.', 'Mohit K.', 'Deepak R.', 'Suraj V.'],
    status: 'Open',
    createdAt: '3 hours ago'
  }
];

const INITIAL_REPORTS: MaintenanceReport[] = [
  {
    id: 'REP-101',
    courtId: 'lpu-bh4-basketball',
    courtName: 'BH-4 & BH-5 Residential Basketball Hardcourts',
    category: 'Lighting',
    severity: 'Medium',
    description: 'South-west floodlight pole flickering intermittently during evening hours (7 PM to 9 PM).',
    reportedBy: 'Student Resident BH-4',
    reportedAt: 'Yesterday, 8:40 PM',
    status: 'Maintenance Dispatched',
    resolutionNotes: 'Electrician team assigned for fixture inspection and ballast replacement.'
  },
  {
    id: 'REP-102',
    courtId: 'lpu-tennis-complex',
    courtName: 'LPU Lawn Tennis Hardcourts Complex',
    category: 'Court Surface',
    severity: 'Low',
    description: 'Minor hairline surface crack near Court 2 baseline line marking.',
    reportedBy: 'Tennis Club Member',
    reportedAt: '2 days ago',
    status: 'Under Review',
    resolutionNotes: 'Scheduled for acrylic patching during weekly campus maintenance cycle.'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courts, setCourts] = useState<Court[]>(() => {
    try {
      const saved = localStorage.getItem('cad_courts');
      if (!saved) return LPU_COURTS_DATA;
      const parsed: Court[] = JSON.parse(saved);
      return LPU_COURTS_DATA.map(fresh => {
        const existing = parsed.find(p => p.id === fresh.id);
        return existing 
          ? { ...fresh, status: existing.status, lighting: { ...fresh.lighting, status: existing.lighting.status } } 
          : fresh;
      });
    } catch {
      return LPU_COURTS_DATA;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [bookingModalCourt, setBookingModalCourt] = useState<Court | null>(null);
  const [detailsModalCourt, setDetailsModalCourt] = useState<Court | null>(null);
  const [selectedSportFilter, setSelectedSportFilter] = useState<SportCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cad_favorites');
      return saved ? JSON.parse(saved) : ['lpu-shanti-badminton', 'lpu-bh4-basketball'];
    } catch {
      return ['lpu-shanti-badminton', 'lpu-bh4-basketball'];
    }
  });

  const toggleFavorite = (courtId: string) => {
    setFavorites(prev => {
      const next = prev.includes(courtId)
        ? prev.filter(id => id !== courtId)
        : [...prev, courtId];
      try {
        localStorage.setItem('cad_favorites', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save favorites to localStorage', e);
      }
      return next;
    });
  };

  const isFavorite = (courtId: string) => favorites.includes(courtId);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('cad_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [gameInvitations, setGameInvitations] = useState<GameInvitation[]>(() => {
    const saved = localStorage.getItem('cad_games');
    return saved ? JSON.parse(saved) : INITIAL_GAMES;
  });

  const [maintenanceReports, setMaintenanceReports] = useState<MaintenanceReport[]>(() => {
    const saved = localStorage.getItem('cad_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [surveyRecords, setSurveyRecords] = useState<SurveyRecord[]>(RAW_SURVEY_RECORDS);
  const [weather, setWeather] = useState<WeatherInfo>(getFallbackWeather());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cad_courts', JSON.stringify(courts));
  }, [courts]);

  useEffect(() => {
    localStorage.setItem('cad_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('cad_games', JSON.stringify(gameInvitations));
  }, [gameInvitations]);

  useEffect(() => {
    localStorage.setItem('cad_reports', JSON.stringify(maintenanceReports));
  }, [maintenanceReports]);

  // Initial weather fetch
  useEffect(() => {
    refreshWeather();
  }, []);

  const refreshWeather = async () => {
    const res = await fetchLpuWeather();
    setWeather(res);
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'isSimulated'>) => {
    // Conflict detection: prevent exact overlapping confirmed booking for same court, date, slot
    const hasConflict = bookings.some(b => 
      b.courtId === bookingData.courtId &&
      b.date === bookingData.date &&
      b.timeSlot === bookingData.timeSlot &&
      b.status === 'confirmed'
    );

    if (hasConflict) {
      return {
        success: false,
        message: 'This time slot is already reserved by another student group. Please select an alternate slot.'
      };
    }

    const newBooking: Booking = {
      ...bookingData,
      id: `BK-LPU-${Math.floor(100 + Math.random() * 900)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      isSimulated: true
    };

    setBookings(prev => [newBooking, ...prev]);
    return {
      success: true,
      message: 'Booking request confirmed successfully! (Simulated Demonstration)',
      booking: newBooking
    };
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const addGameInvitation = (inviteData: Omit<GameInvitation, 'id' | 'createdAt' | 'joinedUsers' | 'currentPlayers' | 'status'>) => {
    const newGame: GameInvitation = {
      ...inviteData,
      id: `GAME-${Math.floor(10 + Math.random() * 90)}`,
      currentPlayers: 1,
      joinedUsers: [inviteData.hostName],
      status: 'Open',
      createdAt: 'Just now'
    };
    setGameInvitations(prev => [newGame, ...prev]);
  };

  const joinGameInvitation = (inviteId: string, playerName: string) => {
    let success = false;
    setGameInvitations(prev => prev.map(inv => {
      if (inv.id === inviteId && inv.playersNeeded > 0) {
        success = true;
        const newPlayers = [...inv.joinedUsers, playerName];
        const needed = inv.playersNeeded - 1;
        return {
          ...inv,
          currentPlayers: inv.currentPlayers + 1,
          playersNeeded: needed,
          joinedUsers: newPlayers,
          status: needed === 0 ? 'Filled' : 'Open'
        };
      }
      return inv;
    }));
    return success;
  };

  const addMaintenanceReport = (reportData: Omit<MaintenanceReport, 'id' | 'reportedAt' | 'status'>) => {
    const newReport: MaintenanceReport = {
      ...reportData,
      id: `REP-${Math.floor(100 + Math.random() * 900)}`,
      reportedAt: 'Just now',
      status: 'Submitted'
    };
    setMaintenanceReports(prev => [newReport, ...prev]);
  };

  const updateReportStatus = (id: string, status: MaintenanceReport['status'], resolutionNotes?: string) => {
    setMaintenanceReports(prev => prev.map(r => r.id === id ? {
      ...r,
      status,
      resolutionNotes: resolutionNotes || r.resolutionNotes
    } : r));
  };

  const toggleCourtLighting = (courtId: string) => {
    setCourts(prev => prev.map(c => {
      if (c.id === courtId) {
        const nextStatus = c.lighting.status === 'Active' ? 'Off' : 'Active';
        return {
          ...c,
          lighting: {
            ...c.lighting,
            status: nextStatus
          }
        };
      }
      return c;
    }));
  };

  const updateCourtStatus = (courtId: string, status: Court['status']) => {
    setCourts(prev => prev.map(c => c.id === courtId ? { ...c, status } : c));
  };

  return (
    <AppContext.Provider
      value={{
        courts,
        setCourts,
        activeTab,
        setActiveTab,
        selectedCourt,
        setSelectedCourt,
        bookingModalCourt,
        setBookingModalCourt,
        detailsModalCourt,
        setDetailsModalCourt,
        selectedSportFilter,
        setSelectedSportFilter,
        searchQuery,
        setSearchQuery,
        favorites,
        toggleFavorite,
        isFavorite,
        bookings,
        addBooking,
        cancelBooking,
        gameInvitations,
        addGameInvitation,
        joinGameInvitation,
        maintenanceReports,
        addMaintenanceReport,
        updateReportStatus,
        weather,
        refreshWeather,
        surveyRecords,
        setSurveyRecords,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        toggleCourtLighting,
        updateCourtStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
