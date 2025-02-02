import { Class, Subject, Teacher, User } from "@/types";

export const initialSubjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    iconName: "Calculator",
    color: "bg-blue-200",
  },
  {
    id: "2",
    name: "Portuguese",
    iconName: "Book",
    color: "bg-green-200",
  },
  {
    id: "3",
    name: "Science",
    iconName: "Beaker",
    color: "bg-purple-200",
  },
  {
    id: "4",
    name: "Physical Education",
    iconName: "Activity",
    color: "bg-orange-200",
  },
];

export const initialTeachers: Teacher[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@school.com",
    subjects: ["1"],
  },
  {
    id: "2",
    name: "Maria Silva",
    email: "maria@school.com",
    subjects: ["2"],
  },
  {
    id: "3",
    name: "Carlos Santos",
    email: "carlos@school.com",
    subjects: ["3", "4"],
  },
];

export const initialClasses: Class[] = [
  {
    id: "class1",
    name: "Class 9A",
    schedule: {
      "Monday": [
        {
          time: "07:30 - 08:20",
          subjectId: "1",
          teacherId: "1",
        },
        {
          time: "08:20 - 09:10",
          subjectId: "2",
          teacherId: "2",
        },
        {
          time: "09:30 - 10:20",
          subjectId: "3",
          teacherId: "3",
        },
      ],
      "Tuesday": [
        {
          time: "07:30 - 08:20",
          subjectId: "4",
          teacherId: "3",
        },
        {
          time: "08:20 - 09:10",
          subjectId: "1",
          teacherId: "1",
        },
      ],
    },
  },
  {
    id: "class2",
    name: "Class 9B",
    schedule: {
      "Monday": [
        {
          time: "07:30 - 08:20",
          subjectId: "2",
          teacherId: "2",
        },
        {
          time: "08:20 - 09:10",
          subjectId: "3",
          teacherId: "3",
        },
      ],
    },
  },
];

export const initialUsers: User[] = [
  {
    id: "admin1",
    email: "admin@school.com",
    name: "Admin User",
    role: "admin",
    password: "admin123", // In a real app, this would be hashed
  },
  {
    id: "teacher1",
    email: "john@school.com",
    name: "John Smith",
    role: "teacher",
    password: "teacher123",
  },
];