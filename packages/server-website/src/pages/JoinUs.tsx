import React, { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

type Step = 'details' | 'payment';

const IdealLogo = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 fill-primary">
    <path d="M.975 2.61v18.782h11.411c6.89 0 10.64-3.21 10.64-9.415 0-6.377-4.064-9.367-10.64-9.367H.975zm11.411-.975C22.491 1.635 24 8.115 24 11.977c0 6.7-4.124 10.39-11.614 10.39H0V1.635h12.386zm-9.88 11.722h3.653v6.503H2.506zm4.096-3.275a2.27 2.27 0 1 1-4.54 0 2.27 2.27 0 0 1 4.54 0m1.396-1.057v2.12h.65c.45 0 .867-.13.867-1.077 0-.924-.463-1.043-.867-1.043h-.65zm10.85-1.054h1.053v3.174h1.56c-.428-5.758-4.958-7.002-9.074-7.002H7.999v3.83h.65c1.183 0 1.92.803 1.92 2.095 0 1.333-.719 2.129-1.92 2.129h-.65v7.665h4.388c6.692 0 9.021-3.107 9.103-7.665h-2.64V7.97zm-2.93 2.358h.76l-.348-1.195h-.063l-.35 1.195zm-1.643 1.87 1.274-4.228h1.497l1.274 4.227h-1.095l-.239-.818H15.61l-.24.818h-1.095zm-.505-1.054v1.052h-2.603V7.973h2.519v1.052h-1.467v.49h1.387v1.05H12.22v.58h1.55z"/>
  </svg>
);

export const JoinUs = () => {
  const [step, setStep] = useState<Step>('details');
  const [submitted, setSubmitted] = useState(false);
  const [additionalDonation, setAdditionalDonation] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'ideal' | 'credit-card'>('ideal');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="py-24 bg-surface min-h-[600px] flex items-center">
        <div className="container mx-auto px-8 max-w-2xl text-center">
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-outline-variant">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="text-primary h-12 w-12" />
            </div>
            <h1 className="text-4xl font-black text-primary mb-4">Welcome to the Movement!</h1>
            <p className="text-on-surface-variant text-lg mb-8">
              Thank you for joining De Staatsman and for your generous contribution. We've received your application and payment. Welcome aboard!
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-24 bg-surface min-h-screen">
      <div className="container mx-auto px-8 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-primary mb-4">Join De Staatsman</h1>
          <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
            <span className={step === 'details' ? 'text-primary' : 'text-on-surface-variant'}>1. Details</span>
            <span className="text-outline-variant">→</span>
            <span className={step === 'payment' ? 'text-primary' : 'text-on-surface-variant'}>2. Contribution</span>
          </div>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleContinue} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-outline-variant space-y-10">
            {/* Section: NAW (Personal Details) */}
            <section>
              <h2 className="text-sm font-black text-tertiary uppercase tracking-widest mb-6">Personal Details (Optional for Demo)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Date of Birth</label>
                  <input type="date" className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Gender</label>
                  <select className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all">
                    <option>Prefer not to say</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section: Address */}
            <section>
              <h2 className="text-sm font-black text-tertiary uppercase tracking-widest mb-6">Address (Optional for Demo)</h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Street Name</label>
                  <input type="text" placeholder="Buitenhof" className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="md:col-span-4 space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Number</label>
                  <input type="text" placeholder="10" className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="md:col-span-5 space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Postal Code</label>
                  <input type="text" placeholder="2513 AA" className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="md:col-span-7 space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">City</label>
                  <input type="text" placeholder="The Hague" className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all" />
                </div>
              </div>
            </section>

            <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl hover:scale-[1.01] transition-all active:scale-[0.99] shadow-lg shadow-primary/20">
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleFinalSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-outline-variant space-y-10">
            <section className="space-y-8">
              <h2 className="text-sm font-black text-tertiary uppercase tracking-widest mb-6">Membership Contribution</h2>
              
              <div className="bg-surface-container-low p-6 rounded-2xl flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-primary">Annual Membership Fee</h3>
                  <p className="text-sm text-on-surface-variant">Standard contribution for De Staatsman</p>
                </div>
                <span className="text-2xl font-black text-primary">€25.00</span>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Additional Donation (Optional)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">€</span>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="0.00"
                    value={additionalDonation || ''}
                    onChange={(e) => setAdditionalDonation(Number(e.target.value))}
                    className="w-full bg-surface-container-low border-none rounded-xl p-4 pl-8 focus:ring-2 focus:ring-primary transition-all font-bold text-xl text-primary" 
                  />
                </div>
                <div className="flex gap-2">
                  {[5, 10, 25, 50].map((amount) => (
                    <button 
                      key={amount}
                      type="button"
                      onClick={() => setAdditionalDonation(amount)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                        additionalDonation === amount 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-white text-primary border-outline-variant hover:border-primary'
                      }`}
                    >
                      + €{amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant flex justify-between items-center">
                <span className="font-bold text-on-surface-variant">Total Payment</span>
                <span className="text-3xl font-black text-primary">€{(25 + additionalDonation).toFixed(2)}</span>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-black text-tertiary uppercase tracking-widest mb-6">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('ideal')}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                    paymentMethod === 'ideal' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-outline-variant hover:border-primary/50'
                  }`}
                >
                  <IdealLogo />
                  <span className="font-black text-sm uppercase">iDEAL</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('credit-card')}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                    paymentMethod === 'credit-card' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-outline-variant hover:border-primary/50'
                  }`}
                >
                  <CreditCard className={`h-8 w-8 ${paymentMethod === 'credit-card' ? 'text-primary' : 'text-on-surface-variant'}`} />
                  <span className="font-black text-sm uppercase">Credit Card</span>
                </button>
              </div>
            </section>

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setStep('details')}
                className="flex-1 bg-surface-container-low text-on-surface-variant py-5 rounded-2xl font-black text-lg hover:bg-surface-container-highest transition-all"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="flex-[2] bg-primary text-white py-5 rounded-2xl font-black text-xl hover:scale-[1.01] transition-all active:scale-[0.99] shadow-lg shadow-primary/20"
              >
                Complete & Pay
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};
