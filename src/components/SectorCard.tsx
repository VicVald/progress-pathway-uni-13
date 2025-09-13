import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface SectorCardProps {
  sectorId: string;
  sectorName: string;
  totalCourses: number;
  completionPercentage: number;
}

const SectorCard = ({ sectorId, sectorName, totalCourses, completionPercentage }: SectorCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/gerenciadores/setor/${sectorId}`);
  };

  return (
    <Card className="h-full cursor-pointer transition-all hover:shadow-lg hover:scale-105" onClick={handleClick}>
      <CardHeader>
        <CardTitle className="text-lg">{sectorName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Cursos Disponíveis</span>
          <span className="font-semibold">{totalCourses}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Taxa de Conclusão</span>
            <span className="font-semibold">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SectorCard;