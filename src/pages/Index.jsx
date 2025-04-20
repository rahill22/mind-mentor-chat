
import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { EmergencyContacts } from "@/components/EmergencyContacts";
import { generateBotResponse, setOpenAIApiKey, getOpenAIApiKey } from "@/utils/chatbot";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define and export the Message type
export const Message = {
  id: "",
  content: "",
  sender: "",
  timestamp: new Date()
};

const Index = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content: "Hello, I'm Dr. MindMentor, an AI assistant designed to provide mental health support. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(!getOpenAIApiKey());
  const [apiKeyInput, setApiKeyInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleApiKeySave = () => {
    setOpenAIApiKey(apiKeyInput.trim());
    setIsApiKeyModalOpen(false);
  };

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;
    if (!getOpenAIApiKey()) {
      setIsApiKeyModalOpen(true);
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(async () => {
      const botResponse = await generateBotResponse(content, messages);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ChatHeader />
      
      <main className="flex-1 container mx-auto max-w-4xl p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white shadow-sm p-4 chat-container">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-lg">👨‍⚕️</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
        <EmergencyContacts />
      </main>

      <Dialog open={isApiKeyModalOpen} onOpenChange={setIsApiKeyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OpenAI API Key Required</DialogTitle>
            <DialogDescription>
              Please enter your OpenAI API key to use the chatbot.
            </DialogDescription>
          </DialogHeader>
          <Input 
            placeholder="Enter your OpenAI API key" 
            value={apiKeyInput} 
            onChange={(e) => setApiKeyInput(e.target.value)} 
          />
          <DialogFooter>
            <Button onClick={handleApiKeySave} disabled={!apiKeyInput.trim()}>
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
