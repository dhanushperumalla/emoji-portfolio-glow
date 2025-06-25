# Portfolio Chatbot Setup Guide

## Overview
This portfolio website includes an AI-powered chatbot that uses Google's Gemini AI to provide intelligent responses about the portfolio owner's skills, projects, and experience.

## Prerequisites
1. Node.js and npm installed
2. Google Cloud account with access to Gemini API

## Setup Instructions

1. **Get Gemini API Key**
   - Visit the [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create or select a project
   - Generate an API key

2. **Configure Environment Variables**
   - Create or edit the `.env` file in the project root
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Features
- Real-time AI responses using Gemini Pro model
- Context-aware conversations about portfolio content
- Error handling and fallback responses
- Modern UI with loading states and avatars

## Customization
To customize the chatbot's behavior and responses:

1. Edit the initial message in `src/services/ai-service.ts`
2. Modify the chat UI components in `src/components/PortfolioChatbot.tsx`
3. Adjust the error messages and loading states as needed

## Troubleshooting
- Ensure your API key is correctly set in the `.env` file
- Check the browser console for any error messages
- Verify that the Gemini API service is available in your region

## Security Notes
- Never commit your API key to version control
- Use environment variables for sensitive information
- Implement rate limiting if needed