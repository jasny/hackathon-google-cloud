import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Vision } from './pages/Vision';
import { JoinUs } from './pages/JoinUs';
import { AgentDiscovery } from './components/AgentDiscovery';

type Page = 'home' | 'vision' | 'join-us';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onNavigateToVision={() => setCurrentPage('vision')} 
            onNavigateToJoinUs={() => setCurrentPage('join-us')} 
          />
        );
      case 'vision':
        return <Vision />;
      case 'join-us':
        return <JoinUs />;
      default:
        return (
          <Home 
            onNavigateToVision={() => setCurrentPage('vision')} 
            onNavigateToJoinUs={() => setCurrentPage('join-us')} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col font-inter">
      <Header currentPage={currentPage === 'join-us' ? 'home' : currentPage} onPageChange={setCurrentPage} />
      
      <div className="flex-1">
        {renderPage()}
      </div>

      <Footer />
      <AgentDiscovery />
    </div>
  );
}

export default App;
