import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/unifor-logo.png";
import { useAuth } from "../context/AuthContext"; // Usamos o contexto

export default function Login() {
  const navigate = useNavigate();
  const { login, token, isLoading } = useAuth(); // Pega a função login e o estado do contexto

  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // Redireciona se o usuário já estiver logado
  useEffect(() => {
    // Espera o 'isLoading' terminar para não redirecionar cedo demais
    if (!isLoading && token) {
      navigate("/dashboard");
    }
  }, [token, isLoading, navigate]);

  async function handleLogin() {
    try {
      setErro("");
      
      // Chama a função login do contexto
      await login(matricula, senha);

      // O redirecionamento pode ser feito aqui ou no contexto
      navigate("/dashboard");

    } catch (error: any) {
      // O erro já vem tratado do loginService > AuthContext
      setErro(error.message);
    }
  }

  // Não mostra nada enquanto verifica o token (evita "piscar" a tela de login)
  if (isLoading) {
     return <div className="flex items-center justify-center h-screen"><p>Carregando...</p></div>;
  }
  
  // Evita renderizar o login se já estiver logado (efeito acima cuida disso)
  if (token) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#F5F7FB]">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-[#004aad] rounded-full flex items-center justify-center shadow-md">
            <img src={Logo} alt="Logo" className="w-10 h-10 ml-1.5 object-contain filter brightness-0 invert" />
          </div>
          <h1 className="text-3xl font-bold text-[#004aad]">Portal UNIFOR</h1>
          <p className="text-gray-600 text-sm mt-2">Acesse sua conta</p>
        </div>

        <div className="w-full space-y-4">
          <input
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()} // Permite login com Enter
          />
        </div>

        {erro && (
          <p className="text-red-500 text-sm mt-4 text-center">{erro}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full mt-8 bg-[#004aad] hover:bg-[#005be8] text-white py-3 rounded-lg shadow-md"
        >
          Entrar
        </button>

        <p className="text-xs text-gray-500 mt-10">
          Universidade de Fortaleza © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}