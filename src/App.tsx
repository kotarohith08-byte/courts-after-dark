import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourtFinder } from './components/CourtFinder';
import { InteractiveMap } from './components/InteractiveMap';
import { AvailabilityDashboard } from './components/AvailabilityDashboard';
import { BookingsView } from './components/BookingsView';
import { FindPlayers } from './components/FindPlayers';
import { WeatherSection } from './components/WeatherSection';
import { NightSafetyLighting } from './components/NightSafetyLighting';
import { IssueReporter } from './components/IssueReporter';
import { SurveyInsights } from './components/SurveyInsights';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutProject } from './components/AboutProject';
import { BookingModal } from './components/BookingModal';
import { CourtDetailsModal } from './components/CourtDetailsModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {activeTab === 'home' && <Hero />}
      {activeTab === 'courts' && <CourtFinder />}
      {activeTab === 'map' && <InteractiveMap />}
      {activeTab === 'availability' && <AvailabilityDashboard />}
      {(activeTab === 'insights' || activeTab === 'survey') && <SurveyInsights />}
      {(activeTab === 'feedback' || activeTab === 'report') && <IssueReporter />}
      {activeTab === 'bookings' && <BookingsView />}
      {activeTab === 'players' && <FindPlayers />}
      {activeTab === 'weather' && <WeatherSection />}
      {activeTab === 'safety' && <NightSafetyLighting />}
      {activeTab === 'about' && <AboutProject />}
      {activeTab === 'admin' && <AdminDashboard />}

      {/* Global Modals */}
      <CourtDetailsModal />
      <BookingModal />
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-neon-400 selection:text-dark-950">
        <Navbar />
        <div className="flex-1">
          <MainContent />
        </div>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
