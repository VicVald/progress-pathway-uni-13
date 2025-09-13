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
      
      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
        {freeCourses.map((course) => (
          <Card
            key={course.id}
            className="flex-shrink-0 w-72 card-hover bg-gradient-to-br from-card to-secondary mx-auto cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleCourseClick(course)}
          >
            <CardContent className="p-0">
              {/* Course Cover Image */}
              <div className="h-40 bg-gradient-to-br from-primary/20 via-accent/10 to-primary-dark/15 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
              
              {/* Course Info */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-foreground text-sm mb-4 line-clamp-2 leading-tight min-h-[2.5rem]">
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
      
      {/* Scroll indicator dots */}
      <div className="flex justify-center gap-2 mt-6">
        {freeCourses.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === 0 ? "bg-primary w-6" : "bg-muted"
            }`}
          />
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