import React from 'react';

export const Vision = () => {
  return (
    <main className="bg-[#f8f9fb]">
      {/* Vision Hero */}
      <section className="py-24 bg-[#001e5a] text-white">
        <div className="container mx-auto px-8 max-w-screen-2xl">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-black tracking-tight mb-8">Our Vision for the Future</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              We believe in a municipality where every citizen is heard, innovation is the standard, and transparency is the foundation of our governance.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24">
        <div className="container mx-auto px-8 max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e3e5]">
              <div className="w-12 h-12 bg-[#ffdbd0] rounded-lg mb-6 flex items-center justify-center">
                <span className="text-[#3a0b00] font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#001e5a] mb-4">Transparency</h3>
              <p className="text-[#444652] leading-relaxed">
                Open communication about every decision and budget, so you know exactly where your tax money goes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e3e5]">
              <div className="w-12 h-12 bg-[#ffdbd0] rounded-lg mb-6 flex items-center justify-center">
                <span className="text-[#3a0b00] font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#001e5a] mb-4">Innovation</h3>
              <p className="text-[#444652] leading-relaxed">
                Using modern technology to improve services and make our municipality more sustainable.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e3e5]">
              <div className="w-12 h-12 bg-[#ffdbd0] rounded-lg mb-6 flex items-center justify-center">
                <span className="text-[#3a0b00] font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#001e5a] mb-4">Human Centric</h3>
              <p className="text-[#444652] leading-relaxed">
                Politics is about people. We prioritize well-being, healthcare, and affordable housing for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Vision Content */}
      <section className="py-24 bg-white border-y border-[#e0e3e5]">
        <div className="container mx-auto px-8 max-w-screen-2xl">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-black text-[#001e5a] mb-8 leading-tight">
                A sustainable and green municipality
              </h2>
              <div className="space-y-6 text-[#444652] text-lg leading-relaxed">
                <p>
                  We are committed to a municipality that is prepared for the challenges of climate change. This means more green spaces in our neighborhoods, supporting local energy initiatives, and investing in sustainable public transport.
                </p>
                <p>
                  Our goal is to be carbon neutral by 2035, while ensuring that the transition remains affordable for every household.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                className="w-full h-full object-cover" 
                alt="Green city park" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACDR0pssSXoukDN-4R2yRzks58phqhnnAeiWEXZe76IonlfkBn7m5PhDjJNLIU4qlGLj6THILwAaAHHFvMVLl-SCeqvNbb74eE0HWVR7EgkTyW-cpnaKsmM_dNgGrgINaWwfS4BuchKBkb5gLif3qGHx8_6XFp-nZz5Hk9_DBIQ1zAW1i0dJGhLnToA-7_HADzNeLw10AZyS9DV8p23juF154OvV1S9Jc9y-Hgg6ykqf8FLSvbKowvjphE6k-W1TDl9apPpU_zD74"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
