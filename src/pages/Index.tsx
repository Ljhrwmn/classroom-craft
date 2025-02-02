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
import { Book, Calculator, Code, Dna, Flask, Globe, History, Languages, Paintbrush, Brain, Running } from "lucide-react";

const getSubjectIcon = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Book: <Book className="w-5 h-5" />,
    Calculator: <Calculator className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    Dna: <Dna className="w-5 h-5" />,
    Flask: <Flask className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    History: <History className="w-5 h-5" />,
    Languages: <Languages className="w-5 h-5" />,
    Paintbrush: <Paintbrush className="w-5 h-5" />,
    Brain: <Brain className="w-5 h-5" />,
    Running: <Running className="w-5 h-5" />,
  };
  return icons[iconName] || <Book className="w-5 h-5" />;
};

const Index = () => {
  const { classes, subjects, teachers } = useData();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [darkMode, setDarkMode] = useState(false);

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
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">School Schedule</h1>
          <div className="flex gap-4">
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
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {selectedClassData ? (
          <div className="space-y-6">
            {Object.entries(selectedClassData.schedule).map(([day, periods]) => (
              <div key={day} className="space-y-4">
                <h2 className="text-2xl font-semibold">{day}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {periods.map((period, index) => (
                    <Card
                      key={`${day}-${index}`}
                      className={`${getSubjectColor(period.subjectId)} transition-shadow hover:shadow-lg`}
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
          <div className="text-center py-10">
            <p className="text-xl">Please select a class to view its schedule</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;