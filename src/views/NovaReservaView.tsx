import React,{ useState } from "react";
import ModalConfirmacao from "../components/ModalConfirmacao";
import { api } from "../services/api";
import { IMaskInput } from "react-imask";

interface FormReservaProps {
  espaco: string;
  dia: string;
  hora: string;
  categoria: string;
}

type Opcao =
  | "Graduação"
  | "Pós-Graduação"
  | "Doutorado"
  | "Mestrado"
  | "Negócios"
  | "Eventos"
  | "Seleção"
  | "Aluguel";

  function validarCPF(cpf:string) {
    cpf = cpf.replace(/[^\d]+/g, ""); // remove tudo que não for número
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
      resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
      return resto === parseInt(cpf.charAt(10));
    }

  function validarMatricula(matricula:string){
    const regex = /^\d{7}$/;
    return regex.test(matricula);
  }

export default function NovaReservaView({
  espaco,
  dia,
  hora,
  categoria,
}: FormReservaProps) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [matricula, setMatricula] = useState("");
  const [opcao, setOpcao] = useState<Opcao | "">("");
  const [showModal, setShowModal] = useState(false);
  const [erroCpf, setErroCpf] = useState("");

  const handleBlurCpf = () => {
    const cpfSemMascara = cpf.replace(/[^\d]+/g, "");
    if (!validarCPF(cpfSemMascara)) {
      setErroCpf("CPF inválido. Verifique e tente novamente.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isoDate = new Date(`${dia}T12:00:00Z`).toISOString();

    const reservaData = {
      espaco,
      dia: isoDate,
      hora,
      nome,
      cpf,
      matricula,
      categoria: opcao,
    };
    if(erroCpf)return;
    if(!validarMatricula(matricula)) return;

    try {
      const response = await api.post("/reservas", reservaData);
      
      console.log(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNome("");
    setCpf("");
    setMatricula("");
    setOpcao("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Nova Reserva</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            Nome completo
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => {
              const valor = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
              setNome(valor);
            }}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="cpf" className="block mb-1 font-medium">
            CPF:
          </label>

         <IMaskInput
            mask="000.000.000-00"
            value={cpf}
            onAccept={(value: any) => {
              setCpf(value);
              setErroCpf(""); // limpa erro enquanto digita
            }}
            onBlur={handleBlurCpf}
            className={`w-full border rounded p-2 ${
              erroCpf ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Digite seu CPF"
            required
          />

        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Matrícula</label>
          <input
            type="text"
            value={matricula}
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, "").slice(0, 7);
              setMatricula(valor);
            }}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="categoria">
            Categoria
          </label>
          <select
            id="categoria"
            value={opcao}
            onChange={(e) => setOpcao(e.target.value as Opcao)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Selecione...</option>
            <option value="Graduação">Graduação</option>
            <option value="Pós-Graduação">Pós-Graduação</option>
            <option value="Doutorado">Doutorado</option>
            <option value="Mestrado">Mestrado</option>
            <option value="Negócios">Negócios</option>
            <option value="Eventos">Eventos</option>
            <option value="Seleção">Seleção</option>
            <option value="Aluguel">Aluguel</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0033A0] text-white py-2 rounded-lg hover:bg-[#1E4BD1]"
        >
          Confirmar Reserva
        </button>
      </form>

      <ModalConfirmacao
        isOpen={showModal}
        onClose={handleCloseModal}
        espaco={espaco}
        dia={dia}
        hora={hora}
      />
    </div>
  );
}
