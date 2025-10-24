// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { loginService } from "../services/authService";

interface User {
  nome: string;
  matricula: string;
}

interface AuthContextType {
  user: User | null;
  login: (matricula: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(matricula: string, senha: string) {
    const { user } = await loginService(matricula, senha);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}