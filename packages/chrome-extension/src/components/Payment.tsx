import React from "react"
import { ShieldCheck, CreditCard, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

interface PaymentProps {
  onConfirm: () => void
  onCancel: () => void
}

export const Payment = ({ onConfirm, onCancel }: PaymentProps) => {
  return (
    <div className="flex flex-col bg-slate-50 min-h-[500px] justify-between">
      <div className="p-4 space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">AP2 Payment Mandate</h3>
              <p className="text-[10px] text-slate-500 italic">Secure Agent Authorization</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-500">Merchant</span>
              <span className="text-[11px] font-bold text-slate-900">Political Party X</span>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Membership Fee (Annual)</span>
                <span className="font-medium text-slate-900">€25.00</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Processing Fee</span>
                <span className="font-medium text-slate-900">€0.50</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-900">Total</span>
              <span className="text-sm font-black text-primary">€25.50</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
          <div className="flex gap-2">
            <CreditCard className="h-3.5 w-3.5 text-blue-600 mt-0.5" />
            <p className="text-[10px] text-blue-700 leading-relaxed">
              By confirming, you authorize your wallet to sign a <span className="font-bold">Cart Mandate</span>. This ensures the price and items are locked and verified.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-200 flex flex-col gap-2">
        <Button 
          onClick={onConfirm}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
        >
          Sign & Pay
          <ChevronRight className="h-4 w-4" />
        </Button>
        <button 
          onClick={onCancel}
          className="w-full text-slate-500 hover:text-slate-900 font-semibold text-[10px] uppercase tracking-wider py-1 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
