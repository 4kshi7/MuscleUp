import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const PROMPT_PREFIX = `Provide health and fitness recommendations based on the following data in depth, points and detailing: `;

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
