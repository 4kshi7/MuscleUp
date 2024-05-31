import { GoogleGenerativeAI } from "@google/generative-ai";

const PROMPT_PREFIX = `Provide health and fitness recommendations based on the following data: `;

async function googleGenerate(apiKey: string, clientData: any) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${PROMPT_PREFIX}${JSON.stringify(clientData, null, 2)}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
}

export async function generateRecommendations(
  clientData: any,
  model = "google",
  apiKey: string
) {
  if (model === "google") {
    const response = await googleGenerate(apiKey, clientData);
    return response;
  }
  return "Model not supported";
}
