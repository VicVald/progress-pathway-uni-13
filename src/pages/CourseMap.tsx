import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Lock, CheckCircle, Play, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface CourseModule {
  id: string;
  title: string;
  status: 'locked' | 'available' | 'completed';
  position: { x: number; y: number };
  type: 'lesson' | 'quiz' | 'project';
  stars?: number;
}

const courseModules: CourseModule[] = [
  { id: '1', title: 'Introdução a LGPD', status: 'completed', position: { x: 10, y: 50 }, type: 'lesson', stars: 3 },
  { id: '2', title: 'O que são dados pessoais', status: 'completed', position: { x: 20, y: 30 }, type: 'lesson', stars: 2 },
  { id: '3', title: 'Dados sensíveis', status: 'completed', position: { x: 30, y: 70 }, type: 'lesson', stars: 3 },
  { id: '4', title: 'Direito dos titulares', status: 'available', position: { x: 40, y: 45 }, type: 'lesson' },
  { id: '5', title: 'Bases legais de tratamento', status: 'locked', position: { x: 50, y: 25 }, type: 'lesson' },
  { id: '6', title: 'Deveres das empresas', status: 'locked', position: { x: 60, y: 60 }, type: 'lesson' },
  { id: '7', title: 'Penalidades e riscos', status: 'locked', position: { x: 70, y: 35 }, type: 'lesson' },
  { id: '8', title: 'Benefícios da conformidade', status: 'locked', position: { x: 80, y: 55 }, type: 'lesson' },
  { id: '9', title: 'Avaliação Final', status: 'locked', position: { x: 90, y: 40 }, type: 'project' },
];

