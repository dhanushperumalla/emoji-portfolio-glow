"use client"

import { useState, FormEvent } from "react"
import { Send, Bot, Rocket, Brain, Trophy, Mail } from "lucide-react"
import { aiService } from "@/services/ai-service"
import { Button } from "@/components/ui/button"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { motion } from "framer-motion"

const QUICK_REPLIES = [
  {
    label: "🚀 View Projects",
    icon: Rocket,
    response: `Here are Dhanush's notable projects:\n\n• **Plant Vision Agro** – AI crop disease detection app\n• **Course Guider Agent** – AI chatbot for career guidance\n• **Fraud Suraksha** – AI-powered fraud detection assistant\n• **AI Social Media Post Generator** – AI app for generating posts\n• **Log Classification** – AI system for log analysis\n\nWant to know more about any of these?`,
  },
  {
    label: "🧠 Skills",
    icon: Brain,
    response: `Here are Dhanush's skills:\n\n**Programming Languages:**\nHTML, CSS, JavaScript, Python, TypeScript, SQL\n\n**Frameworks & Libraries:**\nReact.js, Node.js, Express.js, Next.js, LangChain, CrewAI, Tailwind CSS\n\n**Databases & Tools:**\nMySQL, MongoDB, PostgreSQL, Git/GitHub, Docker, Postman`,
  },
  {
    label: "🏆 Certifications",
    icon: Trophy,
    response: `Dhanush holds these certifications:\n\n• **CS50P:** Introduction to Programming with Python (HarvardX)\n• **Prompt Engineering and Advanced ChatGPT** (edX)\n• **ServiceNow Certified System Administrator**\n• **ServiceNow Certified Application Developer**`,
  },
  {
    label: "📬 Contact",
    icon: Mail,
    response: `Here's how to reach Dhanush:\n\n📧 Email: perumalladhanush102@gmail.com\n📞 Phone: +91 6281091586\n📍 Location: Andhra Pradesh, India`,
  },
]

export function PortfolioChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hi there! 👋\nWelcome to Dhanush's portfolio. I'm his AI assistant.\nI can help you explore his projects, skills, certifications, or contact details.",
      sender: "ai",
      showQuickReplies: true,
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [inputError, setInputError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim()
    
    // Client-side input validation
    if (!trimmedInput) return
    
    if (trimmedInput.length > 200) {
      setInputError("Message too long. Please keep it under 200 characters.")
      return
    }

    // Clear any previous errors
    setInputError("")

    const userMessage = {
      id: messages.length + 1,
      content: trimmedInput,
      sender: "user" as const,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const aiResponse = await aiService.generateResponse(trimmedInput)
      
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: aiResponse,
          sender: "ai" as const,
        },
      ])
    } catch (error) {
      console.error('Error getting AI response:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "I can only discuss Dhanush's portfolio and professional work. Please ask about his projects or skills.",
          sender: "ai" as const,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ExpandableChat
      size="lg"
      position="bottom-right"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Chat with Dhanush's AI ✨</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about his projects and skills
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 p-1"
        >
          <div className="flex items-center gap-2">
            <ChatInput
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                if (inputError) setInputError("")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as any)
                }
              }}
              placeholder="Ask about Dhanush's projects, skills, or experience..."
              className={`flex-1 min-h-12 resize-none rounded-lg bg-background border p-3 shadow-none focus-visible:ring-1 focus-visible:ring-ring ${
                inputError ? "border-destructive" : ""
              }`}
              maxLength={200}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="shrink-0"
              disabled={isLoading || !!inputError}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {inputError && (
            <p className="text-xs text-destructive px-3">{inputError}</p>
          )}
          <p className="text-xs text-muted-foreground px-3">
            {input.length}/200 characters 
          </p>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
