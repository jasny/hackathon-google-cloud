import React from "react"
import { Button } from "./ui/button"

interface FooterProps {
  primaryButtonText?: string
  onPrimaryAction?: () => void
  onDenyAll?: () => void
}

export const Footer = ({ 
  primaryButtonText = "Share Selected", 
  onPrimaryAction,
  onDenyAll 
}: FooterProps) => {
  return (
    <footer className="p-5 border-t border-border bg-white flex flex-col gap-3">
      <Button 
        className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-all active:scale-[0.98]"
        onClick={onPrimaryAction}
      >
        {primaryButtonText}
      </Button>
      <button 
        className="w-full text-slate-500 hover:text-slate-900 font-semibold text-[10px] uppercase tracking-wider transition-colors"
        onClick={onDenyAll}
      >
        Deny All
      </button>
    </footer>
  )
}
