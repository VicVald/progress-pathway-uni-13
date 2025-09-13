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
  
  const getCourseAccesses = (sectorId: string) => {
    const accessesBySector = {
      "rh": {
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
      },
      "financeiro": {
        0: [ // Contabilidade Avançada
          {
            date: "2024-01-15",
            entryTime: "08:30",
            exitTime: "11:00",
            lessonsVisited: ["Princípios Contábeis", "Demonstrações Financeiras", "Balanço Patrimonial"],
            observations: "Usuário demonstrou excelente compreensão dos conceitos contábeis fundamentais.",
            evaluations: "Avaliação de módulo concluída em 1 tentativa com 97% de acerto."
          }
        ],
        1: [ // Análise Financeira
          {
            date: "2024-01-13",
            entryTime: "14:00",
            exitTime: "16:30",
            lessonsVisited: ["Indicadores Financeiros", "Fluxo de Caixa", "Análise de Investimentos"],
            observations: "Usuário focado em análises práticas, solicitou mais exercícios com casos reais.",
            evaluations: "Avaliação em progresso - 90% do módulo concluído."
          }
        ]
      },
      "vendas": {
        0: [ // Técnicas de Vendas
          {
            date: "2024-01-15",
            entryTime: "09:00",
            exitTime: "12:00",
            lessonsVisited: ["Prospecção", "Apresentação de Produtos", "Fechamento de Vendas"],
            observations: "Usuário muito engajado, praticou simulações de vendas com entusiasmo.",
            evaluations: "Avaliação de módulo concluída em 1 tentativa com 93% de acerto."
          }
        ],
        1: [ // Relacionamento com Cliente
          {
            date: "2024-01-12",
            entryTime: "15:00",
            exitTime: "17:00",
            lessonsVisited: ["Atendimento ao Cliente", "Fidelização", "Resolução de Conflitos"],
            observations: "Usuário demonstrou boa compreensão sobre relacionamento, mas precisa praticar mais resolução de conflitos.",
            evaluations: "Avaliação em progresso - 85% do módulo concluído."
          }
        ]
      },
      "ti": {
        0: [ // Segurança da Informação
          {
            date: "2024-01-15",
            entryTime: "10:00",
            exitTime: "13:00",
            lessonsVisited: ["Criptografia", "Proteção de Dados", "Políticas de Segurança"],
            observations: "Usuário muito técnico, fez perguntas avançadas sobre implementação de segurança.",
            evaluations: "Avaliação de módulo concluída em 1 tentativa com 98% de acerto."
          }
        ],
        1: [ // Desenvolvimento Web
          {
            date: "2024-01-14",
            entryTime: "14:00",
            exitTime: "18:00",
            lessonsVisited: ["React", "APIs REST", "Banco de Dados"],
            observations: "Usuário com experiência prévia, focou em práticas avançadas de desenvolvimento.",
            evaluations: "Avaliação em progresso - 95% do módulo concluído."
          }
        ]
      }
    };

    return accessesBySector[sectorId as keyof typeof accessesBySector] || accessesBySector.rh;
  };

  const courseAccesses = getCourseAccesses(sectorId || 'rh');

  // Mock data de feedbacks do gestor por setor
  const getManagerFeedbacks = (sectorId: string, employeeId: string) => {
    const feedbacksBySector = {
      "rh": {
        "1": [
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
        ]
      },
      "financeiro": {
        "1": [
          {
            date: "2024-01-08",
            period: "Jul-Dez 2023",
            feedback: "Roberto demonstra excelente conhecimento técnico e precisão nos cálculos. Recomendo trilha avançada em auditoria."
          }
        ]
      },
      "vendas": {
        "1": [
          {
            date: "2024-01-12",
            period: "Jul-Dez 2023",
            feedback: "Juliana tem ótimos resultados de vendas e excelente relacionamento com clientes. Sugestão: desenvolver habilidades de liderança de equipe."
          }
        ]
      },
      "ti": {
        "1": [
          {
            date: "2024-01-11",
            period: "Jul-Dez 2023",
            feedback: "Eduardo tem conhecimento técnico excepcional e boa capacidade de resolver problemas complexos. Recomendo trilha de arquitetura de sistemas."
          }
        ]
      }
    };

    return feedbacksBySector[sectorId as keyof typeof feedbacksBySector]?.[employeeId as keyof typeof feedbacksBySector[keyof typeof feedbacksBySector]] || [
      {
        date: "2024-01-10",
        period: "Jul-Dez 2023",
        feedback: "Colaborador demonstra boa dedicação aos treinamentos. Continue acompanhando o progresso."
      }
    ];
  };

  const managerFeedbacks = getManagerFeedbacks(sectorId || 'rh', employeeId || '1');

  // Mock data de observações da IA por setor
  const getAiObservations = (sectorId: string) => {
    const observationsBySector = {
      "rh": [
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
      ],
      "financeiro": [
        {
          date: "2024-01-15",
          category: "Indicação de Conteúdo",
          observation: "Baseado no interesse em análise financeira, recomendo o módulo 'Valuation e Fusões & Aquisições' para especialização."
        },
        {
          date: "2024-01-12",
          category: "Análise Comportamental",
          observation: "Usuário demonstra alta precisão em cálculos e atenção a detalhes. Ideal para funções que exigem rigor técnico."
        }
      ],
      "vendas": [
        {
          date: "2024-01-15",
          category: "Indicação de Conteúdo",
          observation: "Com base no perfil de vendas consultivas, recomendo o módulo 'Vendas B2B Complexas' para desenvolvimento avançado."
        },
        {
          date: "2024-01-13",
          category: "Padrão de Aprendizagem",
          observation: "Usuário aprende melhor com simulações práticas. Recomendo mais exercícios de role-play."
        }
      ],
      "ti": [
        {
          date: "2024-01-15",
          category: "Indicação de Conteúdo",
          observation: "Baseado no interesse em segurança, recomendo certificações CISSP e CEH para especialização profissional."
        },
        {
          date: "2024-01-14",
          category: "Análise Comportamental",
          observation: "Usuário tem perfil altamente técnico e aprende rapidamente conceitos complexos. Ideal para projetos desafiadores."
        }
      ]
    };

    return observationsBySector[sectorId as keyof typeof observationsBySector] || observationsBySector.rh;
  };

  const aiObservations = getAiObservations(sectorId || 'rh');

  const toggleCourse = (courseIndex: number) => {
    setOpenCourses(prev => ({
      ...prev,
      [courseIndex]: !prev[courseIndex]
    }));
  };

  // Mock data do colaborador baseado no ID e setor
  const getSectorEmployeeData = (sectorId: string, employeeId: string) => {
    const sectors = {
      "rh": {
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
      },
      "financeiro": {
        "1": {
          name: "Roberto Lima",
          email: "roberto.lima@empresa.com",
          completionPercentage: 92,
          lastAccess: "2024-01-15T10:20:00",
          courses: [
            { name: "Contabilidade Avançada", progress: 100, status: "completed" },
            { name: "Análise Financeira", progress: 90, status: "in-progress" },
            { name: "Auditoria Interna", progress: 85, status: "in-progress" },
          ]
        },
        "2": {
          name: "Sandra Costa",
          email: "sandra.costa@empresa.com",
          completionPercentage: 78,
          lastAccess: "2024-01-14T15:45:00",
          courses: [
            { name: "Contabilidade Avançada", progress: 85, status: "in-progress" },
            { name: "Análise Financeira", progress: 70, status: "in-progress" },
            { name: "Auditoria Interna", progress: 80, status: "in-progress" },
          ]
        },
        "3": {
          name: "Pedro Almeida",
          email: "pedro.almeida@empresa.com",
          completionPercentage: 95,
          lastAccess: "2024-01-15T14:10:00",
          courses: [
            { name: "Contabilidade Avançada", progress: 100, status: "completed" },
            { name: "Análise Financeira", progress: 100, status: "completed" },
            { name: "Auditoria Interna", progress: 85, status: "in-progress" },
          ]
        }
      },
      "vendas": {
        "1": {
          name: "Juliana Martins",
          email: "juliana.martins@empresa.com",
          completionPercentage: 87,
          lastAccess: "2024-01-15T16:30:00",
          courses: [
            { name: "Técnicas de Vendas", progress: 100, status: "completed" },
            { name: "Relacionamento com Cliente", progress: 85, status: "in-progress" },
            { name: "Negociação Avançada", progress: 75, status: "in-progress" },
          ]
        },
        "2": {
          name: "Felipe Rocha",
          email: "felipe.rocha@empresa.com",
          completionPercentage: 73,
          lastAccess: "2024-01-14T11:15:00",
          courses: [
            { name: "Técnicas de Vendas", progress: 80, status: "in-progress" },
            { name: "Relacionamento com Cliente", progress: 70, status: "in-progress" },
            { name: "Negociação Avançada", progress: 70, status: "in-progress" },
          ]
        }
      },
      "ti": {
        "1": {
          name: "Eduardo Silva",
          email: "eduardo.silva@empresa.com",
          completionPercentage: 94,
          lastAccess: "2024-01-15T17:45:00",
          courses: [
            { name: "Segurança da Informação", progress: 100, status: "completed" },
            { name: "Desenvolvimento Web", progress: 95, status: "in-progress" },
            { name: "DevOps Practices", progress: 90, status: "in-progress" },
          ]
        },
        "2": {
          name: "Carla Mendes",
          email: "carla.mendes@empresa.com",
          completionPercentage: 86,
          lastAccess: "2024-01-15T09:30:00",
          courses: [
            { name: "Segurança da Informação", progress: 90, status: "in-progress" },
            { name: "Desenvolvimento Web", progress: 85, status: "in-progress" },
            { name: "DevOps Practices", progress: 85, status: "in-progress" },
          ]
        }
      }
    };

    return sectors[sectorId as keyof typeof sectors]?.[employeeId as keyof typeof sectors[keyof typeof sectors]];
  };

  const employee = getSectorEmployeeData(sectorId || 'rh', employeeId || '1');

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

        {/* Resumo de Performance Aprimorado */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-secondary/5 to-accent/5">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              Dashboard de Performance
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              {/* Média de Humor */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      Estável
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-green-700 mb-1">{averageMood}</div>
                  <div className="text-sm text-green-600 font-medium">Média de Humor</div>
                  <div className="text-xs text-green-500 mt-1">Últimos 30 dias</div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-medium text-green-600 mb-2">Registros recentes:</div>
                    {moodData.slice(0, 3).map((mood, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-xs text-green-600">
                          {new Date(mood.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${
                            mood.score >= 8 ? 'bg-green-500' :
                            mood.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-xs font-medium text-green-700">{mood.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tempo Semanal */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      +15%
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-blue-700 mb-1">16.9h</div>
                  <div className="text-sm text-blue-600 font-medium">Tempo Semanal</div>
                  <div className="text-xs text-blue-500 mt-1">Última semana</div>
                  
                  <div className="mt-4">
                    <Progress value={75} className="h-2 bg-blue-100" />
                    <div className="text-xs text-blue-600 mt-2">Meta: 20h/semana</div>
                  </div>
                </CardContent>
              </Card>

              {/* Melhor Horário */}
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                      Ótimo
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-purple-700 mb-1">09:00-12:00</div>
                  <div className="text-sm text-purple-600 font-medium">Melhor Horário</div>
                  <div className="text-xs text-purple-500 mt-1">23% superior</div>
                  
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-purple-600">Período matutino</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Taxa de Conclusão */}
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-orange-600" />
                    </div>
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      Excelente
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-orange-700 mb-1">{employee.completionPercentage}%</div>
                  <div className="text-sm text-orange-600 font-medium">Taxa de Conclusão</div>
                  <div className="text-xs text-orange-500 mt-1">Cursos ativos</div>
                  
                  <div className="mt-4">
                    <Progress value={employee.completionPercentage} className="h-2 bg-orange-100" />
                    <div className="text-xs text-orange-600 mt-2">
                      {employee.courses.filter(c => c.status === 'completed').length} de {employee.courses.length} concluídos
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights Adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-muted">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-base mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    Temas de Interesse
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Legislação Trabalhista</span>
                      <Badge variant="outline" className="text-xs">95% interesse</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Técnicas de Liderança</span>
                      <Badge variant="outline" className="text-xs">88% interesse</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Gestão de Conflitos</span>
                      <Badge variant="outline" className="text-xs">72% interesse</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-muted">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-base mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    Pontos de Atenção
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <div className="text-sm font-medium">Dificuldade em cálculos</div>
                        <div className="text-xs text-muted-foreground">Rescisão contratual</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <div className="text-sm font-medium">Progresso consistente</div>
                        <div className="text-xs text-muted-foreground">Acima da média</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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