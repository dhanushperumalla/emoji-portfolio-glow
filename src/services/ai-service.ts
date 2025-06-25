import { GoogleGenerativeAI, GenerativeModel, ChatSession } from '@google/generative-ai';

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
  private static readonly REQUEST_WINDOW = 60000;
  private static readonly CACHE_DURATION = 300000;
  private requestTimestamps: number[] = [];
  private responseCache: Map<string, CacheEntry> = new Map();

  private static readonly DEFAULT_CONFIG: Partial<AIConfig> = {
    model: 'gemini-1.5-flash',
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
    if (!apiKey) throw new Error('API key is required');

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

    const systemInstruction = `
You are a friendly and knowledgeable AI assistant for Perumalla Venkata Naga Dhanush’s portfolio website.
Dhanush is a 3rd-year B.Tech student at Chalapathi Institute of Technology.
He is skilled in MERN stack development, AI/ML, LangChain, n8n, AI agents, and Generative AI.
He has built projects like Intern-T (an industry-level project platform), multiple RAG chatbots, and voice-enabled agents.
He has won 1st place in the Agnetic AI Hackathon (n8n) and was awarded Best n8n Agent in Ottomator Hackathon.
He also creates content in Telugu and is currently learning ServiceNow.
Your job is to answer user queries about his skills, experience, achievements, and help navigate his portfolio.
Be concise, helpful, and professional.

If asked about:
- Projects → Describe Dhanush’s real-world projects.
- Tech skills → List his tools (MERN, Python, LangChain, n8n, etc.).
- Contact/Resume → Prompt them to check the resume or contact page.
- Intern-T → Explain it’s like LeetCode but with real projects + AI feedback.
- n8n agents → Mention his AI automations and Course Guider Agent.
- Languages/Content → Mention he creates tutorials in Telugu.

Never fabricate. Redirect to contact if unsure.
`;

    this.chat = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemInstruction }]
        },
        {
          role: 'model',
          parts: [
            {
              text: "Understood. I will act as Dhanush's AI assistant and help users learn about his work, projects, and skills."
            }
          ]
        },
        {
          role: 'model',
          parts: [
            {
              text: "Hi there! I'm Dhanush's portfolio assistant. How can I help you explore his work?"
            }
          ]
        }
      ],
      generationConfig: {
        temperature: finalConfig.temperature,
        maxOutputTokens: finalConfig.maxOutputTokens
      }
    });
  }

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
    if (cachedResponse) return cachedResponse;

    if (!this.checkRateLimit()) {
      const waitTime = Math.ceil(AIService.REQUEST_WINDOW / 1000);
      return `Too many requests right now. Please try again in ${waitTime} seconds.`;
    }

    this.trackRequest();
    try {
      const result = await this.retryWithDelay(() => this.chat.sendMessage(trimmedMessage));
      const response = await result.response;
      const text = response.text();

      if (!text) throw new Error('Empty response received from AI');
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
        return 'Model configuration issue. Please verify your model and API settings.';
      }

      if (aiError.code === 'AUTHENTICATION_ERROR') {
        return 'Authentication failed. Please check your API key.';
      }

      return 'An error occurred while generating the response. Please try again later.';
    }
  }
}

export const aiService = new AIService(import.meta.env.VITE_GEMINI_API_KEY || '');
