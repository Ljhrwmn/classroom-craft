import React, { createContext, useContext, useState, useEffect } from "react";
import { Class, Subject, Teacher, User } from "@/types";
import { initialClasses, initialSubjects, initialTeachers, initialUsers } from "@/data/initial-data";

interface DataContextType {
  classes: Class[];
  subjects: Subject[];
  teachers: Teacher[];
  users: User[];
  setClasses: (classes: Class[]) => void;
  setSubjects: (subjects: Subject[]) => void;
  setTeachers: (teachers: Teacher[]) => void;
  setUsers: (users: User[]) => void;
  saveData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load data from localStorage or use initial data
    const loadedClasses = localStorage.getItem("classes");
    const loadedSubjects = localStorage.getItem("subjects");
    const loadedTeachers = localStorage.getItem("teachers");
    const loadedUsers = localStorage.getItem("users");

    setClasses(loadedClasses ? JSON.parse(loadedClasses) : initialClasses);
    setSubjects(loadedSubjects ? JSON.parse(loadedSubjects) : initialSubjects);
    setTeachers(loadedTeachers ? JSON.parse(loadedTeachers) : initialTeachers);
    setUsers(loadedUsers ? JSON.parse(loadedUsers) : initialUsers);
  }, []);

  const saveData = () => {
    localStorage.setItem("classes", JSON.stringify(classes));
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("teachers", JSON.stringify(teachers));
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <DataContext.Provider
      value={{
        classes,
        subjects,
        teachers,
        users,
        setClasses,
        setSubjects,
        setTeachers,
        setUsers,
        saveData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};