import React, { useState, useEffect } from 'react';

interface HomeProps {
  onNavigateToVision: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigateToVision }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Election date: March 18, 2026
    const targetDate = new Date('2026-03-18T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // If timer < 0 show 0
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[800px] flex items-center overflow-hidden bg-[#001e5a]">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay" 
            alt="Modern architecture" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJNcbumGTNt9qaG-EG1Y5mSc4Ku1TuTjsFZYQaGbTY491YpzuwC8xrbYK-zSNV2SnWSOrOimo36y0z2mzILhU8S4SrAMUf0aijlajDommuVHFw28pOg9L7Np6dlYedCRc-_45FytotAfQmCvdHrL-iV28tiNcQc_2hx6swhb2gKxUT58g2-tYW4vszTRaLhuMmUHsYp66xxiYoIEEDiHn4cEDQEb4p1BAhPIOL58qbtd3kzhEca6fkfVPoeKahuTGev5mUAYENCIQ"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#001e5a] via-[#001e5a]/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1 rounded-full bg-[#ffdbd0] text-[#3a0b00] text-xs font-bold tracking-widest uppercase">Municipal Elections 2024</span>
            <h1 className="text-white text-6xl md:text-7xl font-black tracking-tight leading-tight">
              Building a Strong <span className="text-[#ffdbd0]">Municipality</span> Together
            </h1>
            <p className="text-white/80 text-xl max-w-lg leading-relaxed">
              We stand for transparency, innovation, and a human approach in our local politics. Discover our plans for the future.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-[#ffdbd0] text-[#3a0b00] px-8 py-4 rounded-lg font-extrabold text-lg hover:scale-105 transition-transform">Join Us</button>
              <button 
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-extrabold text-lg hover:bg-white/20 transition-all"
                onClick={onNavigateToVision}
              >
                Our Vision
              </button>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-2">The clock is ticking</h2>
              <p className="text-white/60">Until March 18 — Your vote counts</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {timeLeft.days > 0 ? (
                <>
                  <div className="bg-white/5 p-6 rounded-xl text-center">
                    <span className="block text-4xl font-black text-[#ffdbd0]">{timeLeft.days}</span>
                    <span className="text-xs text-white/60 uppercase tracking-widest">Days</span>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl text-center">
                    <span className="block text-4xl font-black text-[#ffdbd0]">{timeLeft.hours}</span>
                    <span className="text-xs text-white/60 uppercase tracking-widest">Hours</span>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl text-center">
                    <span className="block text-4xl font-black text-[#ffdbd0]">{timeLeft.minutes}</span>
                    <span className="text-xs text-white/60 uppercase tracking-widest">Minutes</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white/5 p-6 rounded-xl text-center">
                    <span className="block text-4xl font-black text-[#ffdbd0]">{timeLeft.hours}</span>
                    <span className="text-xs text-white/60 uppercase tracking-widest">Hours</span>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl text-center">
                    <span className="block text-4xl font-black text-[#ffdbd0]">{timeLeft.minutes}</span>
                    <span className="text-xs text-white/60 uppercase tracking-widest">Minutes</span>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl text-center">
                    <span className="block text-4xl font-black text-[#ffdbd0]">{timeLeft.seconds}</span>
                    <span className="text-xs text-white/60 uppercase tracking-widest">Seconds</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-[#f8f9fb]">
        <div className="container mx-auto px-8 max-w-screen-2xl">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-[#001e5a] tracking-tight mb-4">Local News</h2>
              <p className="text-[#444652] text-lg">Stay informed about the latest developments and our initiatives in the neighborhood.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-6 bg-[#f2f4f6]">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="Community center" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACDR0pssSXoukDN-4R2yRzks58phqhnnAeiWEXZe76IonlfkBn7m5PhDjJNLIU4qlGLj6THILwAaAHHFvMVLl-SCeqvNbb74eE0HWVR7EgkTyW-cpnaKsmM_dNgGrgINaWwfS4BuchKBkb5gLif3qGHx8_6XFp-nZz5Hk9_DBIQ1zAW1i0dJGhLnToA-7_HADzNeLw10AZyS9DV8p23juF154OvV1S9Jc9y-Hgg6ykqf8FLSvbKowvjphE6k-W1TDl9apPpU_zD74"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#001e5a] mb-3">New plan for affordable housing</h3>
              <p className="text-[#444652] leading-relaxed">Our team yesterday submitted the proposal for the redevelopment of the old station area into 200 sustainable starter homes.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-6 bg-[#f2f4f6]">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="People talking" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbWgby-Ye9JzfTEc229cG3A4-StAp_JzkZP92Ru86cFd2dt8zN1T-sqO9cHObdXa9U46do5uF70sWTYdYCkfQQLxn5tIDIYyYNhu0tJ9YzvSQqZuinnWTHAIJzXapPRs5pV0dzDylN4r5xbo-WoshxH_hVVs_1RO2hw7whmmDH97c-mofdZ0huFpGB_lAwVj_dhyf4314DkeQYCJiR5v9lSfWJmtpVN1eRTHz1OZxve5BpZUt86HAcMP1_lcQ-yIUKJyjPet07Pfk"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#001e5a] mb-3">Neighborhood BBQ</h3>
              <p className="text-[#444652] leading-relaxed">Come and meet our candidates this Saturday while enjoying a snack and a drink.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
