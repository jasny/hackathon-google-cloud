import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#001e5a] text-white py-16">
      <div className="container mx-auto px-8 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="text-2xl font-black tracking-tighter uppercase">De Staatsman</div>
            <p className="text-white/60 text-sm leading-relaxed">
              Building a strong, transparent, and innovative future for our municipality together.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Party</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Our Vision</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Candidates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">History</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Action</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Donate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Join Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>info@destaatsman.nl</li>
              <li>Den Haag, Netherlands</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-xs">
          © 2026 De Staatsman. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
