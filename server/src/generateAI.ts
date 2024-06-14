import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const PROMPT_PREFIX = `Write a detailed analysis on these factors to achieve desired goals for a person living in India, define suitable workout split and diet plan in proper points and styling in html `;

async function googleGenerate(apiKey: string, clientData: any) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${PROMPT_PREFIX}${JSON.stringify(clientData, null, 2)}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
}

async function groqGenerate(apiKey: string, clientData: any) {
  const groq = new Groq({ apiKey });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `${PROMPT_PREFIX}${JSON.stringify(clientData, null, 2)}`,
      },
    ],
    model: "mixtral-8x7b-32768",
  });

  return chatCompletion.choices[0].message.content;
}

async function handleChat(apiKey: string, message: string) {
  const groq = new Groq({ apiKey });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "mixtral-8x7b-32768",
  });

  return chatCompletion.choices[0].message.content;
}

export async function generateRecommendations(
  clientData: any,
  model: string,
  apiKey: string
) {
  if (model === "google") {
    const response = await googleGenerate(apiKey, clientData);
    return response;
  }
  if (model === "groq") {
    const response = await groqGenerate(apiKey, clientData);
    return response;
  }
  return "Model not supported";
}

export async function handleChatMessage(apiKey: string, message: string) {
  const isRelatedToGym = /gym|exercise|workout|health|diet|nutrition|hi|hello/i.test(
    message
  );

  if (!isRelatedToGym) {
    return "I am sorry, I can only help you with queries related to gym, exercise, or health. Please ask a relevant question.";
  }

  const response = await handleChat(apiKey, message);
  return response;
}

export function getInitialGreeting() {
  return "Hello! How can I assist you with your gym, exercise, or diet queries today?";
}
