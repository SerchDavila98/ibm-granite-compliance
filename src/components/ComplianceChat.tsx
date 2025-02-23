import { useState, useEffect } from "react";
import { MessageSquare, Send } from "lucide-react";

type FileType = "nda" | "contract" | "policy";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Simulated API response types
interface ApiResponse {
  suggestedQuestions: string[];
  answer: string;
  context: string;
}

interface ComplianceChatProps {
  fileType: FileType;
  isAnalyzing?: boolean;
}

const ComplianceChat = ({ fileType, isAnalyzing }: ComplianceChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedQuestions, setDisplayedQuestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestedQuestions = async () => {
      try {
        const response = await fetch(`/api/suggested-questions/${fileType}`);
        const data = await response.json();
        const shuffled = [...data.suggestedQuestions].sort(() => Math.random() - 0.5);
        setDisplayedQuestions(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching suggested questions:", error);
        setDisplayedQuestions([]);
      }
    };

    fetchSuggestedQuestions();
  }, [fileType]);

  const simulateTyping = async (content: string) => {
    setIsTyping(true);
    const typingDuration = content.length * 20 + Math.random() * 500;
    await new Promise(resolve => setTimeout(resolve, typingDuration));
    setIsTyping(false);
    return content;
  };

  const handleSend = async (content: string) => {
    if (!content.trim() || isAnalyzing) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/analyze-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: content,
          fileType,
          messageHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      const aiResponse = await simulateTyping(data.answer);

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse,
      }]);

      // Update suggested questions based on conversation context
      setDisplayedQuestions(data.suggestedQuestions.slice(0, 3));
      
    } catch (error) {
      console.error("Error processing request:", error);
      const errorResponse = await simulateTyping(
        "I apologize, but I'm experiencing technical difficulties. Please try again in a moment."
      );
      
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: errorResponse,
      }]);
    }
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white/50">
      <div className="p-4 border-b bg-neutral-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare size={20} className="text-neutral-600" />
            <h3 className="font-medium text-neutral-900">Compliance Assistant</h3>
          </div>
          {isTyping && (
            <div className="text-sm text-neutral-600">
              AI is typing...
            </div>
          )}
        </div>
      </div>
      <div className="h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-900"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-neutral-100">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="mb-4">
            <p className="text-sm text-neutral-600 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {displayedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSend(question)}
                  disabled={isAnalyzing || isTyping}
                  className="text-sm px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
              placeholder={isAnalyzing ? "Analysis in progress..." : "Ask a question..."}
              disabled={isAnalyzing || isTyping}
              className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={isAnalyzing || isTyping}
              className="p-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChat;
