import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Recupera usuário da sessão
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Cria usuário admin se não existir
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.length === 0) {
      const adminUser = {
        id: crypto.randomUUID(),
        email: "admin@escola.com",
        password: "admin123",
        name: "Administrador",
        role: "admin"
      };
      localStorage.setItem("users", JSON.stringify([adminUser]));
      console.log("Usuário admin criado:", adminUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u: User) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Credenciais inválidas");
    }

    setUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    console.log("Login bem sucedido:", foundUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    console.log("Logout realizado");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};