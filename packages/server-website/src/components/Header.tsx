import React from 'react';

interface HeaderProps {
  currentPage: 'home' | 'vision';
  onPageChange: (page: 'home' | 'vision') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  return (
    <header className="bg-[#001e5a] sticky top-0 z-50 shadow-[0px_4px_20px_rgba(25,28,30,0.04)]">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <div 
          className="text-2xl font-black text-white tracking-tighter cursor-pointer"
          onClick={() => onPageChange('home')}
        >
          De Staatsman
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button 
            className={`text-white pb-1 font-bold uppercase tracking-wider transition-all ${
              currentPage === 'home' ? 'border-b-2 border-[#ffdbd0]' : 'text-white/80 hover:text-white'
            }`}
            onClick={() => onPageChange('home')}
          >
            Home
          </button>
          <button 
            className={`text-white pb-1 font-bold uppercase tracking-wider transition-all ${
              currentPage === 'vision' ? 'border-b-2 border-[#ffdbd0]' : 'text-white/80 hover:text-white'
            }`}
            onClick={() => onPageChange('vision')}
          >
            Our Vision
          </button>
          <a className="text-white/80 font-medium hover:text-white transition-colors uppercase tracking-wider" href="#">Candidates</a>
          <a className="text-white/80 font-medium hover:text-white transition-colors uppercase tracking-wider" href="#">Events</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="bg-[#003188] text-white px-6 py-2 rounded-lg font-bold hover:scale-[1.02] transition-all active:scale-95 duration-150">
            Donate
          </button>
          <button className="bg-[#ffdbd0] text-[#3a0b00] px-6 py-2 rounded-lg font-bold hover:scale-[1.02] transition-all active:scale-95 duration-150">
            Join Us
          </button>
        </div>
      </div>
    </header>
  );
};
