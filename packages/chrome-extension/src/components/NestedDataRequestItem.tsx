import React from "react"
import { ChevronDown } from "lucide-react"
import { Switch } from "./Switch"

interface NestedItem {
  id: string
  label: string
  checked: boolean
}

interface NestedDataRequestItemProps {
  label: string
  items: NestedItem[]
  onItemToggle: (id: string) => void
  onToggleAll: (checked: boolean) => void
  footerText?: string
  open?: boolean
}

export const NestedDataRequestItem = ({
  label,
  items,
  onItemToggle,
  onToggleAll,
  footerText,
  open,
}: NestedDataRequestItemProps) => {
  const allChecked = items.every(item => item.checked)
  const noneChecked = items.every(item => !item.checked)
  
  const parentState: "on" | "off" | "partial" = allChecked 
    ? "on" 
    : noneChecked 
      ? "off" 
      : "partial"

  return (
    <details
      className="group bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-200"
      open={open}
    >
      <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50">
        <div className="flex items-center gap-2">
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
          <span className="text-xs font-bold text-slate-900">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch 
            state={parentState} 
            onStateChange={(state) => onToggleAll(state === "on")}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </summary>
      <div className="px-4 pb-3 space-y-1 bg-slate-50 border-t border-slate-200 pt-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-1.5">
            <span className="text-[11px] text-slate-500">{item.label}</span>
            <Switch 
              state={item.checked ? "on" : "off"} 
              onStateChange={() => onItemToggle(item.id)}
            />
          </div>
        ))}
        {footerText && (
          <div className="mt-2 border-t border-slate-200 pt-2 text-[11px] text-slate-500 leading-relaxed">
            {footerText}
          </div>
        )}
      </div>
    </details>
  )
}
