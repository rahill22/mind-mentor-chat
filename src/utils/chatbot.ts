
import { Message } from "@/pages/Index";

// Response templates for different types of mental health concerns
const responseTemplates = {
  anxiety: [
    "It sounds like you might be experiencing some anxiety. This is a common feeling that many people face. Can you tell me more about what triggers these feelings for you?",
    "Anxiety can manifest in both physical and emotional symptoms. Have you noticed any patterns in when these feelings arise?",
    "Some people find that deep breathing exercises can help manage anxiety in the moment. Would you like me to suggest some techniques you could try?",
    "It's important to acknowledge that anxiety is a normal human response, though it can become overwhelming. How long have you been experiencing these feelings?"
  ],
  
  depression: [
    "I'm hearing that you might be experiencing some symptoms of depression. Thank you for sharing that with me. How long have you been feeling this way?",
    "Depression can affect various aspects of life including sleep, appetite, and energy levels. Have you noticed changes in any of these areas?",
    "Small steps can sometimes help when dealing with depression. Setting tiny, achievable goals each day might be a place to start. What's one small thing you could do today?",
    "Connection with others can be important when feeling depressed, though it can also be one of the hardest things to do. Is there someone in your life you feel comfortable reaching out to?"
  ],
  
  stress: [
    "Managing stress effectively is important for both mental and physical health. What strategies have you tried in the past to help with stress?",
    "Stress can be particularly challenging when it feels constant. Are there specific situations or times when you feel more stressed?",
    "Sometimes adjusting our perspective on stressors can help manage them better. Would it be helpful to explore different ways of thinking about your current situation?",
    "Creating boundaries and taking time for self-care are important aspects of stress management. How do you currently make time for yourself?"
  ],
  
  sleep: [
    "Sleep difficulties can have a significant impact on mental health. Can you tell me more about the problems you're experiencing with sleep?",
    "Establishing a consistent sleep routine can sometimes help improve sleep quality. What does your current bedtime routine look like?",
    "There are several relaxation techniques that people find helpful for sleep. Would you like to discuss some options that might work for you?",
    "The environment we sleep in can affect our quality of sleep. Have you considered making any adjustments to your sleep environment?"
  ],
  
  general: [
    "Thank you for sharing that with me. How long have you been feeling this way?",
    "It sounds like you're going through a challenging time. What kinds of things have helped you cope with difficulties in the past?",
    "Taking care of our mental health is just as important as our physical health. Have you been able to make time for self-care activities that you enjoy?",
    "Sometimes talking to someone about our feelings can help provide perspective. Do you have people in your life you feel comfortable opening up to?",
    "I appreciate you trusting me with these feelings. Would it be helpful to explore some coping strategies together?"
  ]
};

// Keywords to help identify the type of concern
const keywordCategories = {
  anxiety: ["anxious", "anxiety", "worry", "panic", "stressed", "nervous", "fear", "overwhelm"],
  depression: ["depress", "sad", "hopeless", "unmotivated", "tired", "exhausted", "empty", "worthless"],
  stress: ["stress", "overwhelm", "pressure", "burnout", "work", "deadline", "tension"],
  sleep: ["sleep", "insomnia", "tired", "fatigue", "dream", "nightmare", "awake", "rest"]
};

// Function to identify the likely category based on user message
const identifyCategory = (message: string): keyof typeof responseTemplates => {
  const lowerMessage = message.toLowerCase();
  
  for (const [category, keywords] of Object.entries(keywordCategories)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return category as keyof typeof responseTemplates;
    }
  }
  
  return "general";
};

// Main function to generate bot responses
export const generateBotResponse = async (
  userMessage: string, 
  conversationHistory: Message[]
): Promise<string> => {
  // Identify the category of concern
  const category = identifyCategory(userMessage);
  
  // Select a random response from the appropriate category
  const responses = responseTemplates[category];
  let response = responses[Math.floor(Math.random() * responses.length)];
  
  // Add personalized elements if this isn't the first exchange
  if (conversationHistory.length > 2) {
    const userMessages = conversationHistory.filter(msg => msg.sender === "user");
    
    // If user has sent multiple messages, occasionally reference previous conversation
    if (userMessages.length > 1 && Math.random() > 0.7) {
      response = `Based on what you've shared so far, ${response.toLowerCase()}`;
    }
    
    // Add therapeutic acknowledgment occasionally
    if (Math.random() > 0.5) {
      const acknowledgments = [
        "I appreciate you sharing that with me. ",
        "Thank you for being open about this. ",
        "It takes courage to discuss these feelings. "
      ];
      const acknowledgment = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
      response = acknowledgment + response;
    }
  }
  
  // Occasionally add a reminder about the chatbot's limitations
  if (Math.random() > 0.9) {
    response += " Remember, I'm here to support you, but connecting with a mental health professional can provide more personalized guidance.";
  }
  
  return response;
};
