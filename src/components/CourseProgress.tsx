import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface CourseInProgress {
  id: string;
  title: string;
  type: "mandatory" | "free";
  progress: number;
  deadline: string;
}

const coursesInProgress: CourseInProgress[] = [
  {
    id: "1",
    title: "O que é a Lei Geral de Proteção de Dados",
    type: "mandatory",
    progress: 50,
    deadline: "30/09/2025",
  },
  {
    id: "2",
    title: "Inteligência Emocional no Trabalho",
    type: "free",
    progress: 81,
    deadline: "15/10/2025",
  },
];

const CourseProgress = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
        Continuar de onde parei
      </h2>
      
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {coursesInProgress.map((course) => (
          <Card 
            key={course.id} 
            className="card-hover w-full cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate(`/curso/${course.id}`)}
          >
            <CardContent className="p-0">
              {/* Course Cover Image */}
              <div className="h-24 bg-gradient-to-br from-primary/15 via-accent/5 to-primary-dark/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                <div className="absolute top-2 left-2">
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
              </div>
              
              <div className="p-3">
                {/* Course Title */}
                <h3 className="font-medium text-foreground mb-3 text-xs text-center min-h-[2rem] flex items-center justify-center leading-tight">
                  {course.title}
                </h3>
                
                {/* Progress Section */}
                <div className="space-y-2">
                  <div className="text-center">
                    <span className="text-lg font-bold text-primary">
                      {course.progress}%
                    </span>
                  </div>
                  
                  <Progress 
                    value={course.progress} 
                    className="h-2 progress-animate"
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

export default CourseProgress;