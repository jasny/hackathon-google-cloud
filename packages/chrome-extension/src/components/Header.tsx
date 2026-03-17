import React from "react"

interface HeaderProps {
  siteName?: string
}

export const Header = ({ siteName = "Political Party X" }: HeaderProps) => {
  return (
    <header className="p-5 border-b border-border bg-white">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            Data Sensitivity
          </h2>
          <div className="relative w-full pt-1 pb-4">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-400 w-3/4 rounded-full"></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-semibold text-slate-500 uppercase tracking-tighter">
              <span>General</span>
              <span>Personal</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-900">{siteName}</span> requests data for campaign optimization and member management.
          </p>
        </div>
      </div>
    </header>
  )
}
