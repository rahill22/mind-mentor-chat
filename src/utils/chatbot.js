
import { Message } from "@/pages/Index";

const systemPrompt = `You are Dr. MindMentor, a supportive and empathetic AI mental health assistant. Your responses should be:
- Compassionate and understanding
- Professional but warm
- Focused on listening and providing support
- Clear about being an AI assistant who can provide medical advice
- Brief and focused (keep responses to 2-3 sentences when possible)`;

export const setOpenAIApiKey = (apiKey) => {
  localStorage.setItem('OPENAI_API_KEY', apiKey);
};

export const getOpenAIApiKey = () => {
  return localStorage.getItem('OPENAI_API_KEY');
};

export const generateBotResponse = async (userMessage, conversationHistory) => {
  const OPENAI_API_KEY = getOpenAIApiKey();

  if (!OPENAI_API_KEY) {
    return "Please set up your OpenAI API key before continuing.";
  }

  try {
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content
      })),
      { role: "user", content: userMessage }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get response from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error('Error generating response:', error);
    return "I apologize, but I encountered an error generating a response. Please check your API key and try again.";
  }
};
