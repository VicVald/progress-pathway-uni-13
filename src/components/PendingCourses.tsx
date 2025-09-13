import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PendingCourse {
  id: string;
  title: string;
  type: "mandatory" | "free";
  deadline: string;
}

const pendingCourses: PendingCourse[] = [
  {
    id: "1",
    title: "Normas de saúde e segurança no trabalho",
    type: "mandatory", 
    deadline: "20/10/2025",
  },
  {
    id: "2",
    title: "Sustentabilidade e Responsabilidade Social",
    type: "mandatory",
    deadline: "25/10/2025",
  },
  {
    id: "3",
    title: "Gestão de Tempo e Produtividade",
    type: "free",
    deadline: "30/11/2025",
  },
];

const PendingCourses = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
        Trilhas pendentes
      </h2>
      
      <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
        {pendingCourses.map((course) => (
          <Card 
            key={course.id} 
            className="card-hover w-full cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate(`/curso/${course.id}`)}
          >
            <CardContent className="p-0">
              {/* Course Cover Image */}
              <div className="h-20 bg-gradient-to-br from-muted/50 via-secondary to-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <div className="absolute top-1 left-1">
                  <Badge
                    variant={course.type === "mandatory" ? "destructive" : "secondary"}
                    className={`text-xs shadow-sm ${
                      course.type === "mandatory"
                        ? "bg-course-mandatory text-white"
                        : "bg-course-free text-white"
                    }`}
                  >
                    {course.type === "mandatory" ? "Obrig." : "Livre"}
                  </Badge>
                </div>
                <div className="absolute bottom-1 right-1">
                  <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                {/* Course Title */}
                <h3 className="font-medium text-foreground mb-2 text-xs text-center min-h-[2rem] flex items-center justify-center leading-tight">
                  {course.title}
                </h3>
                
                {/* Progress Section */}
                <div className="space-y-2">
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground">
                      Não iniciado
                    </span>
                  </div>
                  
                  <Progress 
                    value={0} 
                    className="h-2 progress-animate opacity-50"
                  />
                  
                  {/* Deadline */}
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="text-center">{course.deadline}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PendingCourses;