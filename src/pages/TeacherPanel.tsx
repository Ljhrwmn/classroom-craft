import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TeacherPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { classes, teachers, subjects } = useData();

  // Protect the route
  if (!user || user.role !== "teacher") {
    navigate("/login");
    return null;
  }

  // Find the current teacher
  const currentTeacher = teachers.find((t) => t.email === user.email);
  if (!currentTeacher) {
    return <div>Professor não encontrado</div>;
  }

  // Get teacher's subjects
  const teacherSubjects = subjects.filter((s) => 
    currentTeacher.subjects.includes(s.id)
  );

  // Get classes where teacher teaches
  const teacherClasses = classes.filter((cls) => 
    Object.values(cls.schedule).some((periods) =>
      periods.some((period) => period.teacherId === currentTeacher.id)
    )
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Painel do Professor</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Minhas Disciplinas</h2>
        <Card className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ícone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.iconName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Minhas Turmas</h2>
        <Card className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Turma</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
};

export default TeacherPanel;