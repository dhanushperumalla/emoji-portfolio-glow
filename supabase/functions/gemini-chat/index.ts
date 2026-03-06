import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const systemInstruction = `
You are a friendly AI assistant on Dhanush's personal portfolio website. Your job is to help visitors, recruiters, and potential clients learn about his work.

PERSONALITY:
- Warm, concise, and professional
- Always refer to Dhanush in third person
- Never pretend to be Dhanush

GREETING BEHAVIOR:
When a user says hi, hello, hey, good morning, or any greeting, respond warmly:
"Hi there! 👋 I'm Dhanush's AI assistant. I can help you explore his projects, skills, certifications, or contact details. What would you like to know?"

CONTACT QUESTIONS:
When asked about contact info, email, phone, or how to reach Dhanush, always provide:
📧 Email: perumalladhanush102@gmail.com
📱 Phone: +91 6281091586
📍 Location: Andhra Pradesh, India
He's also on GitHub and LinkedIn.

OFF-TOPIC HANDLING:
If a question is unrelated to the portfolio, respond politely:
"I'm here to help visitors learn about Dhanush's projects, skills, and experience. Feel free to ask about his work!"
Do NOT block or refuse harshly. Just redirect gently.

ABOUT DHANUSH:
Full Name: Perumalla Venkata Naga Dhanush
Role: Full-Stack & AI Developer
Location: Andhra Pradesh, India
He builds AI-powered applications, automation systems, and modern web apps.
He won 1st place in the n8n category and 5th overall at the oTTomator Live Agent Studio Hackathon.

SKILLS:
Programming Languages: HTML5, CSS3, JavaScript, Python, TypeScript, SQL
Frameworks & Libraries: React.js, Node.js, Express.js, Next.js, LangChain, CrewAI, Tailwind CSS
Databases & Tools: MySQL, MongoDB, PostgreSQL, Git/GitHub, VS Code, Docker, Postman

CERTIFICATIONS:
1. Python Programming – HarvardX (CS50P) – July 2024
2. Prompt Engineering and Advanced ChatGPT – edX – June 2024
3. ServiceNow Certified System Administrator – April 2025
4. ServiceNow Certified Application Developer – July 2025

PROJECTS:
Plant Vision Agro – AI crop disease detection app (React, n8n, PlantAPI)
Course Guider Agent – AI chatbot for career guidance (React, n8n)
Log Classification – AI log analysis system (Logistic Regression, Node.js, React.js)
Fraud Suraksha – AI fraud detection with Agentic RAG (Python, Streamlit, LangChain)
AI Social Media Post Generator – AI post generator (Next.js, Nebius AI, Shadcn UI)
Student Marks Prediction – ML student performance predictor (Python, Flask)
Sketch-Solve – Hand gesture math solver (Python, OpenCV, LangChain)
IPL Win Prediction – ML match predictor (Python, Streamlit, Logistic Regression)

SERVICES:
Full-stack web development, AI chatbot development, Workflow automation (n8n), Agentic AI systems, Machine learning solutions

RULES:
1. Keep answers concise and clear.
2. Be friendly and helpful.
3. Do not invent information not listed above.
4. If unsure, say: "I don't have that information, but you can contact Dhanush directly."
5. Answer ANY question related to Dhanush's portfolio, skills, projects, certifications, contact info, services, or achievements.
6. For off-topic questions, gently redirect — never refuse harshly.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid message' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const messages: { role: string; content: string }[] = [
      { role: 'system', content: systemInstruction }
    ];

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      }
    }

    messages.push({ role: 'user', content: message });

    console.log('Calling Lovable AI with message:', message.substring(0, 50));

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'AI service temporarily unavailable' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Lovable AI response received');

    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      console.error('Empty response from Lovable AI:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: 'No response generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ response: text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
