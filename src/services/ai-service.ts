import { supabase } from "@/integrations/supabase/client";

class AIService {
  private static readonly MAX_MESSAGE_LENGTH = 500;
  private static readonly MAX_CONVERSATION_LENGTH = 30;
  
  private conversationHistory: { content: string; sender: 'user' | 'ai' }[] = [];
  private conversationCount = 0;
  private cooldownUntil = 0;

  // Only block clearly malicious/dangerous content
  private static readonly BLOCKED_PATTERNS = [
    /hack|exploit|penetration|sql injection|xss|csrf/i,
    /ignore.*instructions|forget.*context|override.*rules|system.*prompt/i,
    /bypass.*filter|circumvent.*rule|disable.*safety/i,
  ];

  private validateInput(message: string): { isValid: boolean; reason?: string } {
    if (message.length > AIService.MAX_MESSAGE_LENGTH) {
      return { isValid: false, reason: 'Message too long. Please keep it under 500 characters.' };
    }

    for (const pattern of AIService.BLOCKED_PATTERNS) {
      if (pattern.test(message)) {
        return { isValid: false, reason: "I'm here to help visitors learn about Dhanush's projects, skills, and experience. Feel free to ask about his work!" };
      }
    }

    if (this.conversationCount >= AIService.MAX_CONVERSATION_LENGTH) {
      return { isValid: false, reason: 'Conversation limit reached. Please refresh to start a new session.' };
    }

    return { isValid: true };
  }

  async generateResponse(message: string): Promise<string> {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return "Please ask me about Dhanush's projects, skills, or experience.";
    }

    const validation = this.validateInput(trimmedMessage);
    if (!validation.isValid) {
      return validation.reason!;
    }

    const now = Date.now();
    if (now < this.cooldownUntil) {
      const waitSeconds = Math.max(1, Math.ceil((this.cooldownUntil - now) / 1000));
      return `Please wait ${waitSeconds}s and try again.`;
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
        return "I encountered an error. Please ask about Dhanush's portfolio, projects, or skills.";
      }

      if (data?.error) {
        console.error('API error:', data.error);
        const retryAfter = typeof data.retryAfterSeconds === 'number' ? data.retryAfterSeconds : null;
        if (retryAfter && retryAfter > 0) {
          this.cooldownUntil = Date.now() + retryAfter * 1000;
        }
        return retryAfter
          ? `${data.error} (retry in ~${retryAfter}s)`
          : data.error;
      }

      const response = data?.response;
      if (!response) {
        return "I encountered an error. Please ask about Dhanush's portfolio, projects, or skills.";
      }

      this.conversationHistory.push(
        { content: trimmedMessage, sender: 'user' },
        { content: response, sender: 'ai' }
      );

      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

      return response;

    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I encountered an error. Please ask about Dhanush's portfolio, projects, or skills.";
    }
  }
}

export const aiService = new AIService();
