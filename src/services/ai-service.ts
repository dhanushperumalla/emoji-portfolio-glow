import { supabase } from "@/integrations/supabase/client";

interface ChatMessage {
  id: number;
  content: string;
  sender: 'user' | 'ai';
}

class AIService {
  private static readonly MAX_MESSAGE_LENGTH = 200;
  private static readonly MAX_CONVERSATION_LENGTH = 15;
  
  private conversationHistory: { content: string; sender: 'user' | 'ai' }[] = [];
  private conversationCount = 0;

  // Input guardrails - blocked content patterns
  private static readonly BLOCKED_PATTERNS = [
    /hack|exploit|penetration|vulnerability|sql injection|xss|csrf/i,
    /ignore.*instructions|forget.*context|act as|roleplay|pretend/i,
    /generate.*code|write.*script|create.*program|implement.*function/i,
    /system.*prompt|initial.*instructions|override.*rules/i,
    /adult|sexual|inappropriate|violent|offensive|hate/i,
    /political|religion|controversial|sensitive.*topic/i,
    /personal.*information|private.*data|confidential/i,
    /bypass.*filter|circumvent.*rule|disable.*safety/i
  ];

  // Portfolio-related keywords for validation
  private static readonly PORTFOLIO_KEYWORDS = [
    'dhanush', 'projects', 'skills', 'experience', 'education', 'certifications',
    'python', 'react', 'mern', 'langchain', 'n8n', 'crewai', 'ai', 'ml',
    'fraud suraksha', 'course guider', 'ipl predictor', 'servicenow',
    'portfolio', 'resume', 'contact', 'work', 'achievements', 'hackathon'
  ];

  // Input validation
  private validateInput(message: string): { isValid: boolean; reason?: string } {
    if (message.length > AIService.MAX_MESSAGE_LENGTH) {
      return { isValid: false, reason: 'Message too long. Please keep it under 200 characters.' };
    }

    for (const pattern of AIService.BLOCKED_PATTERNS) {
      if (pattern.test(message)) {
        return { isValid: false, reason: 'I can only discuss Dhanush\'s portfolio and professional work.' };
      }
    }

    if (this.conversationCount >= AIService.MAX_CONVERSATION_LENGTH) {
      return { isValid: false, reason: 'Conversation limit reached. Please refresh to start a new session.' };
    }

    const lowerMessage = message.toLowerCase();
    const hasPortfolioKeyword = AIService.PORTFOLIO_KEYWORDS.some(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );
    
    const hasQuestionWords = /\b(what|how|tell|about|show|can|do|does|is|are|where|when)\b/i.test(message);
    const isGreeting = /\b(hi|hello|hey|good|thanks|thank you)\b/i.test(message);
    
    if (!hasPortfolioKeyword && !hasQuestionWords && !isGreeting && message.length > 20) {
      return { isValid: false, reason: 'I can only discuss Dhanush\'s portfolio, projects, and professional work.' };
    }

    return { isValid: true };
  }

  async generateResponse(message: string): Promise<string> {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return 'Please ask me about Dhanush\'s projects, skills, or experience.';
    }

    // Input validation
    const validation = this.validateInput(trimmedMessage);
    if (!validation.isValid) {
      return validation.reason!;
    }

    this.conversationCount++;

    try {
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          message: trimmedMessage,
          history: this.conversationHistory
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        
        if (error.message?.includes('429')) {
          return 'Too many requests. Please wait a moment and try again.';
        }
        
        return 'I encountered an error. Please ask about Dhanush\'s portfolio, projects, or skills.';
      }

      if (data?.error) {
        console.error('API error:', data.error);
        return data.error;
      }

      const response = data?.response;
      
      if (!response) {
        return 'I encountered an error. Please ask about Dhanush\'s portfolio, projects, or skills.';
      }

      // Update conversation history
      this.conversationHistory.push(
        { content: trimmedMessage, sender: 'user' },
        { content: response, sender: 'ai' }
      );

      // Keep history manageable
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

      return response;

    } catch (error) {
      console.error('Error generating AI response:', error);
      return 'I encountered an error. Please ask about Dhanush\'s portfolio, projects, or skills.';
    }
  }
}

export const aiService = new AIService();
