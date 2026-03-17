import React, { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "ai" | "user"
}

interface ChatProps {
  onComplete?: () => void
}

export const Chat = ({ onComplete }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! I noticed you selected some fields that require more information. How can I help you with your political affiliation?", sender: "ai" }
  ])
  const [aiResponseCount, setAiResponseCount] = useState(0)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: "user" }
    setMessages(prev => [...prev, userMsg])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const isLastResponse = aiResponseCount >= 1
      const text = isLastResponse 
        ? "Thank you! I have enough information now. You can now share your selection."
        : "I understand. Could you tell me a bit more about your specific interests?"

      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text, 
        sender: "ai" 
      }

      setMessages(prev => [...prev, aiMsg])
      setAiResponseCount(prev => prev + 1)

      if (isLastResponse) {
        setTimeout(() => {
          onComplete?.()
        }, 2000)
      }
    }, 1000)
  }


  return (
    <div className="flex flex-col h-[400px] bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed shadow-sm ${
                msg.sender === "user"
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-white text-slate-900 border border-slate-100 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 bg-white border-t border-slate-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-[11px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 p-1.5 bg-primary text-white rounded-full hover:bg-blue-600 active:scale-95 transition-all"
          >
            <Send className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
