import { useNavigate } from "react-router-dom";
import Logo from "../assets/unifor-logo.png";

export default function Login() {
  const navigate = useNavigate();

  function goDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md md:max-w-lg h-auto flex flex-col items-center">
        {/* Logo / Título */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-[#004aad] rounded-full flex items-center justify-center shadow-md">
            {/* ✅ imagem carregada corretamente */}
            <img
              src={Logo}
              alt="Logo UNIFOR"
              className="w-10 h-10 object-contain filter brightness-0 invert"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#004aad]">Portal UNIFOR</h1>
          <p className="text-gray-600 text-sm mt-2">Acesse sua conta</p>
        </div>

        {/* Campos de login */}
        <div className="w-full space-y-4">
          <input
            type="text"
            placeholder="Matrícula"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004aad] transition text-gray-700 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004aad] transition text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Botão de entrada */}
        <button
          onClick={goDashboard}
          className="w-full mt-8 bg-[#004aad] hover:bg-[#005be8] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Entrar
        </button>

        {/* Rodapé */}
        <p className="text-xs text-gray-500 mt-10">
          Universidade de Fortaleza © 2025
        </p>
      </div>
    </div>
  );
}
