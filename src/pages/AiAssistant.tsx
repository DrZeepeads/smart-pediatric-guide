
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Send, Bot, User, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AiAssistant = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to auth page if not logged in
  if (!user) {
    navigate("/auth");
    return null;
  }

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a message",
      });
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('query-nelson', {
        body: { query: userMessage.content }
      });
      
      if (error) throw error;
      
      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer || "I couldn't find information about that in my knowledge base.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to get a response",
      });
      console.error("AI Assistant error:", error);
    } finally {
      setLoading(false);
      // Focus back on input
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex flex-col p-4 md:p-8 container max-w-5xl mx-auto">
        <div className="pb-4 border-b">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Nelson AI Assistant
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help ml-2" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Ask questions about pediatric medicine based on Nelson's textbook</p>
              </TooltipContent>
            </Tooltip>
          </h1>
        </div>
        
        <Card className="mt-4 flex-grow flex flex-col rounded-xl shadow-md border overflow-hidden">
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4 pb-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium">Nelson AI Assistant</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Ask me questions about pediatric medicine based on Nelson's Pediatrics textbook
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 w-full max-w-lg">
                    {[
                      "What are the signs of meningitis in infants?",
                      "How do you treat acute otitis media?",
                      "What are common causes of failure to thrive?",
                      "What's the management of RSV bronchiolitis?"
                    ].map((suggestion) => (
                      <Button 
                        key={suggestion} 
                        variant="outline" 
                        className="justify-start h-auto py-2 px-3 text-left"
                        onClick={() => {
                          setQuery(suggestion);
                          setTimeout(() => inputRef.current?.focus(), 50);
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 rounded-lg",
                      message.role === "assistant" 
                        ? "bg-secondary/50"
                        : "bg-accent/30"
                    )}
                  >
                    <div className="shrink-0 mt-0.5">
                      {message.role === "assistant" ? (
                        <Bot className="h-6 w-6 text-primary" />
                      ) : (
                        <User className="h-6 w-6 text-accent-foreground" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="mb-1 flex items-center">
                        <span className="font-medium">
                          {message.role === "assistant" ? "Nelson AI" : "You"}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <Separator />
          
          <CardContent className="p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Ask a question about pediatric medicine..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-2 text-xs text-center text-muted-foreground">
              Responses are generated from Nelson's Pediatrics textbook data using Google's Gemini AI
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AiAssistant;
