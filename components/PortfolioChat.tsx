
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Minimize2 } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, Project } from '../types';

interface PortfolioChatProps {
  projects: Project[];
}

const PortfolioChat: React.FC<PortfolioChatProps> = ({ projects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am Arham\'s AI assistant. Ask me anything about his work, skills, or experience!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Pass projects to gemini service or it will use static ones from constants
    const response = await getGeminiResponse(userMessage, messages);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[90vw] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-slate-900 p-5 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-500 p-2 rounded-xl">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Portfolio Assistant</h3>
                <p className="text-[10px] text-slate-400">Powered by Gemini AI</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <Minimize2 size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex items-start space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-white border border-slate-200'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-slate-700 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input 
                type="text"
                placeholder="Ask Arham's AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-slate-100 border-none rounded-2xl py-3 px-5 pr-12 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 text-white rounded-xl disabled:bg-slate-300 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-indigo-600 hover:scale-110 transition-all group"
        >
          <div className="relative">
            <MessageSquare size={28} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full border-2 border-slate-900 group-hover:border-indigo-600"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default PortfolioChat;
