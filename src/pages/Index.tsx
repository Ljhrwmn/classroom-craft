import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book, Calculator, Code, Dna, Beaker, Globe, History, Languages, Paintbrush, Brain, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const getSubjectIcon = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Book: <Book className="w-5 h-5" />,
    Calculator: <Calculator className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    Dna: <Dna className="w-5 h-5" />,
    Beaker: <Beaker className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    History: <History className="w-5 h-5" />,
    Languages: <Languages className="w-5 h-5" />,
    Paintbrush: <Paintbrush className="w-5 h-5" />,
    Brain: <Brain className="w-5 h-5" />,
    Activity: <Activity className="w-5 h-5" />,
  };
  return icons[iconName] || <Book className="w-5 h-5" />;
};

const Index = () => {
  const { classes, subjects, teachers } = useData();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject?.name || "Unknown Subject";
  };

  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher?.name || "Unknown Teacher";
  };

  const getSubjectColor = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject?.color || "bg-gray-200";
  };

  const getSubjectIconName = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject?.iconName || "Book";
  };

  const selectedClassData = classes.find((c) => c.id === selectedClass);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? "bg-gray-900 text-white" : "bg-education-background text-education-text"}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
              School Schedule
            </h1>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((classItem) => (
                  <SelectItem key={classItem.id} value={classItem.id}>
                    {classItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              className="hover:bg-education-primary hover:text-white"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
            <Link to="/login">
              <Button className="bg-education-primary hover:bg-education-secondary text-white">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {selectedClassData ? (
          <div className="space-y-8 animate-fadeIn">
            {Object.entries(selectedClassData.schedule).map(([day, periods]) => (
              <div key={day} className="space-y-4">
                <h2 className="text-2xl font-semibold">{day}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {periods.map((period, index) => (
                    <Card
                      key={`${day}-${index}`}
                      className={`${getSubjectColor(period.subjectId)} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                    >
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div className="text-2xl">
                          {getSubjectIcon(getSubjectIconName(period.subjectId))}
                        </div>
                        <div>
                          <p className="font-bold">{period.time}</p>
                          <p>{getSubjectName(period.subjectId)}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {getTeacherName(period.teacherId)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 animate-fadeIn">
            <p className="text-xl">Please select a class to view its schedule</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;