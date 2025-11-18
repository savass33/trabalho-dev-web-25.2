import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/loginService";

export default function CadastroView() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleRegister() {
    setErro("");
    setSucesso("");

    if (!nome || !matricula || !senha) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      await registerService({
        nome,
        matricula,
        senha,
        cpf: "",
        categoria: "",
      });
      setSucesso("Usuário cadastrado com sucesso!");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err: any) {
      setErro(err.message);
    }
  }

  return (
    <div className="p-8 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-[#004aad] mb-6">
          Cadastrar Novo Usuário
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              placeholder="Digite o nome"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Matrícula
            </label>
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              placeholder="Ex: 123456"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              placeholder="Digite a senha"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirmar senha
            </label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              placeholder="Confirme a senha"
            />
          </div>
        </div>

        {erro && <p className="text-red-500 text-sm mt-4">{erro}</p>}
        {sucesso && <p className="text-green-600 text-sm mt-4">{sucesso}</p>}

        <div className="flex justify-end gap-4 mt-8">
          <button
            className="px-5 py-2 rounded-lg border text-gray-600"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>

          <button
            onClick={handleRegister}
            className="px-6 py-2 bg-[#004aad] hover:bg-[#005be8] text-white rounded-lg shadow"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
