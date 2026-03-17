import React, { useState } from "react"
import { Trash2, Shield, ExternalLink, Info } from "lucide-react"
import "./index.css"

interface SharedPermission {
  id: string
  site: string
  icon: string
  dataShared: string[]
  reason: string
  date: string
}

export default function Dashboard() {
  const [permissions, setPermissions] = useState<SharedPermission[]>([
    {
      id: "1",
      site: "Political Party X",
      icon: "https://api.dicebear.com/7.x/identicon/svg?seed=party-x",
      dataShared: ["Name", "Age", "Gender", "Political Affiliation", "Address (City)"],
      reason: "Campaign optimization, member management, and regional invitations.",
      date: "2026-03-16"
    },
    {
      id: "2",
      site: "Global Marketplace Y",
      icon: "https://api.dicebear.com/7.x/identicon/svg?seed=market-y",
      dataShared: ["Name", "Shipping Address", "Phone Number"],
      reason: "Fulfillment of order #98234 and secure delivery tracking.",
      date: "2026-03-10"
    },
    {
      id: "3",
      site: "HealthTracker App",
      icon: "https://api.dicebear.com/7.x/identicon/svg?seed=health",
      dataShared: ["Age", "Weight", "Heart Rate (Real-time)"],
      reason: "Personalized fitness insights and health trend analysis.",
      date: "2026-02-28"
    }
  ])

  const revokePermission = (id: string) => {
    setPermissions(prev => prev.filter(p => p.id !== id))
    console.log(`Revoking and requesting deletion for permission: ${id}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Data Permissions</h1>
            <p className="text-slate-500 mt-2 text-lg font-medium max-w-2xl">
              Manage all data shared via your AI Agent. Revoke access and request complete deletion of your information at any time.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
            <Shield className="h-4 w-4" />
            Active Protection
          </div>
        </header>

        <div className="grid gap-6">
          {permissions.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="p-6 flex items-start justify-between gap-6">
                <div className="flex gap-5 flex-1">
                  <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-100">
                    <img src={p.icon} alt={p.site} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-slate-900">{p.site}</h2>
                      <span className="text-slate-300 text-xs">•</span>
                      <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                        Shared on {p.date}
                      </span>
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {p.dataShared.map(data => (
                        <span key={data} className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded-full text-xs font-semibold">
                          {data}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 p-4 bg-slate-50/50 rounded-xl border border-slate-100 italic">
                      <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-500 leading-relaxed">
                        <span className="font-bold text-slate-700 not-italic">Reason for permission:</span> "{p.reason}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button 
                    onClick={() => revokePermission(p.id)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all active:scale-[0.98]"
                  >
                    <Trash2 className="h-4 w-4" />
                    Revoke & Delete
                  </button>
                  <p className="text-[10px] text-center text-slate-400 font-medium italic">
                    Signed Mandate Required
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {permissions.length === 0 && (
            <div className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
              <Shield className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900">No active permissions</h3>
              <p className="text-slate-400 font-medium">Your agent hasn't shared any data with third-party sites yet.</p>
            </div>
          )}
        </div>

        <footer className="pt-8 text-center text-slate-400 text-xs font-medium border-t border-slate-100">
          Powered by A2UI and AP2 Protocol &bull; Secure Privacy Protection &bull; March 17, 2026
        </footer>
      </div>
    </div>
  )
}
