import Groq from "groq-sdk";

const PROMPT_PREFIX = `You are a professional gym trainer. Analyze the following factors to achieve the desired goals for a person based on their gender living in India. Provide a detailed workout split and a diet plan with nutritional details, formatted in HTML using appropriate tags such as <h1>, <h2>, <ul>, and <li>. Ensure the response is neatly structured with clear headings, bullet points, and a suggestion at the end.

Factors to consider:
1. Age
2. Height, Weight & Gender
3. Experience
4. Schedule
5. Hours
6. Goal
7. Diet

The diet plan should include nutritional details such as calories, protein, carbohydrates, and fats.

Please provide the response in HTML format.
`;

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
  if (model === "groq") {
    const response = await groqGenerate(apiKey, clientData);
    return response;
  }
  return "Model not supported";
}

export async function handleChatMessage(apiKey: string, message: string) {
  const isRelatedToGym =
    /gym|exercise|workout|health|diet|nutrition|hi|hello/i.test(message);

  if (!isRelatedToGym) {
    return "I am sorry, I can only help you with queries related to gym, exercise, or health. Please ask a relevant question.";
  }

  const response = await handleChat(apiKey, message);
  return response;
}

export function getInitialGreeting() {
  return "Hello! How can I assist you with your gym, exercise, or diet queries today?";
}
