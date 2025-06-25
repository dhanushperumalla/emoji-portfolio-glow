import { GoogleGenerativeAI, GenerativeModel, ChatSession } from '@google/generative-ai';

// Environment variable type declaration
declare global {
  interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY: string;
  }
}

interface ChatMessage {
  id: number;
  content: string;
  sender: 'user' | 'ai';
}

interface AIError extends Error {
  code?: string;
  status?: number;
}

interface AIConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

interface CacheEntry {
  response: string;
  timestamp: number;
}

class AIService {
  private static readonly REQUEST_LIMIT = 10;
  private static readonly REQUEST_WINDOW = 60000; // 1 minute
  private static readonly CACHE_DURATION = 300000; // 5 minutes
  private requestTimestamps: number[] = [];
  private responseCache: Map<string, CacheEntry> = new Map();

  private checkRateLimit(): boolean {
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(
      timestamp => now - timestamp < AIService.REQUEST_WINDOW
    );
    return this.requestTimestamps.length < AIService.REQUEST_LIMIT;
  }

  private trackRequest(): void {
    this.requestTimestamps.push(Date.now());
  }

  private getCachedResponse(message: string): string | null {
    const cached = this.responseCache.get(message);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > AIService.CACHE_DURATION) {
      this.responseCache.delete(message);
      return null;
    }

    return cached.response;
  }

  private cacheResponse(message: string, response: string): void {
    this.responseCache.set(message, {
      response,
      timestamp: Date.now()
    });
  }
  private static readonly DEFAULT_CONFIG: Partial<AIConfig> = {
    model: 'gemini-2.0-flash',
    temperature: 0.7,
    maxOutputTokens: 2048
  };
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private chat: ChatSession;

  private static validateConfig(config: AIConfig): void {
    if (config.temperature && (config.temperature < 0 || config.temperature > 1)) {
      throw new Error('Temperature must be between 0 and 1');
    }
    if (config.maxOutputTokens && config.maxOutputTokens < 1) {
      throw new Error('MaxOutputTokens must be greater than 0');
    }
  }

  constructor(apiKey: string, config: Partial<AIConfig> = {}) {
    if (!apiKey) {
      throw new Error('API key is required');
    }

    const finalConfig = {
      ...AIService.DEFAULT_CONFIG,
      ...config,
      apiKey
    };

    this.genAI = new GoogleGenerativeAI(finalConfig.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: finalConfig.model,
      generationConfig: {
        temperature: finalConfig.temperature,
        maxOutputTokens: finalConfig.maxOutputTokens
      }
    });

    this.chat = this.model.startChat({
      history: [
        {
          role: 'assistant',
          parts: "Hello! I'm Dhanush's AI assistant. How can I help you learn more about his work and skills?"
        }
      ],
      generationConfig: {
        temperature: finalConfig.temperature,
        maxOutputTokens: finalConfig.maxOutputTokens
      }
    });
  }

  private async retryWithDelay(fn: () => Promise<any>, retries = 3, delay = 1000): Promise<any> {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.retryWithDelay(fn, retries - 1, delay * 2);
    }
  }

  async generateResponse(message: string): Promise<string> {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      throw new Error('Empty message provided');
    }

    const cachedResponse = this.getCachedResponse(trimmedMessage);
    if (cachedResponse) {
      return cachedResponse;
    }

    if (!this.checkRateLimit()) {
      const waitTime = Math.ceil(AIService.REQUEST_WINDOW / 1000);
      return `I'm receiving too many requests right now. Please try again in ${waitTime} seconds.`;
    }
    this.trackRequest();
    try {
      const result = await this.retryWithDelay(async () => {
        const response = await this.chat.sendMessage(trimmedMessage);
        return response;
      });

      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error('Empty response received from AI');
      }

      this.cacheResponse(trimmedMessage, text);
      return text;
    } catch (error) {
      const aiError = error as AIError;
      console.error('Error generating AI response:', {
        message: aiError.message,
        code: aiError.code,
        status: aiError.status,
        stack: aiError.stack
      });
      
      if (aiError.message?.includes('not found for API version')) {
        return 'I apologize, but there seems to be an issue with the AI model configuration. Please check the model version and API endpoint.';
      }
      
      if (aiError.code === 'AUTHENTICATION_ERROR') {
        return 'I apologize, but there seems to be an issue with the AI service authentication. Please check your API key.';
      }
      
      return 'I apologize, but I encountered an error. Please try again in a moment.';
    }
  }
}

export const aiService = new AIService(import.meta.env.VITE_GEMINI_API_KEY || '');