import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Calendar, CheckCircle, Clock, ChevronDown, ChevronRight, TrendingUp, MessageSquare, Brain } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from "@/components/Header";

const EmployeeProfile = () => {
  const { employeeId, sectorId } = useParams<{ employeeId: string; sectorId: string }>();
  const navigate = useNavigate();
  const [openCourses, setOpenCourses] = useState<Record<number, boolean>>({});
  const [managerFeedback, setManagerFeedback] = useState("");

  // Mock data do tempo de engajamento
  const engagementData = [
    { day: 'Seg', hours: 2.5 },
    { day: 'Ter', hours: 1.8 },
    { day: 'Qua', hours: 3.2 },
    { day: 'Qui', hours: 2.1 },
    { day: 'Sex', hours: 4.0 },
    { day: 'Sáb', hours: 1.5 },
    { day: 'Dom', hours: 0.8 },
  ];

  // Mock data de humores registrados
  const moodData = [
    { date: '2024-01-15', mood: 'Motivado', score: 8 },
    { date: '2024-01-12', mood: 'Ansioso', score: 6 },
    { date: '2024-01-10', mood: 'Confiante', score: 9 },
    { date: '2024-01-08', mood: 'Focado', score: 7 },
    { date: '2024-01-05', mood: 'Estressado', score: 5 },
    { date: '2024-01-03', mood: 'Entusiasmado', score: 8 },
  ];

  const averageMood = (moodData.reduce((acc, curr) => acc + curr.score, 0) / moodData.length).toFixed(1);
  const courseAccesses = {
    0: [ // Legislação Trabalhista
      {
        date: "2024-01-15",
        entryTime: "09:00",
        exitTime: "11:30",
        lessonsVisited: ["Introdução à CLT", "Direitos do Trabalhador", "Jornada de Trabalho"],
        observations: "Usuário relatou estar motivado para aprender sobre legislação. Demonstrou interesse especial em direitos trabalhistas.",
        evaluations: "Avaliação de módulo concluída em 1 tentativa com 95% de acerto."
      },
      {
        date: "2024-01-10",
        entryTime: "14:00", 
        exitTime: "16:45",
        lessonsVisited: ["Férias e Licenças", "Rescisão Contratual"],
        observations: "Usuário estava focado, mas demonstrou dúvidas sobre cálculos de rescisão.",
        evaluations: "Avaliação de módulo concluída em 2 tentativas. 1ª tentativa: 70% de acerto, 2ª tentativa: 88% de acerto."
      }
    ],
    1: [ // Gestão de Pessoas
      {
        date: "2024-01-12",
        entryTime: "10:00",
        exitTime: "12:00", 
        lessonsVisited: ["Liderança", "Comunicação Assertiva"],
        observations: "Usuário relatou estar ansioso antes de iniciar. Mostrou grande interesse em técnicas de liderança.",
        evaluations: "Avaliação em progresso - 75% do módulo concluído."
      }
    ],
    2: [ // Recrutamento
      {
        date: "2024-01-14",
        entryTime: "15:30",
        exitTime: "17:00",
        lessonsVisited: ["Técnicas de Entrevista", "Perfil Comportamental"],
        observations: "Usuário demonstrou confiança e praticou exercícios de entrevista com entusiasmo.",
        evaluations: "Avaliação de módulo concluída em 3 tentativas. 1ª: 60%, 2ª: 83%, 3ª: 91%."
      }
    ]
  };

  // Mock data de feedbacks do gestor
  const managerFeedbacks = [
    {
      date: "2024-01-10",
      period: "Jul-Dez 2023",
      feedback: "Ana demonstra excelente dedicação aos treinamentos e aplicação prática do conhecimento adquirido. Recomendo continuidade na trilha de liderança."
    },
    {
      date: "2023-07-15", 
      period: "Jan-Jun 2023",
      feedback: "Colaboradora proativa, sempre busca esclarecimentos. Sugestão: incluir mais prática em gestão de conflitos."
    }
  ];

  // Mock data de observações da IA
  const aiObservations = [
    {
      date: "2024-01-15",
      category: "Indicação de Conteúdo",
      observation: "Com base nas perguntas frequentes sobre cálculos trabalhistas, recomendo o módulo avançado 'Cálculos na Prática' para aprofundamento."
    },
    {
      date: "2024-01-12", 
      category: "Análise Comportamental",
      observation: "Média de humor nos últimos 30 dias: 7.2/10. Usuário demonstra consistência emocional positiva, ideal para absorção de conteúdo complexo."
    },
    {
      date: "2024-01-08",
      category: "Padrão de Aprendizagem", 
      observation: "Usuário aprende melhor em períodos matutinos (9h-12h). Performance 23% superior comparado ao período vespertino."
    }
  ];

  const toggleCourse = (courseIndex: number) => {
    setOpenCourses(prev => ({
      ...prev,
      [courseIndex]: !prev[courseIndex]
    }));
  };

  // Mock data do colaborador baseado no ID
  const employeeData = {
    "1": {
      name: "Ana Silva",
      email: "ana.silva@empresa.com",
      completionPercentage: 85,
      lastAccess: "2024-01-15T14:30:00",
      courses: [
        { name: "Legislação Trabalhista", progress: 100, status: "completed" },
        { name: "Gestão de Pessoas", progress: 75, status: "in-progress" },
        { name: "Recrutamento", progress: 80, status: "in-progress" },
      ]
    },
    "2": {
      name: "Carlos Santos",
      email: "carlos.santos@empresa.com",
      completionPercentage: 72,
      lastAccess: "2024-01-14T16:45:00",
      courses: [
        { name: "Legislação Trabalhista", progress: 90, status: "in-progress" },
        { name: "Gestão de Pessoas", progress: 60, status: "in-progress" },
        { name: "Recrutamento", progress: 65, status: "in-progress" },
      ]
    },
    "3": {
      name: "Maria Oliveira",
      email: "maria.oliveira@empresa.com",
      completionPercentage: 90,
      lastAccess: "2024-01-15T09:15:00",
      courses: [
        { name: "Legislação Trabalhista", progress: 100, status: "completed" },
        { name: "Gestão de Pessoas", progress: 100, status: "completed" },
        { name: "Recrutamento", progress: 70, status: "in-progress" },
      ]
    },
    "4": {
      name: "João Costa",
      email: "joao.costa@empresa.com",
      completionPercentage: 45,
      lastAccess: "2024-01-13T11:20:00",
      courses: [
        { name: "Legislação Trabalhista", progress: 50, status: "in-progress" },
        { name: "Gestão de Pessoas", progress: 40, status: "in-progress" },
        { name: "Recrutamento", progress: 45, status: "in-progress" },
      ]
    },
    "5": {
      name: "Lucia Ferreira",
      email: "lucia.ferreira@empresa.com",
      completionPercentage: 88,
      lastAccess: "2024-01-15T13:10:00",
      courses: [
        { name: "Legislação Trabalhista", progress: 100, status: "completed" },
        { name: "Gestão de Pessoas", progress: 85, status: "in-progress" },
        { name: "Recrutamento", progress: 80, status: "in-progress" },
      ]
    }
  };

  const employee = employeeData[employeeId as keyof typeof employeeData];

  if (!employee) {
    return <div>Colaborador não encontrado</div>;
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatLastAccess = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="border-b p-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/gerenciadores/setor/${sectorId}`)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Setor
          </Button>
          <h1 className="text-2xl font-bold">Perfil do Colaborador</h1>
        </div>
      </div>

      <main className="p-6 space-y-6">
        {/* Informações do Colaborador */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt={employee.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold">{employee.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Último acesso: {formatLastAccess(employee.lastAccess)}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{employee.completionPercentage}%</div>
                <div className="text-sm text-muted-foreground">Progresso Geral</div>
                <Progress value={employee.completionPercentage} className="mt-2 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Tempo de Engajamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tempo de Engajamento Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis label={{ value: 'Horas', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value) => [`${value}h`, 'Tempo de Engajamento']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Resumo de Insights */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Resumo de Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-background rounded-lg border">
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-primary mb-1">{averageMood}/10</div>
                  <div className="text-sm text-muted-foreground">Média de Humor</div>
                  <div className="text-xs text-muted-foreground mt-1">Últimos 30 dias</div>
                </div>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Registros recentes:</div>
                  {moodData.slice(0, 4).map((mood, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">
                        {new Date(mood.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        mood.score >= 8 ? 'bg-green-100 text-green-700' :
                        mood.score >= 6 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {mood.mood} ({mood.score})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border">
                <div className="text-lg font-bold text-primary mb-1">09:00-12:00</div>
                <div className="text-sm text-muted-foreground">Melhor Horário</div>
                <div className="text-xs text-muted-foreground mt-1">23% superior</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border">
                <div className="text-sm font-bold text-primary mb-1">Temas de Interesse</div>
                <div className="text-xs text-muted-foreground">Legislação Trabalhista</div>
                <div className="text-xs text-muted-foreground">Técnicas de Liderança</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cursos do Colaborador com Dropdowns */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso por Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employee.courses.map((course, index) => (
                <div key={index}>
                  <Collapsible 
                    open={openCourses[index]} 
                    onOpenChange={() => toggleCourse(index)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent cursor-pointer transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            {course.status === "completed" ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-orange-500" />
                            )}
                            <span className="font-medium">{course.name}</span>
                          </div>
                          
                          <Badge variant={course.status === "completed" ? "default" : "secondary"}>
                            {course.status === "completed" ? "Concluído" : "Em Progresso"}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold">{course.progress}%</div>
                            <Progress value={course.progress} className="w-24 mt-1" />
                          </div>
                          {openCourses[index] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="mt-4 ml-4 space-y-4">
                        <h4 className="font-semibold text-sm text-muted-foreground mb-3">Histórico de Acessos</h4>
                        {courseAccesses[index as keyof typeof courseAccesses]?.map((access, accessIndex) => (
                          <Card key={accessIndex} className="border-l-4 border-l-primary">
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium mb-2">
                                    {new Date(access.date).toLocaleDateString('pt-BR')}
                                  </h5>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    <strong>Horário:</strong> {access.entryTime} - {access.exitTime}
                                  </p>
                                  <div className="mb-3">
                                    <p className="text-sm font-medium mb-1">Aulas Visitadas:</p>
                                    <ul className="text-sm text-muted-foreground ml-4">
                                      {access.lessonsVisited.map((lesson, lessonIndex) => (
                                        <li key={lessonIndex} className="list-disc">{lesson}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-sm font-medium mb-1">Observações:</p>
                                    <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                                      {access.observations}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium mb-1">Avaliações:</p>
                                    <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                                      {access.evaluations}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )) || (
                          <p className="text-sm text-muted-foreground">Nenhum acesso registrado ainda.</p>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback e Observações do Gestor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Feedback e Observações do Gestor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nova Observação:</label>
              <Textarea
                placeholder="Digite suas observações sobre o colaborador..."
                value={managerFeedback}
                onChange={(e) => setManagerFeedback(e.target.value)}
                className="mb-3"
              />
              <Button size="sm">Salvar Observação</Button>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Histórico de Feedbacks (Últimos 6 meses)</h4>
              <div className="space-y-3">
                {managerFeedbacks.map((feedback, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium">Período: {feedback.period}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(feedback.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observações da IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Insights da IA - Agente de Acompanhamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiObservations.map((observation, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {observation.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(observation.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{observation.observation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmployeeProfile;