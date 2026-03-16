import "./index.css"

import { Blocks, Puzzle } from "lucide-react"

import { Button } from "@/components/ui/button"

function Popup() {
  return (
    <main className="w-[360px] p-4">
      <section className="space-y-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Dummy Extension</h1>
          <Puzzle className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          Built with Plasmo, shadcn/ui, and Radix primitives.
        </p>
        <Button className="w-full">
          <Blocks className="mr-2 h-4 w-4" />
          Click Me
        </Button>
      </section>
    </main>
  )
}

export default Popup
