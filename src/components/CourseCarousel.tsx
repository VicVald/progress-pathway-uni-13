import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import CourseModal from "./CourseModal";

interface Course {
  id: string;
  title: string;
  description: string;
  hours: number;
  availableDate: string;
  image?: string;
}

const freeCourses: Course[] = [
  {
    id: "1",
    title: "Ferramentas de Inteligência Artificial no trabalho",
    description: "Aprenda a utilizar ferramentas de IA para otimizar suas tarefas diárias e aumentar sua produtividade no ambiente de trabalho.",
    hours: 20,
    availableDate: "05/10/2025",
  },
  {
    id: "2", 
    title: "Metodologias Ágeis para Gestão de Projetos",
    description: "Domine os fundamentos das metodologias ágeis como Scrum e Kanban para gerenciar projetos de forma mais eficiente.",
    hours: 15,
    availableDate: "12/10/2025",
  },
  {
    id: "3",
    title: "Comunicação Assertiva e Liderança",
    description: "Desenvolva habilidades de comunicação e liderança para melhorar suas relações profissionais e alcançar melhores resultados.",
    hours: 18,
    availableDate: "20/10/2025",
  },
];

const CourseCarousel = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseClick = (course: Course) => {
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
        Trilhas livres
      </h2>
      
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {freeCourses.map((course) => (
          <Card
            key={course.id}
            className="card-hover w-full cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleCourseClick(course)}
          >
            <CardContent className="p-0">
              {/* Course Cover Image */}
              <div className="h-24 bg-gradient-to-br from-primary/15 via-accent/5 to-primary-dark/10 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <div className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center shadow-lg">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
              
              {/* Course Info */}
              <div className="p-3">
                <h3 className="font-medium text-foreground text-xs mb-3 line-clamp-2 leading-tight min-h-[2.5rem] text-center">
                  {course.title}
                </h3>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground bg-secondary/50 rounded-full py-2 px-3">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">{course.hours} horas</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground bg-accent/10 rounded-full py-2 px-3">
                    <Calendar className="h-3 w-3 text-accent" />
                    <span>Disponível até {course.availableDate}</span>
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

export default CourseCarousel;