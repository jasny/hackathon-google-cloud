import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const AgentDiscovery = () => {
  const [extensionDetected, setExtensionDetected] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if provider is already present
    // @ts-ignore
    if (window.agentconnect) {
      setExtensionDetected(true);
      setShowBanner(true);
    } else {
      // Otherwise, listen for discovery event
      const handleDiscovery = () => {
        setExtensionDetected(true);
        setShowBanner(true);
      };
      window.addEventListener('AGENT_CONNECT_READY', handleDiscovery);
      return () => window.removeEventListener('AGENT_CONNECT_READY', handleDiscovery);
    }
  }, []);

  const handleConnect = () => {
    // @ts-ignore
    if (window.agentconnect) {
      // @ts-ignore
      window.agentconnect.request('hello');
      setShowBanner(false);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="bg-white border-2 border-primary rounded-3xl shadow-2xl p-6 max-w-sm flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-black text-primary leading-tight">Agent Discovery</h3>
            <p className="text-xs text-on-surface-variant font-medium">Your personal agent is ready to connect.</p>
          </div>
        </div>
        
        <p className="text-sm text-on-surface-variant leading-relaxed">
          De Staatsman supports the <strong>A2UI protocol</strong>. Securely share your preferences and details with one click.
        </p>

        <button 
          onClick={handleConnect}
          className="w-full bg-primary text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
        >
          <Zap className="h-4 w-4" />
          Connect Agent
        </button>
      </div>
    </div>
  );
};
