import { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'instructor' | 'student';
  senderName: string;
  timestamp: Date;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel = ({ isOpen, onClose }: ChatPanelProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bem-vindos à aula! Vocês podem usar este chat para fazer perguntas durante o vídeo.",
      sender: "instructor",
      senderName: "Prof. Ana Silva",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: "2", 
      text: "Professor, poderia explicar melhor a parte sobre relatórios?",
      sender: "student",
      senderName: "João Santos",
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: "3",
      text: "Claro João! Vou abordar isso no próximo módulo, mas basicamente os relatórios são gerados automaticamente pelo sistema.",
      sender: "instructor", 
      senderName: "Prof. Ana Silva",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: "user",
        senderName: "Você",
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Chat da Aula
          </DialogTitle>
        </DialogHeader>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6 min-h-[400px]">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={msg.sender === 'instructor' ? "/instructor-avatar.jpg" : "/student-avatar.jpg"} 
                  />
                  <AvatarFallback className={`text-xs ${
                    msg.sender === 'instructor' 
                      ? 'bg-primary text-primary-foreground' 
                      : msg.sender === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {msg.senderName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {msg.senderName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto max-w-[80%]'
                      : msg.sender === 'instructor'
                      ? 'bg-accent/10 text-foreground border border-accent/20'
                      : 'bg-muted text-foreground'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button 
              onClick={sendMessage}
              size="icon"
              className="bg-primary hover:bg-primary/90"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Pressione Enter para enviar
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatPanel;