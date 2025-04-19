
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const Disclaimer = () => {
  return (
    <Alert className="mt-6 bg-white border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-500">Important Disclaimer</AlertTitle>
      <AlertDescription className="text-sm text-muted-foreground">
        This is a simulated conversation with an AI assistant. It is not a substitute for professional 
        medical advice, diagnosis, or treatment. Always seek the advice of your physician or other 
        qualified health provider with any questions you may have regarding a medical condition.
        If you're experiencing a medical emergency, please call your local emergency services immediately.
      </AlertDescription>
    </Alert>
  );
};
