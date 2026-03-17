import React from "react"
import { ChevronDown, MessageCircleQuestion } from "lucide-react"
import { Switch } from "./Switch"

interface DataRequestItemProps {
  label: string
  description?: React.ReactNode
  state?: "on" | "off" | "partial"
  onStateChange?: (state: "on" | "off") => void
  open?: boolean
  isBold?: boolean
  isUnknown?: boolean
}

export const DataRequestItem = ({
  label,
  description,
  state = "off",
  onStateChange,
  open,
  isBold,
  isUnknown,
}: DataRequestItemProps) => {
  return (
    <details
      className="group bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-200"
      open={open}
    >
      <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50">
        <div className="flex items-center gap-2">
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-medium text-slate-900 ${isBold ? 'font-bold' : ''}`}>
              {label}
            </span>
            {isUnknown && (
              <MessageCircleQuestion className="h-4 w-4 text-slate-600" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            state={state}
            onStateChange={onStateChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </summary>
      <div className="px-4 pb-3 text-[11px] text-slate-500 border-t border-slate-50 pt-2 leading-relaxed">
        {description}
      </div>
    </details>
  )
}
