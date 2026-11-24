import { Court } from '../types';

export const LPU_COURTS_DATA: Court[] = [
  {
    id: 'lpu-shanti-badminton',
    name: 'Shanti Devi Mittal Indoor Sports Stadium – Badminton Arena',
    sport: 'Badminton',
    locationName: 'Shanti Devi Mittal Indoor Stadium, Block 13 Hub',
    landmark: 'Directly opposite Uni-Mall & Central Academic Lawn',
    indoorOutdoor: 'indoor',
    coordinates: [31.2548, 75.7032],
    isVerified: true,
    statusNote: 'Verified LPU Campus Facility',
    photos: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '06:00 AM',
      close: '10:00 PM',
      nightLitUntil: '10:00 PM'
    },
    status: 'available',
    lighting: {
      type: 'LED Floodlit',
      status: 'Active',
      luxLevel: 650,
      motionSensorEquipped: true,
      energySavedPercent: 32
    },
    amenities: [
      'Olympic-grade Synthetic Wooden Flooring (6 Courts)',
      'High-Output Anti-Glare LED Fixtures',
      'Chilled RO Drinking Water Stations',
      'Locker Rooms & Restrooms',
      'First Aid & Ice Stations',
      'Spectator Tier Seating'
    ],
    rules: [
      'Non-marking badminton shoes strictly mandatory',
      'Valid LPU Student ID card required for entry verification',
      'Maximum 45-minute continuous slot per doubles session during peak hours (5-9 PM)',
      'Personal shuttles required; rackets available for demo checkout at equipment desk'
    ],
    capacity: 24,
    walkingMinutesFromUniMall: 2
  },
  {
    id: 'lpu-bh4-basketball',
    name: 'BH-4 & BH-5 Residential Basketball Hardcourts',
    sport: 'Basketball',
    locationName: 'Boys Hostel Residential Zone North',
    landmark: 'Between BH-4 & BH-5 Courtyard, near Tuck Shop 4',
    indoorOutdoor: 'outdoor',
    coordinates: [31.2580, 75.7060],
    isVerified: true,
    statusNote: 'Verified LPU Campus Facility',
    photos: [
      'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544919982-b61976f0ba43?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '06:00 AM',
      close: '10:30 PM',
      nightLitUntil: '10:30 PM'
    },
    status: 'occupied',
    lighting: {
      type: 'LED Floodlit',
      status: 'Active',
      luxLevel: 420,
      motionSensorEquipped: true,
      energySavedPercent: 28
    },
    amenities: [
      'Dual Regulation Acrylic Synthetic Hardcourts',
      'Spring-loaded Breakaway Rims',
      '4 High-Mast LED Lighting Towers',
      'Perimeter Chainlink Safety Fencing',
      'Cold Drinking Water Point',
      'Night Security Guard Checkpoint nearby'
    ],
    rules: [
      'Rubber-soled athletic sports shoes compulsory',
      'Respect nighttime hostel quiet hours after 10:30 PM',
      'Keep personal belongings inside court benches',
      'Report any hoop/net damage immediately through Courts After Dark'
    ],
    capacity: 20,
    walkingMinutesFromUniMall: 6
  },
  {
    id: 'lpu-athletics-stadium',
    name: 'LPU Main Athletics & Football Stadium',
    sport: 'Football',
    locationName: 'West Campus Sports Complex',
    landmark: 'Opposite Academic Blocks 38-40, near Gate 3',
    indoorOutdoor: 'outdoor',
    coordinates: [31.2520, 75.7015],
    isVerified: true,
    statusNote: 'Verified LPU Campus Facility',
    photos: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '05:30 AM',
      close: '09:30 PM',
      nightLitUntil: '09:30 PM'
    },
    status: 'available',
    lighting: {
      type: 'LED Floodlit',
      status: 'Active',
      luxLevel: 550,
      motionSensorEquipped: false,
      energySavedPercent: 18
    },
    amenities: [
      'Full-size Natural Grass Football Pitch',
      '8-lane IAAF Standard Synthetic Running Track',
      '4 Corner Floodlight Towers for Night Games',
      'Grandstand Covered Seating (10,000+ capacity)',
      'Sub-station Emergency Power Backup',
      'Medical First Aid Room'
    ],
    rules: [
      'Football studs permitted strictly on grass, never on synthetic running track',
      'Joggers and sprinters have right-of-way on track lanes 1-4',
      'Prior slot booking required for full-pitch scrimmage matches',
      'Spitting or littering strictly penalized by campus sports committee'
    ],
    capacity: 40,
    walkingMinutesFromUniMall: 7
  },
  {
    id: 'lpu-unicenter-volleyball',
    name: 'Uni-Center Floodlit Volleyball Arena',
    sport: 'Volleyball',
    locationName: 'Uni-Center Recreation Plaza',
    landmark: 'Adjacent to Student Center & Block 30 Food Court',
    indoorOutdoor: 'outdoor',
    coordinates: [31.2555, 75.7048],
    isVerified: true,
    statusNote: 'Verified LPU Campus Facility',
    photos: [
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '06:00 AM',
      close: '09:30 PM',
      nightLitUntil: '09:30 PM'
    },
    status: 'available',
    lighting: {
      type: 'LED Floodlit',
      status: 'Active',
      luxLevel: 380,
      motionSensorEquipped: true,
      energySavedPercent: 35
    },
    amenities: [
      '2 Regulation Volleyball Courts (Sand & Hard surface)',
      'High-tension Antennas & Official Nets',
      'Central Floodlight Mast with Daylight Spectrum LEDs',
      'Bench seating for waiting teams',
      'Nearby cafeteria and hydration points'
    ],
    rules: [
      'Standard volleyball rotations for open student pick-up games',
      'Do not hang or swing on volleyball net cables',
      'Turn off peripheral floodlights when departing after final night slot'
    ],
    capacity: 16,
    walkingMinutesFromUniMall: 3
  },
  {
    id: 'lpu-shanti-tt',
    name: 'Shanti Devi Mittal Indoor Stadium – Table Tennis Arena',
    sport: 'Table Tennis',
    locationName: 'Shanti Devi Mittal Indoor Stadium, 1st Floor',
    landmark: 'Above Main Gymnasium, Block 13 Hub',
    indoorOutdoor: 'indoor',
    coordinates: [31.2547, 75.7034],
    isVerified: true,
    statusNote: 'Verified LPU Campus Facility',
    photos: [
      'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '06:30 AM',
      close: '10:00 PM',
      nightLitUntil: '10:00 PM'
    },
    status: 'available',
    lighting: {
      type: 'LED Floodlit',
      status: 'Active',
      luxLevel: 600,
      motionSensorEquipped: true,
      energySavedPercent: 40
    },
    amenities: [
      '8 ITTF Approved Stag Tournament Tables',
      'Surrounding Enclosure Court Barriers',
      'Non-slip Taraflex Floor Matting',
      'Air-conditioned Environment',
      'Ball Dispenser & Practice Cages'
    ],
    rules: [
      'Strictly clean indoor sports footwear',
      'Maximum 30 minutes match time if students are waiting in queue',
      'Keep food and sugary drinks outside the TT hall'
    ],
    capacity: 16,
    walkingMinutesFromUniMall: 2
  },
  {
    id: 'lpu-tennis-complex',
    name: 'LPU Lawn Tennis Hardcourts Complex',
    sport: 'Tennis',
    locationName: 'Outdoor Sports Sector East',
    landmark: 'Behind Shanti Devi Mittal Gymnasium & Swimming Pool',
    indoorOutdoor: 'outdoor',
    coordinates: [31.2540, 75.7042],
    isVerified: true,
    statusNote: 'Verified LPU Campus Facility',
    photos: [
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '06:00 AM',
      close: '09:00 PM',
      nightLitUntil: '09:00 PM'
    },
    status: 'maintenance',
    lighting: {
      type: 'Partially Lit',
      status: 'Maintenance',
      luxLevel: 240,
      motionSensorEquipped: false,
      energySavedPercent: 10
    },
    amenities: [
      '3 US Open Blue Acrylic Hard Courts',
      'Heavy Duty Weatherproof Tennis Nets',
      'Umpire Raised High Chairs',
      'Perimeter Windscreen Mesh',
      'Equipment storage room'
    ],
    rules: [
      'Court 2 currently under resurfacing maintenance',
      'Only proper tennis footwear allowed to preserve acrylic coating',
      'Booking requests required for evening floodlit sessions'
    ],
    capacity: 12,
    walkingMinutesFromUniMall: 4
  },
  {
    id: 'lpu-cricket-ground',
    name: 'LPU Cricket Oval & Practice Turf Nets',
    sport: 'Cricket',
    locationName: 'North-West Grounds Complex',
    landmark: 'Near Gate 4, beyond Academic Block 55',
    indoorOutdoor: 'outdoor',
    coordinates: [31.2510, 75.6990],
    isVerified: true,
    statusNote: 'Verified LPU Campus Facility',
    photos: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '06:00 AM',
      close: '08:30 PM',
      nightLitUntil: '08:30 PM'
    },
    status: 'available',
    lighting: {
      type: 'Partially Lit',
      status: 'Active',
      luxLevel: 310,
      motionSensorEquipped: false,
      energySavedPercent: 12
    },
    amenities: [
      'Full-size Turf Cricket Match Pitch',
      '4 Practice Turf & Concrete Nets with Nylon Enclosures',
      'Pavilion Dugout & Scoreboard',
      'Floodlit Practice Net Corridor'
    ],
    rules: [
      'Hard leather ball play requires full safety gear (helmet, pads, guards)',
      'Tennis ball box cricket permitted only in designated practice bays 3 and 4',
      'Pre-booking required for full weekend college league games'
    ],
    capacity: 30,
    walkingMinutesFromUniMall: 9
  },
  {
    id: 'lpu-gh-badminton',
    name: 'GH-2 & GH-3 Enclave Badminton Courts',
    sport: 'Badminton',
    locationName: 'Girls Hostel Residential Quadrangle',
    landmark: 'Central Courtyard between GH-2 and GH-3 Residential Towers',
    indoorOutdoor: 'outdoor',
    coordinates: [31.2565, 75.7080],
    isVerified: true,
    statusNote: 'Verified LPU Campus Facility',
    photos: [
      'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '06:00 AM',
      close: '10:00 PM',
      nightLitUntil: '10:00 PM'
    },
    status: 'available',
    lighting: {
      type: 'LED Floodlit',
      status: 'Active',
      luxLevel: 450,
      motionSensorEquipped: true,
      energySavedPercent: 30
    },
    amenities: [
      '2 Anti-Skid Polyurethane Coated Courts',
      'Dedicated 24x7 Security Gate & Guard Desk',
      'High Brightness White LED Overhead Lights',
      'Filtered Cold Water Dispenser',
      'Adjacent Sitting Lounge & Lawn'
    ],
    rules: [
      'Strictly for female residents of LPU GH hostellers & escorted registered guests',
      'Court lights automatically switch to low-power eco-mode after 10:00 PM',
      'Keep racket equipment returned to GH recreation counter'
    ],
    capacity: 8,
    walkingMinutesFromUniMall: 8
  },
  {
    id: 'lpu-shanti-squash',
    name: 'Shanti Devi Mittal Squash Court Complex',
    sport: 'Squash',
    locationName: 'Indoor Sports Stadium Ground Level',
    landmark: 'South Wing, Shanti Devi Mittal Complex',
    indoorOutdoor: 'indoor',
    coordinates: [31.2546, 75.7030],
    isVerified: true,
    statusNote: 'Verified LPU Campus Facility',
    photos: [
      'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '06:30 AM',
      close: '09:30 PM',
      nightLitUntil: '09:30 PM'
    },
    status: 'available',
    lighting: {
      type: 'LED Floodlit',
      status: 'Active',
      luxLevel: 580,
      motionSensorEquipped: true,
      energySavedPercent: 35
    },
    amenities: [
      '2 Glass-backed International Standard Courts',
      'Sprung Hardwood Flooring',
      'Climate Controlled Air Conditioning',
      'Spectator Gallery Railing',
      'Shower & Changing Facilities'
    ],
    rules: [
      'Non-marking gum rubber sole shoes exclusively',
      'Protective eyewear strongly recommended for safety',
      'Prior reservation required on Courts After Dark platform'
    ],
    capacity: 4,
    walkingMinutesFromUniMall: 2
  },
  {
    id: 'demo-unipolis-multisport',
    name: 'Baldev Raj Mittal Unipolis Multi-Sport Arena',
    sport: 'Basketball',
    locationName: 'Unipolis Open Amphitheatre Plaza',
    landmark: 'Under Canopy Arch, Heart of LPU Campus',
    indoorOutdoor: 'outdoor',
    coordinates: [31.2560, 75.7025],
    isVerified: false,
    statusNote: 'Demo Data – Location Confirmation Required',
    photos: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '07:00 AM',
      close: '10:00 PM',
      nightLitUntil: '10:00 PM'
    },
    status: 'available',
    lighting: {
      type: 'Smart Sensor Enabled',
      status: 'Active',
      luxLevel: 400,
      motionSensorEquipped: true,
      energySavedPercent: 45
    },
    amenities: [
      'Demonstration Multi-Use Hardcourt (Basketball / Volleyball)',
      'Smart Sensor Automated LED Floodlights',
      'Giant Screen Display View',
      'Steps Seating Capacity for 2,000+ students'
    ],
    rules: [
      'Demo Data Entry: Awaiting official university sports registry sync',
      'Multi-sport priority shifts by scheduled day of week',
      'Prohibited during central university events and convocations'
    ],
    capacity: 20,
    walkingMinutesFromUniMall: 3
  },
  {
    id: 'demo-block34-futsal',
    name: 'Block 34 Night Futsal Mini-Turf',
    sport: 'Football',
    locationName: 'Academic Corridor near Block 34',
    landmark: 'Behind Computer Science & IT Block 34',
    indoorOutdoor: 'outdoor',
    coordinates: [31.2530, 75.7050],
    isVerified: false,
    statusNote: 'Demo Data – Location Confirmation Required',
    photos: [
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80'
    ],
    timings: {
      open: '06:00 AM',
      close: '11:00 PM',
      nightLitUntil: '11:00 PM'
    },
    status: 'occupied',
    lighting: {
      type: 'LED Floodlit',
      status: 'Active',
      luxLevel: 480,
      motionSensorEquipped: true,
      energySavedPercent: 30
    },
    amenities: [
      '5-a-side High Density Artificial Turf',
      'Rebound Perimeter Boards & Protective Netting',
      'Night Floodlighting with Low Glare Cutoff',
      'Drinking Water Dispenser'
    ],
    rules: [
      'Demo Data Entry: Community proposal in active review',
      'Turf shoes or flat sneakers only; strictly no metal studs',
      '5-on-5 rolling substitute format recommended'
    ],
    capacity: 14,
    walkingMinutesFromUniMall: 5
  }
];

export const LPU_CAMPUS_CENTER = {
  lat: 31.2548,
  lng: 75.7032,
  zoom: 16,
  name: 'LPU Main Campus, Phagwara, Punjab'
};

export const LPU_COMMON_ORIGINS = [
  { name: 'Uni-Mall (Central Hub)', lat: 31.2548, lng: 75.7032 },
  { name: 'LPU Main Gate (GT Road)', lat: 31.2515, lng: 75.7058 },
  { name: 'Boys Hostel BH-1 / BH-2', lat: 31.2505, lng: 75.7055 },
  { name: 'Boys Hostel BH-4 / BH-5', lat: 31.2580, lng: 75.7060 },
  { name: 'Girls Hostel GH Enclave', lat: 31.2565, lng: 75.7080 },
  { name: 'Academic Block 34 (CSE)', lat: 31.2530, lng: 75.7050 },
  { name: 'Central University Library', lat: 31.2550, lng: 75.7020 }
];