const CourseMap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Drag functionality
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - scrollPosition.x, y: e.clientY - scrollPosition.y });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      if (isMobile) {
        setScrollPosition({ x: scrollPosition.x, y: Math.min(0, Math.max(-1000, newY)) });
      } else {
        setScrollPosition({ x: Math.min(0, Math.max(-1200, newX)), y: scrollPosition.y });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - scrollPosition.x, y: touch.clientY - scrollPosition.y });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      
      if (isMobile) {
        setScrollPosition({ x: scrollPosition.x, y: Math.min(0, Math.max(-1000, newY)) });
      } else {
        setScrollPosition({ x: Math.min(0, Math.max(-1200, newX)), y: scrollPosition.y });
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart, scrollPosition, isMobile]);

  const handleModuleClick = (moduleId: string, status: string) => {
    if (status === 'available' || status === 'completed') {
      navigate(`/aula/${moduleId}`);
    }
  };

  const getModuleStatus = (index: number) => {
    if (index <= 2) return 'completed'; // First 3 modules completed
    if (index === 3) return 'available'; // Next available module
    return 'locked'; // Rest locked
  };

  const getModuleIcon = (type: string, status: string) => {
    if (status === 'completed') return <CheckCircle className="h-5 w-5" />;
    if (status === 'locked') return <Lock className="h-4 w-4" />;
    
    switch (type) {
      case 'quiz': return <Star className="h-4 w-4" />;
      case 'project': return <Star className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const getModuleColor = (type: string, status: string) => {
    if (status === 'completed') return 'bg-success hover:bg-success/90 border-success/20 shadow-lg shadow-success/20';
    if (status === 'locked') return 'bg-muted hover:bg-muted/90 border-muted-foreground/20';
    
    if (type === 'project' && status === 'available') return 'bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 border-yellow-300 shadow-lg shadow-yellow-500/30';
    
    switch (type) {
      case 'quiz': return 'bg-accent hover:bg-accent/90 border-accent/20 shadow-lg shadow-accent/20';
      case 'project': return 'bg-primary hover:bg-primary/90 border-primary/20 shadow-lg shadow-primary/20';
      default: return 'bg-info hover:bg-info/90 border-info/20 shadow-lg shadow-info/20';
    }
  };

  const completedModules = courseModules.filter(m => m.status === 'completed').length;
  const totalStars = courseModules.filter(m => m.status === 'completed').reduce((acc, m) => acc + (m.stars || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-center flex-1">
          <h1 className="text-lg font-bold">
            O que é a Lei Geral de Proteção de Dados
          </h1>
          <p className="text-sm opacity-90">
            LGPD - Curso Completo
          </p>
        </div>
        
        {/* Progress Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-semibold">{totalStars}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
            <Target className="h-4 w-4" />
            <span className="text-sm font-semibold">{completedModules}/{courseModules.length}</span>
          </div>
        </div>
      </header>

      {/* Course Map */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height: 'calc(100vh - 100px)' }}
      >
        <div
          ref={mapRef}
          className="relative transition-transform duration-200 ease-out"
          style={{
            width: isMobile ? '100%' : '200vw',
            height: isMobile ? '200vh' : '100%',
            transform: `translate(${scrollPosition.x}px, ${scrollPosition.y}px)`,
            background: isMobile 
              ? `linear-gradient(180deg, 
                  hsl(var(--primary) / 0.05) 0%, 
                  hsl(var(--background)) 15%, 
                  hsl(var(--accent) / 0.03) 30%,
                  hsl(var(--background)) 45%,
                  hsl(var(--primary) / 0.02) 60%,
                  hsl(var(--background)) 75%,
                  hsl(var(--accent) / 0.05) 90%,
                  hsl(var(--background)) 100%)`
              : `linear-gradient(90deg, 
                  hsl(var(--primary) / 0.05) 0%, 
                  hsl(var(--background)) 15%, 
                  hsl(var(--accent) / 0.03) 30%,
                  hsl(var(--background)) 45%,
                  hsl(var(--primary) / 0.02) 60%,
                  hsl(var(--background)) 75%,
                  hsl(var(--accent) / 0.05) 90%,
                  hsl(var(--background)) 100%)`
          }}
        >
          {/* Animated Road Path */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {/* Main road */}
              <path
                d={isMobile 
                  ? "M 50 5 Q 30 15 50 25 Q 70 35 50 45 Q 30 55 50 65 Q 70 75 50 85 Q 30 95 50 105"
                  : "M 5 50 Q 15 30 25 50 Q 35 70 45 50 Q 55 30 65 50 Q 75 70 85 50 Q 95 30 105 50"
                }
                stroke="hsl(var(--primary) / 0.2)"
                strokeWidth="4"
                fill="none"
                className="drop-shadow-sm"
              />
              {/* Road decoration dots */}
              <path
                d={isMobile 
                  ? "M 50 5 Q 30 15 50 25 Q 70 35 50 45 Q 30 55 50 65 Q 70 75 50 85 Q 30 95 50 105"
                  : "M 5 50 Q 15 30 25 50 Q 35 70 45 50 Q 55 30 65 50 Q 75 70 85 50 Q 95 30 105 50"
                }
                stroke="hsl(var(--primary) / 0.4)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4,8"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Course Modules */}
          {courseModules.map((module, index) => {
            const actualStatus = getModuleStatus(index);
            const updatedModule = { ...module, status: actualStatus };
            const isActive = actualStatus === 'available';
            return (
              <div
                key={module.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                  left: isMobile ? '50%' : `${module.position.x}%`,
                  top: isMobile ? `${(index + 1) * 13}%` : `${module.position.y}%`,
                }}
              >
                {/* Module Node */}
                <div className="relative group flex flex-col items-center">
                  <Button
                    onClick={() => handleModuleClick(module.id, actualStatus)}
                    disabled={actualStatus === 'locked'}
                    className={`relative z-10 h-16 w-16 rounded-full shadow-xl border-4 border-background 
                      ${getModuleColor(module.type, actualStatus)} text-white transition-all duration-300
                      ${module.type === 'project' ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-background' : ''}
                      ${actualStatus !== 'locked' ? 'hover:scale-110 hover:-translate-y-1' : 'opacity-60'}
                      disabled:cursor-not-allowed`}
                  >
                    <div className="flex flex-col items-center">
                      {getModuleIcon(module.type, actualStatus)}
                      {actualStatus === 'completed' && module.stars && (
                        <div className="flex mt-1">
                          {Array.from({ length: module.stars }).map((_, i) => (
                            <Star key={i} className="h-2 w-2 fill-yellow-300 text-yellow-300" />
                          ))}
                        </div>
                      )}
                    </div>
                  </Button>
                  
                  {/* Module Name */}
                  <div className="mt-2 text-center max-w-[120px]">
                    <h3 className="text-xs font-semibold text-foreground leading-tight">
                      {module.title}
                    </h3>
                  </div>

                  {/* Floating Module Info */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                    <Card className="bg-slate-50 backdrop-blur-sm border shadow-xl">
                      <CardContent className="p-3 text-center min-w-[160px]">
                        <h3 className="font-bold text-sm text-slate-800 mb-1">
                          {module.title}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Badge 
                            variant={module.type === 'quiz' ? 'secondary' : module.type === 'project' ? 'destructive' : 'default'}
                            className="text-xs"
                          >
                            {module.type === 'quiz' ? '🧠 Quiz' : module.type === 'project' ? '🏆 Avaliação Final' : '📚 Aula'}
                          </Badge>
                        </div>
                        
                        <div className="text-xs font-medium">
                          {actualStatus === 'completed' && (
                            <span className="text-green-600 flex items-center gap-1 justify-center">
                              <CheckCircle className="h-3 w-3" />
                              Concluído com {module.stars} ⭐
                            </span>
                          )}
                          {actualStatus === 'available' && (
                            <span className="text-blue-600 flex items-center gap-1 justify-center">
                              <Play className="h-3 w-3" />
                              Disponível agora!
                            </span>
                          )}
                          {actualStatus === 'locked' && (
                            <span className="text-slate-500 flex items-center gap-1 justify-center">
                              <Lock className="h-3 w-3" />
                              Bloqueado
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Progress connector to next module */}
                  {index < courseModules.length - 1 && (
                    <div
                      className={`absolute z-0 ${
                        actualStatus === 'completed' ? 'bg-success/40' : 'bg-muted-foreground/20'
                      } transition-colors duration-500`}
                      style={{
                        width: isMobile ? '3px' : '80px',
                        height: isMobile ? '80px' : '3px',
                        left: isMobile ? '50%' : '100%',
                        top: isMobile ? '100%' : '50%',
                        transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Hint & Progress */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Card className="bg-slate-50 backdrop-blur-sm border border-slate-200 text-slate-800">
          <CardContent className="p-4 text-center">
            <div className="flex items-center gap-4">
              <div className="text-xs">
                📱 {isMobile ? 'Arraste para baixo' : 'Arraste para os lados'} para explorar
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Concluído: {completedModules}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Disponível: 1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseMap;