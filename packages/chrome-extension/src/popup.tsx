import "./index.css"
import React, { useState, useMemo, useEffect } from "react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { A2UIRenderer, A2UIComponent } from "./components/A2UIRenderer"
import { Chat } from "./components/Chat"
import { Payment } from "./components/Payment"
import { Loader2 } from "lucide-react"

function Popup() {
  const [loading, setLoading] = useState(true)
  const [siteName, setSiteName] = useState("")
  const [dynamicComponents, setDynamicComponents] = useState<A2UIComponent[]>([])
  const [chatMode, setChatMode] = useState(false)
  const [paymentMode, setPaymentMode] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [agentFound, setAgentFound] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [capability, setCapability] = useState("hello")

  useEffect(() => {
    const loadAgentData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      let tabId = urlParams.get('tabId') ? parseInt(urlParams.get('tabId')!) : null;
      const cap = urlParams.get('capability') || "hello";
      setCapability(cap);

      if (!tabId) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        tabId = tab?.id || null;
      }

      if (tabId) {
        const key = `agent_${tabId}`;
        const result = await chrome.storage.local.get(key);
        if (result[key]) {
          const agent = result[key];
          setSiteName(agent.name);
          setAgentFound(true);

          const sId = `session_${tabId}_${cap}`;
          setSessionId(sId);

          try {
            const response = await fetch(`http://localhost:8080/v3/projects/demo/locations/global/agents/user-agent/sessions/${sId}:detectIntent`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                queryInput: { text: { text: "connect" } },
                queryParams: {
                  userId: "user-123",
                  capability: cap,
                  serverAgent: { origin: agent.origin }
                }
              })
            });

            if (response.ok) {
              const data = await response.json();
              if (data.queryResult?.parameters?.a2ui) {
                setDynamicComponents(data.queryResult.parameters.a2ui);
              }
              // Automatically trigger payment mode if User Agent says so
              if (data.queryResult?.parameters?.triggerPayment) {
                setPaymentMode(true);
              }
            }
          } catch (error) {
            console.error("Failed to connect to User Agent:", error);
          }
        }
      }
      setLoading(false);
    };

    loadAgentData();

    const handleUnload = () => {
      if (sessionId) {
        const url = `http://localhost:8080/v3/projects/demo/locations/global/agents/user-agent/sessions/${sessionId}:detectIntent`;
        const body = JSON.stringify({
          queryInput: { text: { text: "END_SESSION" } }
        });
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      }
    };

    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [sessionId]);

  const isUnknownActive = useMemo(() => {
    if (isComplete) return false;
    return dynamicComponents.some(c => 
      c.type === "DataRequestItem" && 
      c.props?.isUnknown && 
      c.props?.state === "on"
    );
  }, [dynamicComponents, isComplete]);

  const handleAction = (id: string, action: string, payload?: any) => {
    setDynamicComponents(prev => prev.map(c => {
      if (c.id === id) {
        if (action === "toggle") {
          return { ...c, props: { ...c.props, state: payload.state } };
        }
        if (action === "toggleItem") {
          const newItems = c.props.items.map((item: any) => 
            item.id === payload.itemId ? { ...item, checked: !item.checked } : item
          );
          return { ...c, props: { ...c.props, items: newItems } };
        }
        if (action === "toggleAll") {
          const newItems = c.props.items.map((item: any) => ({ ...item, checked: payload.checked }));
          return { ...c, props: { ...c.props, items: newItems } };
        }
      }
      return c;
    }));
  };

  const handlePrimaryAction = () => {
    if (isUnknownActive) {
      setChatMode(true)
    } else {
      console.log("Sharing selected data...")
      setIsComplete(true);
    }
  }

  const handleChatComplete = (updatedA2UI?: A2UIComponent[]) => {
    if (updatedA2UI) {
      setDynamicComponents(updatedA2UI);
    }
    setChatMode(false)
    setIsComplete(true)
  }

  if (loading) {
    return (
      <div className="w-[360px] h-[500px] flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!agentFound) {
    return (
      <div className="w-[360px] h-[500px] flex flex-col items-center justify-center bg-slate-50 p-8 text-center">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <Loader2 className="h-8 w-8 text-slate-200" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">No Agent Detected</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Navigate to a website with a valid <code>agent.json</code> to start an introduction.
        </p>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 flex justify-center items-start min-h-[500px]">
      <div className="w-[360px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {!paymentMode && <Header siteName={siteName} />}
        
        <main className="flex-1 p-0">
          {paymentMode ? (
            <Payment 
              onConfirm={() => {
                console.log("Payment confirmed!")
                setPaymentMode(false)
                setIsComplete(true)
              }}
              onCancel={() => setPaymentMode(false)}
            />
          ) : chatMode ? (
            <Chat sessionId={sessionId} onComplete={handleChatComplete} />
          ) : isComplete ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Loader2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary">Request Successful</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Your agent has shared the data and completed the transaction. You can close this window now.
              </p>
            </div>
          ) : (
            <div className="p-5">
              <A2UIRenderer components={dynamicComponents} onAction={handleAction} />
            </div>
          )}
        </main>
        
        {!chatMode && !paymentMode && !isComplete && (
          <div className="relative">
            <Footer 
              primaryButtonText={isUnknownActive ? "Continue" : "Share Selected"} 
              onPrimaryAction={handlePrimaryAction}
              onDenyAll={() => window.close()}
            />
          </div>
        )}
      </div>
    </main>
  )
}

export default Popup
