import "./index.css"
import React, { useState, useMemo, useEffect } from "react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { A2UIRenderer, A2UIComponent } from "./components/A2UIRenderer"
import { Chat } from "./components/Chat"
import { Payment } from "./components/Payment"
import { CreditCard, Loader2 } from "lucide-react"

function Popup() {
  const [loading, setLoading] = useState(true)
  const [siteName, setSiteName] = useState("")
  const [chatMode, setChatMode] = useState(false)
  const [paymentMode, setPaymentMode] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [agentFound, setAgentFound] = useState(false)

  // Default demo state
  const [dataRequests, setDataRequests] = useState({
    name: true,
    politicalAffiliation: false,
  })

  const [demographicItems, setDemographicItems] = useState([
    { id: "age", label: "Age", checked: true },
    { id: "gender", label: "Gender", checked: true },
  ])

  const [addressItems, setAddressItems] = useState([
    { id: "city", label: "City", checked: true },
    { id: "streetName", label: "Street Name", checked: false },
  ])

  useEffect(() => {
    const loadAgentData = async () => {
      // Get tabId from URL or query active tab
      const urlParams = new URLSearchParams(window.location.search);
      let tabId = urlParams.get('tabId') ? parseInt(urlParams.get('tabId')!) : null;

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
        }
      }
      setLoading(false);
    };

    loadAgentData();
  }, []);

  const isUnknownActive = !isComplete && dataRequests.politicalAffiliation

  const a2uiComponents: A2UIComponent[] = useMemo(() => [
    {
      id: "root",
      type: "Container",
      children: ["header-1", "item-name", "item-demographics", "item-politicalAffiliation", "item-address"]
    },
    {
      id: "header-1",
      type: "SectionHeader",
      props: { text: "Data Request" }
    },
    {
      id: "item-name",
      type: "DataRequestItem",
      props: {
        label: "Name",
        description: "Necessary for personalizing communication and official registration in the database.",
        state: dataRequests.name ? "on" : "off"
      }
    },
    {
      id: "item-demographics",
      type: "NestedDataRequestItem",
      props: {
        label: "Demographics",
        items: demographicItems,
        footerText: "Used for statistical analysis and tailored content.",
        open: false
      }
    },
    {
      id: "item-politicalAffiliation",
      type: "DataRequestItem",
      props: {
        label: "Political Affiliation",
        description: "Sensitive data: Used to show targeted political advertisements and information.",
        state: dataRequests.politicalAffiliation ? "on" : "off",
        isUnknown: !isComplete
      }
    },
    {
      id: "item-address",
      type: "NestedDataRequestItem",
      props: {
        label: "Address",
        items: addressItems,
        footerText: "Required for regional campaign texts and invitations to local meetings.",
        open: true
      }
    }
  ], [dataRequests, demographicItems, addressItems, isComplete])

  const handleAction = (id: string, action: string, payload?: any) => {
    if (id === "item-name" && action === "toggle") {
      setDataRequests(prev => ({ ...prev, name: !prev.name }))
    } else if (id === "item-politicalAffiliation" && action === "toggle") {
      setDataRequests(prev => ({ ...prev, politicalAffiliation: !prev.politicalAffiliation }))
    } else if (id === "item-demographics") {
      if (action === "toggleItem") {
        const itemId = payload.itemId
        setDemographicItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        ))
      } else if (action === "toggleAll") {
        const checked = payload.checked
        setDemographicItems(prev => prev.map(item => ({ ...item, checked })))
      }
    } else if (id === "item-address") {
      if (action === "toggleItem") {
        const itemId = payload.itemId
        setAddressItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        ))
      } else if (action === "toggleAll") {
        const checked = payload.checked
        setAddressItems(prev => prev.map(item => ({ ...item, checked })))
      }
    }
  }

  const handlePrimaryAction = () => {
    if (isUnknownActive) {
      setChatMode(true)
    } else {
      console.log("Sharing selected data...")
    }
  }

  const handleChatComplete = () => {
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
              }}
              onCancel={() => setPaymentMode(false)}
            />
          ) : chatMode ? (
            <Chat onComplete={handleChatComplete} />
          ) : (
            <div className="p-5">
              <A2UIRenderer components={a2uiComponents} onAction={handleAction} />
            </div>
          )}
        </main>
        
        {!chatMode && !paymentMode && (
          <div className="relative">
            <Footer 
              primaryButtonText={isUnknownActive ? "Continue" : "Share Selected"} 
              onPrimaryAction={handlePrimaryAction}
              onDenyAll={() => console.log("Denied all")}
            />
            <button
              onClick={() => setPaymentMode(true)}
              className="absolute -top-3 right-5 p-1.5 bg-white border border-slate-200 rounded-full shadow-sm text-slate-400 hover:text-primary hover:border-primary transition-all z-10"
              title="Test AP2 Payment"
            >
              <CreditCard className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Popup
