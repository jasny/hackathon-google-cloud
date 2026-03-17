import React, { useState } from "react"
import { Trash2, Shield, ChevronDown, Info, ExternalLink } from "lucide-react"
import "./index.css"

interface SharedField {
  label: string
  reason: string
}

interface SitePermission {
  id: string
  site: string
  description: string
  icon: string
  fields: SharedField[]
  date: string
}

export default function Dashboard() {
  const [permissions, setPermissions] = useState<SitePermission[]>([
    {
      id: "1",
      site: "Political Party X",
      description: "Requests data for campaign optimization and member management.",
      icon: "https://api.dicebear.com/7.x/identicon/svg?seed=party-x",
      date: "2026-03-16",
      fields: [
        { label: "Name", reason: "Necessary for personalizing communication and official registration in the database." },
        { label: "Age", reason: "Used to compile demographic statistics and tailor content to your age group." },
        { label: "Gender", reason: "For statistical purposes to analyze representation within the party." },
        { label: "Political Affiliation", reason: "Sensitive data: Used to show targeted political advertisements and information." },
        { label: "Address", reason: "Required for regional campaign texts and invitations to local meetings." }
      ]
    },
    {
      id: "2",
      site: "Global Marketplace Y",
      description: "Requires shipping and contact details for order fulfillment.",
      icon: "https://api.dicebear.com/7.x/identicon/svg?seed=market-y",
      date: "2026-03-10",
      fields: [
        { label: "Name", reason: "Required for recipient identification on shipping labels." },
        { label: "Shipping Address", reason: "Necessary for the delivery of physical goods to your location." },
        { label: "Phone Number", reason: "Used by the courier for delivery coordination and SMS updates." }
      ]
    }
  ])

  const revokeField = (siteId: string, fieldLabel: string) => {
    setPermissions(prev => prev.map(site => {
      if (site.id === siteId) {
        return { ...site, fields: site.fields.filter(f => f.label !== fieldLabel) }
      }
      return site
    }).filter(site => site.fields.length > 0))
  }

  const revokeAll = (id: string) => {
    setPermissions(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50 p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Permissions</h1>
            <p className="text-slate-500 mt-2 text-lg font-medium">
              Manage data you've shared with websites via the Agent Connect protocol.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
            <Shield className="h-4 w-4" />
            Active Protection
          </div>
        </header>

        <div className="space-y-10">
          {permissions.map((site) => (
            <section key={site.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <header className="p-6 border-b border-slate-100 flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="h-14 w-14 rounded-xl bg-slate-100 p-1 border border-slate-100 flex items-center justify-center">
                    <img src={site.icon} alt={site.site} className="w-full h-full rounded-lg" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">{site.site}</h2>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last shared on {site.date}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{site.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => revokeAll(site.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-bold text-xs rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Revoke All & Delete
                </button>
              </header>

              <div className="p-6 space-y-3 bg-slate-50/30">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Shared Fields</h3>
                {site.fields.map((field) => (
                  <details key={field.label} className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 select-none">
                      <div className="flex items-center gap-3">
                        <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
                        <span className="text-sm font-bold text-slate-900">{field.label}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          revokeField(site.id, field.label)
                        }}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Revoke this field"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </summary>
                    <div className="px-5 pb-4 pt-0">
                      <div className="border-t border-slate-50 pt-3 flex gap-3">
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {field.reason}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          {permissions.length === 0 && (
            <div className="text-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
              <Shield className="h-16 w-16 text-slate-100 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">No Active Permissions</h3>
              <p className="text-slate-400 font-medium max-w-sm mx-auto mt-2">
                Your agent hasn't shared any data yet. Start using the extension to see permissions here.
              </p>
            </div>
          )}
        </div>

        <footer className="pt-10 flex justify-between items-center text-slate-400 text-xs font-bold border-t border-slate-100">
          <div className="flex gap-6 uppercase tracking-widest">
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">AP2 Terms</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
            SYSTEM ENCRYPTED
          </div>
        </footer>
      </div>
    </div>
  )
}
