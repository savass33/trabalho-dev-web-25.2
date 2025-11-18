import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/loginService";
import { api } from "../services/api";

// Tipo para os dados do usuário
interface User {
  _id: string;
  nome: string;
  matricula: string;
}

// Tipo para o valor do contexto
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (matricula: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Para verificar a auth inicial
  const navigate = useNavigate();

  // Efeito para verificar o localStorage na inicialização
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);

        // Atualiza o header da 'api' para futuras requisições
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error("Falha ao carregar autenticação:", error);
      // Limpa em caso de dados inválidos
      localStorage.clear();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Função de Login
  const login = async (matricula: string, senha: string) => {
    // A 'loginService' já trata o erro, então podemos deixar estourar
    const data = await loginService(matricula, senha);

    // Salva no localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Atualiza o header padrão da 'api'
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    // Atualiza o estado
    setToken(data.token);
    setUser(data.user);

    // Navega para o dashboard (aqui ou no componente de Login)
    // navigate("/dashboard");
  };

  // Função de Logout
  const logout = () => {
    // Limpa o localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Remove o header padrão da 'api'
    delete api.defaults.headers.common["Authorization"];

    // Limpa o estado
    setToken(null);
    setUser(null);

    // Redireciona para o login
    navigate("/login");
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook customizado para facilitar o uso do contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
