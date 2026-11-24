export type SportCategory = 
  | 'All'
  | 'Basketball'
  | 'Badminton'
  | 'Football'
  | 'Cricket'
  | 'Volleyball'
  | 'Tennis'
  | 'Table Tennis'
  | 'Athletics'
  | 'Squash';

export type CourtStatus = 'available' | 'occupied' | 'maintenance' | 'closed';

export type LightingType = 'LED Floodlit' | 'Partially Lit' | 'Unlit' | 'Smart Sensor Enabled';

export interface Court {
  id: string;
  name: string;
  sport: SportCategory;
  locationName: string;
  landmark: string;
  indoorOutdoor: 'indoor' | 'outdoor';
  coordinates: [number, number]; // [lat, lng]
  isVerified: boolean; // Verified LPU facility vs Demo Data
  statusNote?: string;
  photos: string[];
  timings: {
    open: string;
    close: string;
    nightLitUntil: string;
  };
  status: CourtStatus;
  lighting: {
    type: LightingType;
    status: 'Active' | 'Scheduled' | 'Maintenance' | 'Off';
    luxLevel: number;
    motionSensorEquipped: boolean;
    energySavedPercent: number;
  };
  amenities: string[];
  rules: string[];
  capacity: number;
  walkingMinutesFromUniMall: number;
}

export interface TimeSlot {
  time: string;
  label: string;
  isEvening: boolean;
  isNight: boolean;
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  sport: string;
  date: string;
  timeSlot: string;
  participantsCount: number;
  bookerName: string;
  bookerDept?: string;
  studentIdMasked: string; // Protected student ID
  needsEquipment: boolean;
  notes?: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
  isSimulated: true;
}

export interface GameInvitation {
  id: string;
  title: string;
  sport: SportCategory;
  courtId: string;
  courtName: string;
  date: string;
  time: string;
  playersNeeded: number;
  currentPlayers: number;
  skillLevel: 'Casual / Fun' | 'Intermediate' | 'Competitive';
  hostName: string;
  hostBadge: string;
  description: string;
  joinedUsers: string[];
  status: 'Open' | 'Filled' | 'Completed';
  createdAt: string;
}

export interface MaintenanceReport {
  id: string;
  courtId: string;
  courtName: string;
  category: 'Lighting' | 'Court Surface' | 'Net / Ring / Post' | 'Cleanliness & Waste' | 'Safety & Security' | 'Drinking Water';
  severity: 'Low' | 'Medium' | 'High' | 'Critical / Safety Hazard';
  description: string;
  reportedBy: string;
  reportedAt: string;
  status: 'Submitted' | 'Under Review' | 'Maintenance Dispatched' | 'Resolved';
  resolutionNotes?: string;
  photoUrl?: string;
}

export interface WeatherInfo {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  rainChance: number;
  sunsetTime: string;
  playabilityIndex: number; // 0-100
  playabilityAdvice: string;
  isLive: boolean;
  hourly: Array<{
    time: string;
    temp: number;
    rainProb: number;
    icon: string;
  }>;
}

export interface SurveyRecord {
  timestamp: string;
  ageGroup: string;
  occupation: string;
  frequency: string;
  hasAccess: string;
  preferredTime: string;
  avoidedDueToEveningClosure: string;
  adequateIllumination: string;
  majorProblems: string[];
  feelSafeAfterSunset: string;
  lightingEncouragesPlay: string;
  suggestedImprovements: string;
  wouldUseNightCourt: string;
  desiredAmenities: string[];
  idealClosingTime: string;
  recommendProject: string;
  additionalComments: string;
}
