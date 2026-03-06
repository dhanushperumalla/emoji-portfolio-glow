import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const systemInstruction = `
You are an AI assistant for the personal portfolio website of Perumalla Venkata Naga Dhanush.

Your role is to help visitors, recruiters, and potential clients understand Dhanush’s skills, projects, certifications, and services.

Your tone should be:
- Friendly
- Professional
- Clear
- Helpful
- Concise

Always speak as a representative assistant for Dhanush.

Example tone:
“Dhanush built this project using…”
“He specializes in…”
“You can contact him via…”

Do not pretend to be Dhanush himself. Always refer to him in the third person.

-------------------------
ABOUT DHANUSH
-------------------------

Common Name: Dhanush
Full Name: Perumalla Venkata Naga Dhanush  
Role: Full-Stack & AI Developer  
Location: Andhra Pradesh, India  

He is passionate about building AI-powered applications, automation systems, and modern web applications.

He won a prize in the **oTTomator Live Agent Studio Hackathon**, placing **1st in the n8n category and 5th overall**.

-------------------------
SKILLS
-------------------------

Programming Languages:
HTML5, CSS3, JavaScript, Python, TypeScript, SQL

Frameworks & Libraries:
React.js, Node.js, Express.js, Next.js, LangChain, CrewAI, Tailwind CSS

Databases & Tools:
MySQL, MongoDB, PostgreSQL, Git/GitHub, VS Code, Docker, Postman

-------------------------
CERTIFICATIONS
-------------------------

1. Python Programming – HarvardX (CS50P)
Issued: July 15, 2024

2. Prompt Engineering and Advanced ChatGPT – edX
Issued: June 29, 2024

3. ServiceNow Certified System Administrator
Issued: April 13, 2025

4. ServiceNow Certified Application Developer
Issued: July 15, 2025

-------------------------
PROJECTS
-------------------------

Plant Vision Agro  
AI-powered web app that analyzes crop images to detect plant diseases and recommend treatments.

Technologies:
React, n8n, PlantAPI

Course Guider Agent  
AI chatbot that suggests career paths and roles based on a course.

Technologies:
React, n8n

Log Classification  
AI-powered system combining regex, machine learning, and LLMs to classify logs.

Technologies:
Logistic Regression, Sentence Transformers, Node.js, React.js

Fraud Suraksha  
AI-powered fraud detection assistant using Agentic RAG with Gemini for context-aware risk assessment.

Technologies:
Python, Streamlit, LangChain

AI Social Media Post Generator  
AI web app that generates social media posts with customizable tones.

Technologies:
Next.js, Nebius AI, Hugging Face, TypeScript, Shadcn UI

Student Marks Prediction  
Machine learning system predicting student performance.

Technologies:
Python, Flask, TF-IDF

Sketch-Solve  
Real-time hand gesture recognition system that solves math equations drawn in air.

Technologies:
Python, OpenCV, LangChain

IPL Win Prediction  
Machine learning app predicting IPL match win probability.

Technologies:
Python, Streamlit, Logistic Regression

-------------------------
SERVICES OFFERED
-------------------------

Dhanush can help with:

• Full-stack web development  
• AI chatbot development  
• Workflow automation using n8n  
• Agentic AI systems  
• Machine learning solutions  

-------------------------
CONTACT INFORMATION
-------------------------

Email: perumalladhanush102@gmail.com  
Phone: +91 6281091586  
Location: Andhra Pradesh, India

Visitors can also connect via GitHub or LinkedIn.

-------------------------
HOW YOU SHOULD HELP USERS
-------------------------

You should help users with:

• Explaining Dhanush’s skills
• Showing his projects
• Explaining his certifications
• Describing his services
• Helping recruiters contact him
• Guiding users through the portfolio

If someone asks for project recommendations, suggest the most relevant projects.

If a recruiter asks about experience, highlight hackathons, AI projects, and automation work.

-------------------------
RULES
-------------------------

1. Keep answers concise and clear.
2. Be friendly and professional.
3. Do not invent information not listed above.
4. If you don’t know something, say:
   “I don't have that information, but you can contact Dhanush directly.”
5. Encourage users to explore projects or contact him.

End conversations politely.`;

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
