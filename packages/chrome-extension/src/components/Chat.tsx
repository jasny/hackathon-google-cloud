import React, { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import type { A2UIComponent } from "./A2UIRenderer"

interface Message {
  id: string
  text: string
  sender: "ai" | "user"
}

interface ChatProps {
  sessionId: string
  onComplete?: (updatedA2UI?: A2UIComponent[]) => void
}

export const Chat = ({ sessionId, onComplete }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! I noticed you selected some fields that require more information. How can I help you with your political affiliation?", sender: "ai" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userText = input.trim();
    const userMsg: Message = { id: Date.now().toString(), text: userText, sender: "user" }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      // Call the User Agent (Dummy)
      const response = await fetch(`http://localhost:8080/v3/projects/demo/locations/global/agents/user-agent/sessions/${sessionId}:detectIntent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queryInput: { text: { text: userText } }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiText = data.queryResult?.responseMessages[0]?.text?.text[0] || "I understand.";
        const updatedA2UI = data.queryResult?.parameters?.a2ui;
        const isComplete = data.queryResult?.parameters?.complete;

        const aiMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          text: aiText, 
          sender: "ai" 
        }

        setMessages(prev => [...prev, aiMsg])

        if (isComplete) {
          setTimeout(() => {
            onComplete?.(updatedA2UI);
          }, 2000)
        }
      }
    } catch (error) {
      console.error("Failed to chat with User Agent:", error);
    } finally {
      setIsTyping(false)
    }
  }


  return (
    <div className="flex flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar min-h-[300px] max-h-[450px]">
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
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-slate-400 border border-slate-100 rounded-2xl rounded-tl-none px-3 py-2 text-[10px] animate-pulse">
              User Agent is thinking...
            </div>
          </div>
        )}
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
            disabled={isTyping}
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-[11px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="absolute right-2 p-1.5 bg-primary text-white rounded-full hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:bg-slate-300"
          >
            <Send className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
