import { Class, Subject, Teacher, User } from "@/types";

export const initialSubjects: Subject[] = [
  {
    id: "1",
    name: "Matemática",
    iconName: "Calculator",
    color: "bg-blue-200",
  },
  {
    id: "2",
    name: "Português",
    iconName: "Book",
    color: "bg-green-200",
  },
  // Add more subjects as needed
];

export const initialClasses: Class[] = [
  {
    id: "emitai25",
    name: "EMITAI 25",
    schedule: {
      "Segunda-feira": [
        {
          time: "07:30 - 08:20",
          subjectId: "1",
          teacherId: "1",
        },
        // Add more periods
      ],
    },
  },
];

export const initialTeachers: Teacher[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@school.com",
    subjects: ["1"],
  },
];

export const initialUsers: User[] = [
  {
    id: "admin1",
    email: "admin@school.com",
    name: "Admin",
    role: "admin",
    password: "admin123", // In a real app, this would be hashed
  },
];