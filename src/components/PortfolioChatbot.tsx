"use client"

import { useState, FormEvent } from "react"
import { Send, Bot, CornerDownLeft } from "lucide-react"
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

export function PortfolioChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm Dhanush's AI assistant. How can I help you learn more about his work and skills?",
      sender: "ai",
    },
    {
      id: 2,
      content: "Feel free to ask about his projects, experience, or technical expertise!",
      sender: "ai",
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
      className="neon-chat-container"
    >
      <ExpandableChatHeader className="flex-col text-center justify-center neon-chat-header">
        <h1 className="text-xl font-semibold neon-text">Chat with Dhanush's AI ✨</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about his projects and skills
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody className="backdrop-blur-sm">
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
              className={message.sender === "user" ? "neon-message-user" : "neon-message-ai"}
            >
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
                className="backdrop-blur-sm"
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received" className="neon-message-ai">
              <ChatBubbleMessage isLoading className="backdrop-blur-sm" />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter className="border-t border-primary/20 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 p-4"
        >
          <div className="flex items-center gap-3">
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
              className={`neon-chat-input flex-1 min-h-12 resize-none rounded-lg p-3 ${
                inputError ? "border-destructive" : ""
              }`}
              maxLength={200}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="neon-send-button shrink-0 h-12 w-12"
              disabled={isLoading || !!inputError}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          {inputError && (
            <p className="text-xs text-destructive px-3 animate-fade-in">{inputError}</p>
          )}
          <p className="text-xs text-muted-foreground px-3 flex justify-between items-center">
            <span>{input.length}/200 characters</span>
            <span className="text-primary/70">Portfolio topics only</span>
          </p>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
