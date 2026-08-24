import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Google's default production model for new API keys is gemini-3.6-flash
export const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

// Array of candidate model names to try sequentially
export const MODEL_CANDIDATES = [
  DEFAULT_GEMINI_MODEL,
  "gemini-3.6-flash",
  "gemini-2.5-flash",
  "gemini-1.5-flash",
];

export function getGeminiModel(customModel?: string) {
  const modelName = customModel || DEFAULT_GEMINI_MODEL;
  return genAI.getGenerativeModel({
    model: modelName,
  });
}

export async function generateGeminiContent(prompt: string): Promise<string> {
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing in environment variables. Please check your .env.local file."
    );
  }

  let lastError: any = null;

  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text) return text;
    } catch (err: any) {
      lastError = err;
      console.warn(`Model ${modelName} call failed:`, err.message);
    }
  }

  throw new Error(
    lastError?.message ||
      "Google Gemini API call failed. Please check your GEMINI_API_KEY in .env.local."
  );
}
