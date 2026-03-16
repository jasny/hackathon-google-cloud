import "./index.css"
import React, { useState } from "react"
import { Header } from "./components/Header"
import { DataRequestItem } from "./components/DataRequestItem"
import { NestedDataRequestItem } from "./components/NestedDataRequestItem"
import { Footer } from "./components/Footer"

function Popup() {
  const [dataRequests, setDataRequests] = useState({
    naam: true,
    leeftijd: true,
    geslacht: false,
    politiekeKleur: false,
  })

  const [addressItems, setAddressItems] = useState([
    { id: "stad", label: "Stad", checked: true },
    { id: "straatnaam", label: "Straatnaam", checked: false },
  ])

  const toggleRequest = (key: keyof typeof dataRequests) => {
    setDataRequests(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleAddressItem = (id: string) => {
    setAddressItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const toggleAllAddress = (checked: boolean) => {
    setAddressItems(prev => prev.map(item => ({ ...item, checked })))
  }

  return (
    <main className="bg-slate-50 flex justify-center items-start min-h-[500px]">
      <div className="w-[360px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-3 max-h-[400px]">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
            Gegevensverzoek
          </h3>
          
          <DataRequestItem
            label="Naam"
            description="Noodzakelijk voor het personaliseren van communicatie en officiële registratie in de database."
            state={dataRequests.naam ? "on" : "off"}
            onStateChange={() => toggleRequest("naam")}
          />
          
          <DataRequestItem
            label="Leeftijd"
            description="Wordt gebruikt om demografische statistieken op te stellen en content af te stemmen op je leeftijdsgroep."
            state={dataRequests.leeftijd ? "on" : "off"}
            onStateChange={() => toggleRequest("leeftijd")}
          />
          
          <DataRequestItem
            label="Geslacht"
            description="Voor statistische doeleinden om de vertegenwoordiging binnen de partij te analyseren."
            state={dataRequests.geslacht ? "on" : "off"}
            onStateChange={() => toggleRequest("geslacht")}
          />
          
          <DataRequestItem
            label="Politieke Kleur"
            description="Gevoelige data: Wordt gebruikt om gerichte politieke advertenties en informatie te tonen."
            state={dataRequests.politiekeKleur ? "on" : "off"}
            onStateChange={() => toggleRequest("politiekeKleur")}
          />
          
          <NestedDataRequestItem
            label="Adres"
            items={addressItems}
            onItemToggle={toggleAddressItem}
            onToggleAll={toggleAllAddress}
            footerText="Nodig voor regionale campagneteksten en uitnodigingen voor lokale bijeenkomsten."
            open={true}
          />
        </main>
        
        <Footer />
      </div>
    </main>
  )
}

export default Popup
