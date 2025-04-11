import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, ImagePlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import axios from 'axios';
const DocumentChat = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage =async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }

    if (input.trim() === '' && !selectedImage) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
      image: selectedImage
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: selectedImage 
          ? "I received your image! What would you like to know about it?" 
          : "Thanks for your message. How else can I help you?",
        sender: 'bot',
        timestamp: new Date()
      };

      setIsTyping(false);
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current.click();
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-white rounded-xl shadow-md overflow-hidden border">
      {/* Header */}
      <div className="bg-gradient-to-r from-medguard-600 to-medguard-500 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <Bot size={24} className="text-medguard-600" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Simple Chat Bot</h2>
            <p className="text-sm opacity-90">Upload images and chat</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
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
                  {message.sender === 'user' ? 'You' : 'Bot'}
                </span>
                <span className={`text-xs ml-auto ${message.sender === 'user' ? 'text-medguard-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {message.text && <p className="mb-2">{message.text}</p>}
              
              {message.image && (
                <div className="mt-2">
                  <img 
                    src={message.image} 
                    alt="Uploaded by user" 
                    className="max-w-full rounded-lg"
                    style={{ maxHeight: '200px' }}
                  />
                </div>
              )}
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

      {/* Image Preview (if selected) */}
      {selectedImage && (
        <div className="px-4 py-2 border-t bg-medguard-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12 overflow-hidden rounded-md border border-medguard-200">
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm text-gray-600">Image ready to send</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:bg-red-50"
              onClick={removeSelectedImage}
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t p-3 bg-white">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={triggerImageUpload}
            className="text-medguard-600 border-medguard-200 hover:bg-medguard-50"
          >
            <ImagePlus size={18} />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border-medguard-200 focus-visible:ring-medguard-500"
          />
          <Button 
            onClick={handleSendMessage} 
            className="bg-medguard-500 hover:bg-medguard-600 transition-colors"
            disabled={input.trim() === '' && !selectedImage}
          >
            <Send size={18} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This is a simple chat interface for image uploading and messaging.
        </p>
      </div>
    </div>
  );
};

export default DocumentChat;