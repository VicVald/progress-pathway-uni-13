import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Employee {
  id: string;
  name: string;
  email: string;
  completionPercentage: number;
  lastAccess: string;
}

interface EmployeeListProps {
  employees: Employee[];
  onEmployeeClick?: (employeeId: string) => void;
}

const EmployeeList = ({ employees, onEmployeeClick }: EmployeeListProps) => {
  const formatLastAccess = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Colaboradores do Setor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {employees.map((employee) => (
            <div 
              key={employee.id} 
              className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors" 
              onClick={() => onEmployeeClick?.(employee.id)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={employee.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.email}</p>
                  </div>
                  <span className="text-sm font-semibold">{employee.completionPercentage}%</span>
                </div>
                
                <Progress value={employee.completionPercentage} className="h-2" />
                
                <p className="text-xs text-muted-foreground">
                  Último acesso: {formatLastAccess(employee.lastAccess)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeList;