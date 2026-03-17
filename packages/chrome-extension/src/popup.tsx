import "./index.css"
import React, { useState, useMemo } from "react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { A2UIRenderer, A2UIComponent } from "./components/A2UIRenderer"
import { Chat } from "./components/Chat"
import { Payment } from "./components/Payment"
import { CreditCard } from "lucide-react"

function Popup() {
  const [chatMode, setChatMode] = useState(false)
  const [paymentMode, setPaymentMode] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
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

  return (
    <main className="bg-slate-50 flex justify-center items-start min-h-[500px]">
      <div className="w-[360px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {!paymentMode && <Header />}
        
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
