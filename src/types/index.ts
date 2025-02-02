export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "teacher";
  password: string;
}

export interface Subject {
  id: string;
  name: string;
  iconName: string;
  color: string;
  teacherId?: string;
}

export interface Class {
  id: string;
  name: string;
  schedule: Schedule;
}

export interface Schedule {
  [day: string]: Period[];
}

export interface Period {
  time: string;
  subjectId: string;
  teacherId: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[]; // Subject IDs
}