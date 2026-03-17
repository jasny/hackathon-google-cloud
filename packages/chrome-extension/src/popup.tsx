import "./index.css"
import React, { useState, useMemo } from "react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { A2UIRenderer, A2UIComponent } from "./components/A2UIRenderer"

function Popup() {
  const [dataRequests, setDataRequests] = useState({
    name: true,
    age: true,
    gender: false,
    politicalAffiliation: false,
  })

  const [addressItems, setAddressItems] = useState([
    { id: "city", label: "City", checked: true },
    { id: "streetName", label: "Street Name", checked: false },
  ])

  const a2uiComponents: A2UIComponent[] = useMemo(() => [
    {
      id: "root",
      type: "Container",
      children: ["header-1", "item-name", "item-age", "item-gender", "item-politicalAffiliation", "item-address"]
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
      id: "item-age",
      type: "DataRequestItem",
      props: {
        label: "Age",
        description: "Used to compile demographic statistics and tailor content to your age group.",
        state: dataRequests.age ? "on" : "off"
      }
    },
    {
      id: "item-gender",
      type: "DataRequestItem",
      props: {
        label: "Gender",
        description: "For statistical purposes to analyze representation within the party.",
        state: dataRequests.gender ? "on" : "off"
      }
    },
    {
      id: "item-politicalAffiliation",
      type: "DataRequestItem",
      props: {
        label: "Political Affiliation",
        description: "Sensitive data: Used to show targeted political advertisements and information.",
        state: dataRequests.politicalAffiliation ? "on" : "off"
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
  ], [dataRequests, addressItems])

  const handleAction = (id: string, action: string, payload?: any) => {
    if (id === "item-name" && action === "toggle") {
      setDataRequests(prev => ({ ...prev, name: !prev.name }))
    } else if (id === "item-age" && action === "toggle") {
      setDataRequests(prev => ({ ...prev, age: !prev.age }))
    } else if (id === "item-gender" && action === "toggle") {
      setDataRequests(prev => ({ ...prev, gender: !prev.gender }))
    } else if (id === "item-politicalAffiliation" && action === "toggle") {
      setDataRequests(prev => ({ ...prev, politicalAffiliation: !prev.politicalAffiliation }))
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

  return (
    <main className="bg-slate-50 flex justify-center items-start min-h-[500px]">
      <div className="w-[360px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-5 max-h-[400px]">
          <A2UIRenderer components={a2uiComponents} onAction={handleAction} />
        </main>
        
        <Footer />
      </div>
    </main>
  )
}

export default Popup
