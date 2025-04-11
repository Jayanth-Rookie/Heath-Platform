import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Search, Calendar, FileText, Clock, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const DocumentChat = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your document assistant. You can ask me about your medical records or chat with a doctor.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  // Sample documents for quick access
  const recentDocuments = [
    { id: 1, title: "Blood Test Results", date: "March 15, 2025", type: "Lab Report" },
    { id: 2, title: "Annual Physical", date: "January 22, 2025", type: "Visit Summary" },
    { id: 3, title: "Vaccination Record", date: "February 8, 2025", type: "Immunization" }
  ];

  // Upcoming appointments
  const appointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "April 10, 2025", time: "2:00 PM" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "General Practice", date: "May 5, 2025", time: "10:30 AM" }
  ];

  // Quick suggestion chips
  const suggestionChips = [
    "View recent lab results",
    "Book an appointment",
    "Check my medications",
    "Update my insurance"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowSuggestions(false);

    setTimeout(() => {
      let botResponse = "";
      let attachments = [];

      if (input.toLowerCase().includes("blood test") || input.toLowerCase().includes("lab results")) {
        botResponse = "I found your latest blood test from March 15, 2025:";
        attachments = [
          {
            type: "lab-report",
            title: "Comprehensive Metabolic Panel",
            date: "March 15, 2025",
            data: {
              "Cholesterol": { value: "210 mg/dL", status: "elevated", normal: "< 200 mg/dL" },
              "HDL": { value: "55 mg/dL", status: "normal", normal: "> 40 mg/dL" },
              "LDL": { value: "130 mg/dL", status: "elevated", normal: "< 100 mg/dL" },
              "Triglycerides": { value: "140 mg/dL", status: "normal", normal: "< 150 mg/dL" }
            }
          }
        ];
      } else if (input.toLowerCase().includes("doctor") || input.toLowerCase().includes("appointment")) {
        botResponse = "I can help you book an appointment. Here are some available slots:";
        attachments = [
          {
            type: "appointment-options",
            slots: [
              { doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "April 10, 2025", time: "2:00 PM" },
              { doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "April 12, 2025", time: "10:30 AM" },
              { doctor: "Dr. Michael Chen", specialty: "General Practice", date: "April 9, 2025", time: "3:15 PM" }
            ]
          }
        ];
      } else if (input.toLowerCase().includes("medication") || input.toLowerCase().includes("prescription")) {
        botResponse = "Here are your current medications:";
        attachments = [
          {
            type: "medication-list",
            medications: [
              { name: "Lisinopril 10mg", instructions: "Take once daily", refillDate: "March 30, 2025", pharmacy: "Central Pharmacy" },
              { name: "Atorvastatin 20mg", instructions: "Take once daily at bedtime", refillDate: "April 15, 2025", pharmacy: "Central Pharmacy" }
            ]
          }
        ];
      } else {
        botResponse = "I'm your healthcare assistant. I can help you find documents, book appointments, or answer questions about your health records. What would you like to do?";
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        attachments: attachments
      };

      setIsTyping(false);
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderAttachment = (attachment) => {
    switch (attachment.type) {
      case 'lab-report':
        return (
          <Card className="mt-2 p-3 max-w-full">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-medguard-700">{attachment.title}</h4>
              <Badge variant="outline" className="bg-medguard-50">{attachment.date}</Badge>
            </div>
            <div className="divide-y">
              {Object.entries(attachment.data).map(([test, details]) => (
                <div key={test} className="py-2 flex justify-between">
                  <span>{test}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${details.status === 'elevated' ? 'text-red-500' : 'text-green-600'}`}>
                      {details.value}
                    </span>
                    <span className="text-xs text-gray-500">({details.normal})</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Button variant="outline" size="sm" className="text-xs">View Full Report</Button>
            </div>
          </Card>
        );
      
      case 'appointment-options':
        return (
          <Card className="mt-2 p-3">
            <h4 className="font-medium text-medguard-700 mb-2">Available Appointments</h4>
            <div className="space-y-2">
              {attachment.slots.map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 border rounded hover:bg-medguard-50 cursor-pointer transition-colors">
                  <div>
                    <div className="font-medium">{slot.doctor}</div>
                    <div className="text-sm text-gray-600">{slot.specialty}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-medguard-600">
                      <Calendar size={14} />
                      <span>{slot.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <Clock size={14} />
                      <span>{slot.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Button size="sm" className="bg-medguard-500 hover:bg-medguard-600 text-white">Book Appointment</Button>
            </div>
          </Card>
        );
      
      case 'medication-list':
        return (
          <Card className="mt-2 p-3">
            <h4 className="font-medium text-medguard-700 mb-2">Current Medications</h4>
            <div className="divide-y">
              {attachment.medications.map((med, idx) => (
                <div key={idx} className="py-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{med.name}</span>
                    <Badge variant="outline" className={med.refillDate < new Date().toISOString().split('T')[0] ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}>
                      Refill: {med.refillDate}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{med.instructions}</div>
                  <div className="text-sm text-gray-500 mt-1">Pharmacy: {med.pharmacy}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between">
              <Button variant="outline" size="sm">Refill All</Button>
              <Button size="sm" className="bg-medguard-500 hover:bg-medguard-600 text-white">Request Changes</Button>
            </div>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-white rounded-xl shadow-md overflow-hidden border">
      <div className="bg-gradient-to-r from-medguard-600 to-medguard-500 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <Bot size={24} className="text-medguard-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">MedGuard Assistant</h2>
              <p className="text-sm opacity-90">Your personal healthcare companion</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="bg-medguard-50 border-b">
          <TabsList className="w-full justify-start px-4 py-2 flex gap-2">
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-white rounded-b-none px-4 py-2 shadow-sm"
            >
              <Bot size={16} className="mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-white rounded-b-none px-4 py-2 shadow-sm"
            >
              <FileText size={16} className="mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="data-[state=active]:bg-white rounded-b-none px-4 py-2 shadow-sm"
            >
              <Calendar size={16} className="mr-2" />
              Appointments
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0 p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-medguard-500 to-medguard-600 text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.sender === 'user' ? (
                      <Avatar className="h-6 w-6 bg-medguard-300 text-white">
                        <User size={14} />
                      </Avatar>
                    ) : (
                      <Avatar className="h-6 w-6 bg-medguard-100 text-medguard-600">
                        <Bot size={14} />
                      </Avatar>
                    )}
                    <span className={`text-xs ${message.sender === 'user' ? 'text-medguard-100' : 'text-gray-500'}`}>
                      {message.sender === 'user' ? 'You' : 'MedGuard Assistant'}
                    </span>
                    <span className={`text-xs ml-auto ${message.sender === 'user' ? 'text-medguard-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="mb-2">{message.text}</p>
                  
                  {message.attachments && message.attachments.map((attachment, idx) => (
                    <div key={idx}>
                      {renderAttachment(attachment)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-xl rounded-tl-none p-3 shadow-sm max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 bg-medguard-100 text-medguard-600">
                      <Bot size={14} />
                    </Avatar>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-medguard-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-medguard-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-medguard-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {showSuggestions && messages.length < 3 && (
            <div className="px-4 py-3 border-t flex gap-2 overflow-x-auto">
              {suggestionChips.map((suggestion, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="sm" 
                  className="whitespace-nowrap bg-medguard-50 hover:bg-medguard-100 text-medguard-700 border-medguard-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          <div className="border-t p-3 bg-white">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your health records or type a command..."
                className="flex-1 border-medguard-200 focus-visible:ring-medguard-500"
              />
              <Button 
                onClick={handleSendMessage} 
                className="bg-medguard-500 hover:bg-medguard-600 transition-colors"
                disabled={input.trim() === ''}
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Your chat is private and secure. Medical advice should be confirmed with a healthcare professional.
            </p>
          </div>
        </TabsContent>

        {/* DOCUMENTS TAB - Fixed to properly fill space with no gaps */}
        <TabsContent value="documents" className="flex-1 m-0 p-0 overflow-hidden">
  <div className="flex flex-col h-full bg-white">
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-medguard-700">Recent Documents</h3>
        <p className="text-sm text-gray-500">Access your recent medical records</p>
      </div>
      
      <div className="grid gap-3">
        {recentDocuments.map(doc => (
          <Card key={doc.id} className="p-3 hover:bg-medguard-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-medguard-100 p-2 rounded">
                <FileText size={20} className="text-medguard-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-medguard-700">{doc.title}</h4>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span>{doc.date}</span>
                  <span>•</span>
                  <span>{doc.type}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-medguard-600">
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
    
    <div className="p-4 border-t bg-white">
      <Button variant="outline" className="w-full text-medguard-600 border-medguard-200">
        View All Documents
      </Button>
    </div>
  </div>
</TabsContent>

        {/* APPOINTMENTS TAB - Fixed to properly fill space with no gaps */}
        <TabsContent value="appointments" className="flex-1 m-0 p-0 overflow-auto">
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-medguard-700">Upcoming Appointments</h3>
                <p className="text-sm text-gray-500">View and manage your scheduled visits</p>
              </div>
              
              <div className="space-y-3">
                {appointments.map(apt => (
                  <Card key={apt.id} className="p-3">
                    <div className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-medguard-100 p-2 rounded-full mt-1">
                          <Calendar size={20} className="text-medguard-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-medguard-700">{apt.doctor}</h4>
                          <p className="text-sm text-gray-600">{apt.specialty}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1 text-gray-700">
                              <Calendar size={14} />
                              <span>{apt.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-700">
                              <Clock size={14} />
                              <span>{apt.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 mb-2">
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                        <Button variant="outline" size="sm" className="text-medguard-600 block">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t bg-white mt-auto">
              <Button className="w-full bg-medguard-500 hover:bg-medguard-600 text-white">
                Book New Appointment
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentChat;