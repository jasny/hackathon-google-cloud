import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  state?: "on" | "off" | "partial"
  onStateChange?: (state: "on" | "off") => void
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, state = "off", onStateChange, ...props }, ref) => {
  const isChecked = state === "on" || state === "partial"
  
  const handleCheckedChange = (checked: boolean) => {
    onStateChange?.(checked ? "on" : "off")
  }

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        state === "on" && "bg-primary",
        state === "off" && "bg-slate-200",
        state === "partial" && "bg-primary/20",
        className
      )}
      checked={isChecked}
      onCheckedChange={handleCheckedChange}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-3 w-3 rounded-full bg-white shadow-lg ring-0 transition-transform",
          state === "on" && "translate-x-3",
          state === "off" && "translate-x-0",
          state === "partial" && "translate-x-1.5 bg-primary"
        )}
      />
    </SwitchPrimitives.Root>
  )
})

Switch.displayName = "Switch"

export { Switch }
