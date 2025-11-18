import { api } from "./api";

// Tipos (opcional, mas recomendado)
interface UserCredentials {
  matricula: string;
  senha?: string; // Senha é opcional no DTO de registro, mas obrigatória no de login
}

interface UserData extends UserCredentials {
  nome: string;
  cpf: string,
  categoria: string
}

interface LoginResponse {
  token: string;
  user: {
    _id: string;
    nome: string;
    matricula: string;
  };
}

/**
 * @desc    Faz o login do usuário
 */
export async function loginService(
  matricula: string,
  senha: string
): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", {
      matricula,
      senha,
    });
    return data;
  } catch (err: any) {
    // Captura a mensagem de erro específica do backend
    const message =
      err.response?.data?.message ||
      "Erro ao tentar fazer login. Tente novamente.";
    throw new Error(message);
  }
}

/**
 * @desc    Registra um novo usuário (requer autenticação)
 */
export async function registerService(userData: UserData) {
  try {
    // O token será enviado automaticamente pelo interceptor da 'api.ts'
    const { data } = await api.post("/auth/register", userData);
    return data;
  } catch (err: any) {
    const message =
      err.response?.data?.message ||
      "Erro ao cadastrar usuário. Tente novamente.";
    throw new Error(message);
  }
}
