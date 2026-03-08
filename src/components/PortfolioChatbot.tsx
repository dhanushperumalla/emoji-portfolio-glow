"use client"

import { useState, useEffect, useRef, FormEvent } from "react"
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
  isStreaming?: boolean
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
    const boldReplaced = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300 font-semibold">$1</strong>')
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

// Streaming text hook
function useStreamingText(fullText: string, isStreaming: boolean, speed = 12) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!isStreaming) {
      setDisplayed(fullText)
      setDone(true)
      return
    }
    setDisplayed("")
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setDisplayed(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [fullText, isStreaming, speed])

  return { displayed, done }
}

function StreamingMessage({ content, onDone, onTick }: { content: string; onDone: () => void; onTick?: () => void }) {
  const { displayed, done } = useStreamingText(content, true, 10)
  const calledRef = useRef(false)

  useEffect(() => {
    if (done && !calledRef.current) {
      calledRef.current = true
      onDone()
    }
  }, [done, onDone])

  useEffect(() => {
    onTick?.()
  }, [displayed, onTick])

  return (
    <>
      {renderMarkdown(displayed)}
      {!done && (
        <span className="inline-block w-[2px] h-4 bg-blue-400 ml-0.5 animate-pulse align-middle" />
      )}
    </>
  )
}

export function PortfolioChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! 👋\nWelcome to Dhanush's portfolio. I'm his AI assistant.\nI can help you explore his projects, skills, certifications, or contact details.",
      sender: "ai",
      showQuickReplies: true,
      isStreaming: false,
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [inputError, setInputError] = useState("")
  const [scrollKey, setScrollKey] = useState(0)

  const triggerScroll = () => setScrollKey((k) => k + 1)

  const handleQuickReply = (reply: typeof QUICK_REPLIES[0]) => {
    const userMsg: Message = {
      id: Date.now(),
      content: reply.label,
      sender: "user",
    }
    const aiMsg: Message = {
      id: Date.now() + 1,
      content: reply.response,
      sender: "ai",
      isStreaming: true,
    }
    setMessages((prev) => [...prev, userMsg, aiMsg])
    setTimeout(triggerScroll, 50)
  }

  const handleStreamDone = (msgId: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, isStreaming: false } : m))
    )
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
      id: Date.now(),
      content: trimmedInput,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setTimeout(triggerScroll, 50)

    try {
      const aiResponse = await aiService.generateResponse(trimmedInput)
      const aiMsg: Message = {
        id: Date.now(),
        content: aiResponse,
        sender: "ai",
        isStreaming: true,
      }
      setMessages((prev) => [...prev, aiMsg])
      setTimeout(triggerScroll, 50)
    } catch (error) {
      console.error('Error getting AI response:', error)
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), content: "I can only discuss Dhanush's portfolio and professional work. Please ask about his projects or skills.", sender: "ai", isStreaming: true },
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
        <h1 className="text-lg font-semibold text-white/90">Chat with Dhanush's AI ✨</h1>
        <p className="text-xs text-white/40">
          Ask me anything about his projects and skills
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList smooth scrollKey={scrollKey}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChatBubble
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleMessage
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  {message.isStreaming ? (
                    <StreamingMessage
                      content={message.content}
                      onDone={() => handleStreamDone(message.id)}
                      onTick={triggerScroll}
                    />
                  ) : (
                    renderMarkdown(message.content)
                  )}
                </ChatBubbleMessage>
              </ChatBubble>

              {message.showQuickReplies && (
                <div className="grid grid-cols-2 gap-2 mt-3 mb-4 px-1">
                  {QUICK_REPLIES.map((reply, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.3 }}
                      whileHover={{
                        scale: 1.04,
                        boxShadow: "0 0 20px rgba(59,130,246,0.2), 0 4px 16px rgba(0,0,0,0.3)",
                        borderColor: "rgba(59,130,246,0.3)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleQuickReply(reply)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <reply.icon className="h-4 w-4 text-blue-400 shrink-0" />
                      <span>{reply.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ChatBubble variant="received">
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            </motion.div>
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
              placeholder="Ask about Dhanush..."
              className="flex-1 min-h-12 resize-none rounded-xl p-3 text-white/90 placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-blue-500/30"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: inputError ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.08)",
              }}
              maxLength={200}
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                type="submit"
                size="icon"
                className="shrink-0 rounded-xl h-12 w-12"
                disabled={isLoading || !!inputError}
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  boxShadow: "0 2px 12px rgba(59,130,246,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Send className="h-4 w-4 text-white" />
              </Button>
            </motion.div>
          </div>
          {inputError && (
            <p className="text-xs text-red-400 px-3">{inputError}</p>
          )}
          <p className="text-xs text-white/30 px-3">
            {input.length}/200 characters
          </p>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
