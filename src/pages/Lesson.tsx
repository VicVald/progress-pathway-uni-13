import { useState } from "react";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import ChatPanel from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";

const Lesson = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Arrow - Top Right */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <main className="h-[calc(100vh-80px)]">
        {/* Video Player Section */}
        <div className="h-full flex flex-col">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Introdução ao Sistema de Gestão
            </h1>
            <p className="text-muted-foreground mb-4">
              Módulo 1 - Conceitos Básicos
            </p>
          </div>
          
          <div className="flex-1 px-4 pb-4">
            <VideoPlayer />
          </div>
        </div>

        {/* Chat Panel Modal */}
        <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* Chat Button - Fixed position */}
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </main>
    </div>
  );
};

export default Lesson;