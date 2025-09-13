import Header from "@/components/Header";
import CourseCarousel from "@/components/CourseCarousel";
import CourseProgress from "@/components/CourseProgress";
import PendingCourses from "@/components/PendingCourses";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-6">
        <CourseCarousel />
        <CourseProgress />
        <PendingCourses />
      </main>
    </div>
  );
};

export default Index;
