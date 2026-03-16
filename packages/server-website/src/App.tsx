import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Vision } from './pages/Vision';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'vision'>('home');

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col font-inter">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="flex-1">
        {currentPage === 'home' ? (
          <Home onNavigateToVision={() => setCurrentPage('vision')} />
        ) : (
          <Vision />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
