
import { Phone, PhoneCall, Ambulance } from "lucide-react";

export const EmergencyContacts = () => {
  const contacts = [
    {
      icon: <PhoneCall className="h-5 w-5 text-destructive" />,
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 Support for Mental Health Emergencies"
    },
    {
      icon: <Ambulance className="h-5 w-5 text-red-500" />,
      name: "Emergency Services",
      number: "911",
      description: "Immediate Medical or Safety Assistance"
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      name: "Crisis Text Line",
      number: "741741",
      description: "Text-based Mental Health Support"
    }
  ];

  return (
    <div className="bg-background border rounded-lg p-4 mt-4 space-y-3">
      <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Contacts</h3>
      {contacts.map((contact, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between bg-muted/50 p-3 rounded-md hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {contact.icon}
            <div>
              <p className="font-medium text-foreground">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.description}</p>
            </div>
          </div>
          <div className="font-bold text-lg text-primary">{contact.number}</div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground text-center mt-2">
        If you are experiencing a mental health crisis, please reach out for help.
      </p>
    </div>
  );
};
