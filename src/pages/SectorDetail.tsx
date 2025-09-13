import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import TrainingPieChart from "@/components/TrainingPieChart";
import EmployeeList from "@/components/EmployeeList";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";

const SectorDetail = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string>("todos");

  // Mock data baseado no setor
  const sectorData = {
    rh: { name: "Recursos Humanos", courses: ["Legislação Trabalhista", "Gestão de Pessoas", "Recrutamento"] },
    tecnologia: { name: "Tecnologia", courses: ["Segurança da Informação", "Desenvolvimento Web", "DevOps"] },
    vendas: { name: "Vendas", courses: ["Técnicas de Vendas", "Atendimento ao Cliente", "CRM"] },
    marketing: { name: "Marketing", courses: ["Marketing Digital", "SEO", "Redes Sociais"] },
    financeiro: { name: "Financeiro", courses: ["Contabilidade", "Análise Financeira", "Compliance"] },
    operacoes: { name: "Operações", courses: ["Gestão de Processos", "Qualidade", "Logística"] },
  };

  // Dados detalhados dos colaboradores com progresso por curso
  const allEmployeesData = [
    {
      id: "1",
      name: "Ana Silva",
      email: "ana.silva@empresa.com",
      lastAccess: "2024-01-15T14:30:00",
      courseProgress: {
        "Legislação Trabalhista": 100,
        "Gestão de Pessoas": 75,
        "Recrutamento": 80,
      }
    },
    {
      id: "2", 
      name: "Carlos Santos",
      email: "carlos.santos@empresa.com",
      lastAccess: "2024-01-14T16:45:00",
      courseProgress: {
        "Legislação Trabalhista": 90,
        "Gestão de Pessoas": 60,
        "Recrutamento": 65,
      }
    },
    {
      id: "3",
      name: "Maria Oliveira", 
      email: "maria.oliveira@empresa.com",
      lastAccess: "2024-01-15T09:15:00",
      courseProgress: {
        "Legislação Trabalhista": 100,
        "Gestão de Pessoas": 100,
        "Recrutamento": 70,
      }
    },
    {
      id: "4",
      name: "João Costa",
      email: "joao.costa@empresa.com", 
      lastAccess: "2024-01-13T11:20:00",
      courseProgress: {
        "Legislação Trabalhista": 50,
        "Gestão de Pessoas": 40,
        "Recrutamento": 45,
      }
    },
    {
      id: "5",
      name: "Lucia Ferreira",
      email: "lucia.ferreira@empresa.com",
      lastAccess: "2024-01-15T13:10:00",
      courseProgress: {
        "Legislação Trabalhista": 100,
        "Gestão de Pessoas": 85,
        "Recrutamento": 80,
      }
    }
  ];

  const currentSector = sectorData[sectorId as keyof typeof sectorData];
  
  if (!currentSector) {
    return <div>Setor não encontrado</div>;
  }

  // Calcular dados filtrados baseado no curso selecionado
  const filteredData = useMemo(() => {
    if (selectedCourse === "todos") {
      // Quando "todos" está selecionado, calcular média de todos os cursos
      const employeesWithOverallProgress = allEmployeesData.map(employee => {
        const courseValues = Object.values(employee.courseProgress);
        const averageProgress = Math.round(courseValues.reduce((sum, value) => sum + value, 0) / courseValues.length);
        return {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          completionPercentage: averageProgress,
          lastAccess: employee.lastAccess
        };
      });
      
      // Calcular dados do gráfico para todos os cursos
      const totalProgress = employeesWithOverallProgress.reduce((sum, emp) => sum + emp.completionPercentage, 0);
      const averageCompletion = Math.round(totalProgress / employeesWithOverallProgress.length);
      
      return {
        employees: employeesWithOverallProgress,
        chartData: [
          { name: "Concluído", value: averageCompletion, color: "#22c55e" },
          { name: "Pendente", value: 100 - averageCompletion, color: "#ef4444" },
        ]
      };
    } else {
      // Filtrar por curso específico
      const employeesForCourse = allEmployeesData.map(employee => ({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        completionPercentage: employee.courseProgress[selectedCourse] || 0,
        lastAccess: employee.lastAccess
      }));
      
      // Calcular dados do gráfico para o curso específico
      const totalProgress = employeesForCourse.reduce((sum, emp) => sum + emp.completionPercentage, 0);
      const averageCompletion = Math.round(totalProgress / employeesForCourse.length);
      
      return {
        employees: employeesForCourse,
        chartData: [
          { name: "Concluído", value: averageCompletion, color: "#22c55e" },
          { name: "Pendente", value: 100 - averageCompletion, color: "#ef4444" },
        ]
      };
    }
  }, [selectedCourse, allEmployeesData]);

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/gerenciadores/setor/${sectorId}/colaborador/${employeeId}`);
  };

  // Dados dos colaboradores
  const employeesData = [
    {
      id: "1",
      name: "Ana Silva",
      email: "ana.silva@empresa.com",
      completionPercentage: 85,
      lastAccess: "2024-01-15T14:30:00"
    },
    {
      id: "2", 
      name: "Carlos Santos",
      email: "carlos.santos@empresa.com",
      completionPercentage: 72,
      lastAccess: "2024-01-14T16:45:00"
    },
    {
      id: "3",
      name: "Maria Oliveira", 
      email: "maria.oliveira@empresa.com",
      completionPercentage: 90,
      lastAccess: "2024-01-15T09:15:00"
    },
    {
      id: "4",
      name: "João Costa",
      email: "joao.costa@empresa.com", 
      completionPercentage: 45,
      lastAccess: "2024-01-13T11:20:00"
    },
    {
      id: "5",
      name: "Lucia Ferreira",
      email: "lucia.ferreira@empresa.com",
      completionPercentage: 88,
      lastAccess: "2024-01-15T13:10:00"
    }
  ];

  const courses = ["todos", ...currentSector.courses];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex items-center border-b p-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/gerenciadores")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Setor: {currentSector.name}</h1>
      </div>

      <main className="p-6 space-y-6">
            {/* Filtro por Curso */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Dashboard do Setor</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="min-w-48">
                    Filtrar por curso: {selectedCourse === "todos" ? "Todos os cursos" : selectedCourse}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48 bg-background border shadow-lg z-50">
                  {courses.map((course) => (
                    <DropdownMenuItem
                      key={course}
                      onClick={() => setSelectedCourse(course)}
                      className="cursor-pointer hover:bg-accent"
                    >
                      {course === "todos" ? "Todos os cursos" : course}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Conteúdo Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Conclusão */}
              <div className="bg-card p-6 rounded-lg border">
                <TrainingPieChart
                  data={filteredData.chartData}
                  title={`Conclusão${selectedCourse === "todos" ? " Geral" : ` - ${selectedCourse}`} - ${currentSector.name}`}
                />
              </div>

              {/* Lista de Colaboradores */}
              <EmployeeList 
                employees={filteredData.employees} 
                onEmployeeClick={handleEmployeeClick}
              />
            </div>
          </main>
    </div>
  );
};

export default SectorDetail;