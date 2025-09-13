import Header from "@/components/Header";
import TrainingPieChart from "@/components/TrainingPieChart";
import SectorCard from "@/components/SectorCard";

const Managers = () => {
  // Dados do primeiro gráfico - Status dos treinamentos
  const trainingStatusData = [
    { name: "Concluídos", value: 65, color: "#22c55e" },
    { name: "Em Andamento", value: 25, color: "#eab308" },
    { name: "Não Iniciado", value: 10, color: "#6b7280" },
  ];

  // Dados do segundo gráfico - Tempo de conclusão dos em andamento
  const timeCompletionData = [
    { name: "Expirados", value: 15, color: "#ef4444" },
    { name: "Expira em 1 semana", value: 25, color: "#f97316" },
    { name: "Expira em 1 mês", value: 35, color: "#eab308" },
    { name: "No prazo", value: 25, color: "#22c55e" },
  ];

  // Dados dos setores
  const sectorsData = [
    { sectorId: "rh", sectorName: "Recursos Humanos", totalCourses: 12, completionPercentage: 85 },
    { sectorId: "tecnologia", sectorName: "Tecnologia", totalCourses: 18, completionPercentage: 92 },
    { sectorId: "vendas", sectorName: "Vendas", totalCourses: 8, completionPercentage: 78 },
    { sectorId: "marketing", sectorName: "Marketing", totalCourses: 15, completionPercentage: 88 },
    { sectorId: "financeiro", sectorName: "Financeiro", totalCourses: 10, completionPercentage: 95 },
    { sectorId: "operacoes", sectorName: "Operações", totalCourses: 14, completionPercentage: 73 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Sistema de Gerenciamento RH</h1>
      </div>

      <main className="p-6 space-y-8">
            {/* Dashboard Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
              
              {/* Gráficos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-card p-6 rounded-lg border">
                  <TrainingPieChart
                    data={trainingStatusData}
                    title="Porcentagem de treinamentos obrigatórios em dia"
                  />
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <TrainingPieChart
                    data={timeCompletionData}
                    title="Tempo de conclusão de treinamentos obrigatórios"
                  />
                </div>
              </div>
            </section>

            {/* Setores Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Setores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectorsData.map((sector, index) => (
                  <SectorCard
                    key={index}
                    sectorId={sector.sectorId}
                    sectorName={sector.sectorName}
                    totalCourses={sector.totalCourses}
                    completionPercentage={sector.completionPercentage}
                  />
                ))}
              </div>
            </section>
      </main>
    </div>
  );
};

export default Managers;