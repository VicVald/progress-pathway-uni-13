import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import CourseModal from "./CourseModal";

interface PendingCourse {
  id: string;
  title: string;
  description: string;
  type: "mandatory" | "free";
  hours: number;
  deadline: string;
}

const pendingCourses: PendingCourse[] = [
  {
    id: "1",
    title: "Normas de saúde e segurança no trabalho",
    description: "Curso obrigatório sobre as principais normas de segurança e saúde ocupacional para um ambiente de trabalho seguro.",
    type: "mandatory",
    hours: 8,
    deadline: "20/10/2025",
  },
  {
    id: "2",
    title: "Sustentabilidade e Responsabilidade Social",
    description: "Aprenda sobre práticas sustentáveis e responsabilidade social corporativa para um futuro mais consciente.",
    type: "mandatory",
    hours: 12,
    deadline: "25/10/2025",
  },
  {
    id: "3",
    title: "Gestão de Tempo e Produtividade",
    description: "Técnicas e ferramentas para otimizar seu tempo e aumentar sua produtividade no trabalho e na vida pessoal.",
    type: "free",
    hours: 10,
    deadline: "30/11/2025",
  },
];

const PendingCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<PendingCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseClick = (course: PendingCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleStartCourse = () => {
    // Navigate to course page
    window.location.href = `/curso/${selectedCourse?.id}`;
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
        Trilhas pendentes
      </h2>
      
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {pendingCourses.map((course) => (
          <Card 
            key={course.id} 
            className="card-hover w-full cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleCourseClick(course)}
          >
            <CardContent className="p-0">
              {/* Course Cover Image */}
              <div className="h-24 bg-gradient-to-br from-muted/50 via-secondary to-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
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
                <div className="absolute bottom-2 right-2">
                  <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                {/* Course Title */}
                <h3 className="font-medium text-foreground mb-3 text-xs text-center min-h-[2.5rem] flex items-center justify-center leading-tight">
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

      {/* Course Modal */}
      {selectedCourse && (
        <CourseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          course={selectedCourse}
          onStartCourse={handleStartCourse}
        />
      )}
    </section>
  );
};

export default PendingCourses;