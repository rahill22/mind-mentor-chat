
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOpenAiKey, setOpenAiKey } from "@/utils/chatbot";

export const ApiKeyInput = () => {
  const [key, setKey] = useState(getOpenAiKey() || "");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenAiKey(key);
    setIsVisible(false);
  };

  return (
    <div className="bg-background border rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-foreground mb-2">OpenAI API Key</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex space-x-2">
          <Input
            type={isVisible ? "text" : "password"}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? "Hide" : "Show"}
          </Button>
        </div>
        <Button type="submit" className="w-full">
          Save API Key
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-2">
        Your API key is stored locally in your browser and never sent to our servers.
      </p>
    </div>
  );
};
