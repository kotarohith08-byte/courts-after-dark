import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourtFinder } from './components/CourtFinder';
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
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {activeTab === 'home' && <Hero />}
      {activeTab === 'courts' && <CourtFinder />}
      {activeTab === 'availability' && <AvailabilityDashboard />}
      {activeTab === 'bookings' && <BookingsView />}
      {activeTab === 'players' && <FindPlayers />}
      {activeTab === 'weather' && <WeatherSection />}
      {activeTab === 'safety' && <NightSafetyLighting />}
      {activeTab === 'report' && <IssueReporter />}
      {activeTab === 'survey' && <SurveyInsights />}
      {activeTab === 'about' && <AboutProject />}
      {activeTab === 'admin' && <AdminDashboard />}

      {/* Global Booking Modal */}
      <BookingModal />
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
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
