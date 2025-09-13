import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen } from "lucide-react";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    description: string;
    hours: number;
    type?: "mandatory" | "free";
  };
  onStartCourse: () => void;
}

const CourseModal = ({ isOpen, onClose, course, onStartCourse }: CourseModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center mb-4">
            {course.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Course Description */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </div>
          
          {/* Course Hours */}
          <div className="flex items-center justify-center gap-2 p-3 bg-secondary/50 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">
              {course.hours} horas de duração
            </span>
          </div>
          
          {/* Start Button */}
          <Button 
            onClick={onStartCourse}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            Iniciar Curso
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;