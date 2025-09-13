import { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

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
  const [messages, setMessages] = useState<Message[]>([]);

  const n8nWebhookUrl = "https://victor-hugo-automa.app.n8n.cloud/webhook/45a65bab-002b-4791-95f2-8adb9c976fb4";

  const sendMessage = async () => {
    if (message.trim()) {
      // 1. Adiciona a mensagem do usuário ao estado para exibição imediata
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: "user",
        senderName: "Você",
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, userMessage]);
      setMessage("");
      
      try {
        // 2. Envia a mensagem para o webhook do n8n
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            course: "Nome do Curso", // Mantenha ou ajuste este campo conforme necessário
            text: userMessage.text
          }),
        });

        if (!response.ok) {
          throw new Error('Falha na resposta da IA');
        }

			// 3. Recebe a resposta da IA e a adiciona ao estado do chat
			const aiResponse = await response.json();
			const aiMessage: Message = {
				id: Date.now().toString() + "-ai",
				text: aiResponse.output || aiResponse.text || "Desculpe, não consegui entender.",
				sender: "instructor",
				senderName: "Assistente IA",
				timestamp: new Date(),
			};

			setMessages(prevMessages => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Erro ao comunicar com a IA:", error);
        // Adiciona uma mensagem de erro ao chat para o usuário
        const errorMessage: Message = {
          id: Date.now().toString() + "-error",
          text: "Desculpe, ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
          sender: "instructor",
          senderName: "Assistente IA",
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }
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
			<DialogContent
				className="w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] flex flex-col p-0 rounded-2xl shadow-2xl border border-border bg-background"
				style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
			>
				<DialogHeader className="px-4 sm:px-6 py-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-2xl">
					<DialogTitle className="flex items-center gap-2 text-lg sm:text-xl font-bold text-primary">
						<MessageCircle className="h-5 w-5 text-primary" />
						Chat da Aula
					</DialogTitle>
				</DialogHeader>

				{/* Messages Area */}
				<ScrollArea className="flex-1 px-2 sm:px-6 py-4 min-h-[300px] sm:min-h-[400px] overflow-y-auto">
					<div className="space-y-4">
						{messages.map((msg) => (
							<div
								key={msg.id}
								className={`flex gap-3 items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
							>
								{msg.sender !== 'user' && (
									<Avatar className="h-8 w-8 shrink-0">
										<AvatarImage
											src={msg.sender === 'instructor' ? "/instructor-avatar.jpg" : "/student-avatar.jpg"}
										/>
										<AvatarFallback className={`text-xs ${
											msg.sender === 'instructor'
												? 'bg-primary text-primary-foreground'
												: 'bg-secondary text-secondary-foreground'
										}`}>
											{msg.senderName.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								)}
								<div className="flex-1 space-y-1 max-w-[80%]">
									<div className={`flex items-center gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
										<span className={`text-sm font-medium ${msg.sender === 'user' ? 'text-primary' : 'text-foreground'}`}>{msg.senderName}</span>
										<span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
									</div>
									<div
															className={`p-3 rounded-xl text-sm break-words shadow-sm ${
																msg.sender === 'user'
																	? 'bg-primary text-primary-foreground ml-auto'
																	: msg.sender === 'instructor'
																	? 'bg-accent/10 text-foreground border border-accent/20'
																	: 'bg-muted text-foreground'
															}`}
														>
															{msg.sender === 'instructor' ? (
																<ReactMarkdown>{msg.text}</ReactMarkdown>
															) : (
																msg.text
															)}
														</div>
								</div>
								{msg.sender === 'user' && (
									<Avatar className="h-8 w-8 shrink-0">
										<AvatarImage src="/student-avatar.jpg" />
										<AvatarFallback className="text-xs bg-accent text-accent-foreground">
											{msg.senderName.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								)}
							</div>
						))}
					</div>
				</ScrollArea>

				{/* Message Input */}
				<div className="px-2 sm:px-6 py-4 border-t border-border bg-background rounded-b-2xl">
					<form
						className="flex gap-2"
						onSubmit={e => {
							e.preventDefault();
							sendMessage();
						}}
					>
						<Input
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Digite sua mensagem..."
							className="flex-1 text-base px-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/30"
							style={{ minHeight: "44px" }}
						/>
						<Button
							type="submit"
							size="icon"
							className="bg-primary hover:bg-primary/90 rounded-xl shadow-md"
							disabled={!message.trim()}
							aria-label="Enviar mensagem"
						>
							<Send className="h-5 w-5" />
						</Button>
					</form>
					<p className="text-xs text-muted-foreground mt-2 text-center">
						Pressione <span className="font-semibold">Enter</span> para enviar
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ChatPanel;