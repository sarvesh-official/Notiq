import { GoogleGenerativeAI } from "@google/generative-ai";

export const initGemini = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
  
  if (!apiKey) {
    throw new Error("Gemini API key not provided");
  }
  
  return new GoogleGenerativeAI(apiKey);
};

export const summarizeNote = async (content: string) => {
  try {
    const genAI = initGemini();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `Please summarize the following note content in 2-3 sentences, highlighting the key points:
    
    ${content}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error summarizing note:", error);
    throw new Error("Failed to summarize note");
  }
};