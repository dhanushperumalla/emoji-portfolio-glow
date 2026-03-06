"use client"

import { useState, FormEvent } from "react"
import { Send, Bot, Rocket, Brain, Trophy, Mail } from "lucide-react"
import { aiService } from "@/services/ai-service"
import { Button } from "@/components/ui/button"
import {
  ChatBubble,
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

interface Message {
  id: number
  content: string
  sender: "user" | "ai"
  showQuickReplies?: boolean
}

const QUICK_REPLIES = [
  {
    label: "🚀 Projects",
    icon: Rocket,
    response: `Here are Dhanush's notable projects:

• **Plant Vision Agro** – AI crop disease detection app
• **Course Guider Agent** – AI chatbot for career guidance
• **Fraud Suraksha** – AI-powered fraud detection assistant
• **AI Social Media Post Generator** – AI app for generating posts
• **Log Classification** – AI system for log analysis

Want to know more about any of these?`,
  },
  {
    label: "🧠 Skills",
    icon: Brain,
    response: `Here are Dhanush's skills:

**Programming Languages:**
HTML, CSS, JavaScript, Python, TypeScript, SQL

**Frameworks & Libraries:**
React.js, Node.js, Express.js, Next.js, LangChain, CrewAI, Tailwind CSS

**Databases & Tools:**
MySQL, MongoDB, PostgreSQL, Git/GitHub, Docker, Postman`,
  },
  {
    label: "🏆 Certs",
    icon: Trophy,
    response: `Dhanush holds these certifications:

• **CS50P:** Introduction to Programming with Python (HarvardX)
• **Prompt Engineering and Advanced ChatGPT** (edX)
• **ServiceNow Certified System Administrator**
• **ServiceNow Certified Application Developer**`,
  },
  {
    label: "📬 Contact",
    icon: Mail,
    response: `Here's how to reach Dhanush:

📧 Email: perumalladhanush102@gmail.com
📞 Phone: +91 6281091586
📍 Location: Andhra Pradesh, India`,
  },
]

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    const boldReplaced = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    return (
      <span key={i}>
        {boldReplaced !== line ? (
          <span dangerouslySetInnerHTML={{ __html: boldReplaced }} />
        ) : (
          line
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    )
  })
}

export function PortfolioChatbot() {
  const [messages, setMessages] = useState<Message[]>([
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

  const handleQuickReply = (reply: typeof QUICK_REPLIES[0]) => {
    const userMsg: Message = {
      id: messages.length + 1,
      content: reply.label,
      sender: "user",
    }
    const aiMsg: Message = {
      id: messages.length + 2,
      content: reply.response,
      sender: "ai",
    }
    setMessages((prev) => [...prev, userMsg, aiMsg])
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    if (trimmedInput.length > 200) {
      setInputError("Message too long. Please keep it under 200 characters.")
      return
    }

    setInputError("")

    const userMessage: Message = {
      id: messages.length + 1,
      content: trimmedInput,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const aiResponse = await aiService.generateResponse(trimmedInput)
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, content: aiResponse, sender: "ai" },
      ])
    } catch (error) {
      console.error('Error getting AI response:', error)
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, content: "I can only discuss Dhanush's portfolio and professional work. Please ask about his projects or skills.", sender: "ai" },
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
            <div key={message.id}>
              <ChatBubble
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleMessage
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  {renderMarkdown(message.content)}
                </ChatBubbleMessage>
              </ChatBubble>

              {message.showQuickReplies && (
                <div className="grid grid-cols-2 gap-2 mt-2 mb-4 px-1">
                  {QUICK_REPLIES.map((reply, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 * idx, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleQuickReply(reply)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-primary/30 bg-primary/10 text-sm font-medium text-foreground hover:bg-primary/20 hover:border-primary/50 transition-colors duration-200"
                    >
                      <reply.icon className="h-4 w-4 text-primary shrink-0" />
                      <span>{reply.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
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
