# Courts After Dark 🌙🏀
> **"Your Campus. Your Court. Your Game."**  
> *A Smart Sports & Court Discovery Platform for Lovely Professional University (LPU), Punjab, India.*

---

## 📌 Project Overview
**Courts After Dark** is a sports technology and campus navigation web platform built to solve evening and nighttime sports facility accessibility issues faced by students at **Lovely Professional University (LPU)**.

Developed as part of a **Design Thinking project**, this platform is directly grounded in empirical student research gathered from 32+ LPU students through the Google Forms survey *"Courts After Dark – Sports Accessibility and Nighttime Court Usage Survey"*.

---

## 🌟 Key Features

1. **Interactive LPU Campus Court Discovery & Map**
   - Built on Leaflet OpenStreetMap centered at LPU coordinates (`31.2548° N, 75.7032° E`).
   - Custom glowing neon markers with live status indicators.
   - Walking distance and pedestrian duration calculations from major campus hubs (Uni-Mall, Main Gate, BH-1, BH-4, GH Enclave, Block 34, Central Library).
   - 1-click external navigation into Google Maps pedestrian directions.

2. **Smart Court Availability & Timetable Matrix**
   - Live availability grid covering Morning, Afternoon, Evening (5–8 PM), and Night (8–11 PM) slots.
   - Distinguishes Available, Reserved (Demo Simulation), and Maintenance status.

3. **Court Booking Engine**
   - Interactive slot reservation with participant count, equipment checkout requests, and student identification masking.
   - Built-in conflict detection to prevent overlapping bookings.
   - Instant digital match pass generation with scannable QR badge.

4. **"Find Your Game" – Student Community Matchmaking**
   - Campus pick-up game board (e.g. *"Need 2 more for basketball at BH-4 court at 7:30 PM"*).
   - 1-click roster join functionality with tempo/skill level filters (*Casual*, *Intermediate*, *Competitive*).
   - Strict student privacy protection: No registration numbers or mobile numbers are exposed publicly.

5. **Live Campus Weather & Playability Engine**
   - Real-time weather data via Open-Meteo API for Phagwara/LPU (`31.2536° N, 75.7037° E`).
   - Playability Index (0–100) factoring in temperature, humidity, wind drift, and rain probability.
   - Sunset countdown widget tracking automatic floodlight switch-on times.

6. **Nighttime Safety & Smart Lighting Hub**
   - Verified lighting audits with lux levels, fixture types, and verified curfew operating hours.
   - Verified LPU emergency hotlines:
     - **LPU Security Control (24x7):** `01824-517000 (Ext. 1000)`
     - **LPU Uni-Hospital 24x7 Ambulance:** `01824-517200 (Ext. 200)`
     - **Campus Women Safety Desk:** `01824-517100 (Ext. 1100)`
   - Conceptual Smart IoT Lighting Dashboard with simulated dimmer sliders and motion-triggered boost simulation.

7. **Maintenance & Safety Issue Reporting**
   - Direct reporting interface for floodlight failures, cracked surfaces, damaged nets, and safety concerns.
   - Real-time issue tracking board displaying ticket progress (`Submitted` → `Under Review` → `Dispatched` → `Resolved`).

8. **Student Research & Survey Analytics**
   - Full dataset of 32 real student responses integrated into the application.
   - Interactive Recharts data visualizations:
     - **68.8%** avoided sports due to evening court closures.
     - **53%** identified poor lighting as their primary nighttime obstacle.
     - **74.2%** confirmed better lighting would encourage them to play.
     - **93.8%** expressed intent to use Courts After Dark.
   - Dynamic CSV uploader allowing new survey sheets to be uploaded and re-analyzed on the fly.

9. **Administrator Portal**
   - Access-controlled console (Access Key: `lpu2026`).
   - Facility status manager, floodlight toggles, booking approvals, and maintenance dispatching.

---

## 🛠️ Technology Stack
- **Frontend Framework:** React 18 + TypeScript + Vite
- **Styling & Design:** Tailwind CSS + Glassmorphism UI + Custom Neon Aesthetics
- **Icons:** Lucide React
- **Mapping:** Leaflet & CartoDB Dark Matter
- **Charts & Data Viz:** Recharts
- **Weather API:** Open-Meteo API
- **Celebrations:** Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/kotarohith08-byte/courts-after-dark.git

# Navigate into project directory
cd courts-after-dark

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 👥 Institution & Credits
- **Project:** Courts After Dark
- **Institution:** Lovely Professional University (LPU), Phagwara, Punjab, India
- **Coursework:** Design Thinking & Innovation
