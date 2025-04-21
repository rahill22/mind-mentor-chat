
import { MessageCircle } from "lucide-react";

export const ChatHeader = () => {
  return (
    <header className="bg-white border-b py-4 px-6 shadow-sm">
      <div className="container mx-auto max-w-4xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">MindMentor</h1>
            <p className="text-sm text-muted-foreground">Mental Health Support Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-muted-foreground">Online</span>
        </div>
      </div>
    </header>
  );
};
