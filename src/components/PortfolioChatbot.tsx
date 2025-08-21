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
      content: "Hello! I'm Dhanush's portfolio assistant. I can help you learn about his professional work, projects, and skills.",
      sender: "ai",
    },
    {
      id: 2,
      content: "Please ask specific questions about his experience, technical expertise, or projects. I'm designed to discuss only professional portfolio content.",
      sender: "ai",
    },
  ])
  
  const [conversationCount, setConversationCount] = useState(0)
  const MAX_CONVERSATION_MESSAGES = 10

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Check conversation limits
    if (conversationCount >= MAX_CONVERSATION_MESSAGES) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "Conversation limit reached. Please refresh the page if you need to ask more questions.",
          sender: "ai",
        },
      ])
      return
    }

    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setConversationCount(prev => prev + 1)

    try {
      const aiResponse = await aiService.generateResponse(input)
      
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: aiResponse,
          sender: "ai",
        },
      ])
    } catch (error: any) {
      console.error('Error getting AI response:', error)
      
      let errorMessage = "I apologize, but I encountered an error. Please try again."
      
      // Handle specific error types
      if (error.code === 'RATE_LIMITED') {
        errorMessage = error.message
      } else if (error.code === 'INAPPROPRIATE_CONTENT') {
        errorMessage = error.message
      } else if (error.code === 'MESSAGE_TOO_LONG') {
        errorMessage = error.message
      } else if (error.code === 'INVALID_REQUEST') {
        errorMessage = "Please ask normal questions about Dhanush's portfolio and professional experience."
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: errorMessage,
          sender: "ai",
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
          className="flex items-center gap-2 p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 200))}
            placeholder="Ask about Dhanush's projects, skills, or experience... (200 char max)"
            className="flex-1 min-h-12 resize-none rounded-lg bg-background border p-3 shadow-none focus-visible:ring-1 focus-visible:ring-ring"
            maxLength={200}
          />
          <div className="text-xs text-muted-foreground px-1">
            {input.length}/200 | {conversationCount}/{MAX_CONVERSATION_MESSAGES} msgs
          </div>
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
