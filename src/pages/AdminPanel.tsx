import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { classes, teachers, subjects, setClasses, setTeachers, setSubjects, saveData } = useData();
  const [newClassName, setNewClassName] = useState("");
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");

  // Protect the route
  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  const handleAddClass = () => {
    if (!newClassName) {
      toast.error("Por favor, insira um nome para a turma");
      return;
    }

    const newClass = {
      id: crypto.randomUUID(),
      name: newClassName,
      schedule: {},
    };

    setClasses([...classes, newClass]);
    saveData();
    setNewClassName("");
    toast.success("Turma adicionada com sucesso!");
  };

  const handleAddTeacher = () => {
    if (!newTeacherName || !newTeacherEmail) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const newTeacher = {
      id: crypto.randomUUID(),
      name: newTeacherName,
      email: newTeacherEmail,
      subjects: [],
    };

    setTeachers([...teachers, newTeacher]);
    saveData();
    setNewTeacherName("");
    setNewTeacherEmail("");
    toast.success("Professor adicionado com sucesso!");
  };

  const handleAddSubject = () => {
    if (!newSubjectName) {
      toast.error("Por favor, insira um nome para a disciplina");
      return;
    }

    const newSubject = {
      id: crypto.randomUUID(),
      name: newSubjectName,
      iconName: "Book",
      color: "bg-blue-200",
    };

    setSubjects([...subjects, newSubject]);
    saveData();
    setNewSubjectName("");
    toast.success("Disciplina adicionada com sucesso!");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

      {/* Classes Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Turmas</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Turma
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Adicionar Nova Turma</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="className">Nome da Turma</Label>
                  <Input
                    id="className"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    placeholder="Ex: EMITAI 25"
                  />
                </div>
                <Button onClick={handleAddClass}>Adicionar Turma</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Card className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* Teachers Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Professores</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Professor
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Adicionar Novo Professor</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="teacherName">Nome do Professor</Label>
                  <Input
                    id="teacherName"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacherEmail">Email do Professor</Label>
                  <Input
                    id="teacherEmail"
                    type="email"
                    value={newTeacherEmail}
                    onChange={(e) => setNewTeacherEmail(e.target.value)}
                    placeholder="Ex: joao@escola.com"
                  />
                </div>
                <Button onClick={handleAddTeacher}>Adicionar Professor</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Card className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* Subjects Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Disciplinas</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Disciplina
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Adicionar Nova Disciplina</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subjectName">Nome da Disciplina</Label>
                  <Input
                    id="subjectName"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    placeholder="Ex: Matemática"
                  />
                </div>
                <Button onClick={handleAddSubject}>Adicionar Disciplina</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Card className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ícone</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.iconName}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
};

export default AdminPanel;