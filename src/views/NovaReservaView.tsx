import { useState } from "react";
import ModalConfirmacao from "../components/ModalConfirmacao";

interface FormReservaProps {
  espaco: string;
  dia: string;
  hora: string;
}

export default function NovaReservaView({ espaco, dia, hora }: FormReservaProps) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [matricula, setMatricula] = useState("");
  const [showModal, setShowModal] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      espaco,
      dia,
      hora,
      nome,
      cpf,
      matricula,
    });
     // Exibe modal de confirmação
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // opcional: limpar formulário
    setNome("");
    setCpf("");
    setMatricula("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Nova Reserva</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Nome completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Matrícula</label>
          <input
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0033A0] text-white py-2 rounded-lg hover:bg-[#1E4BD1]"
        >
          Confirmar Reserva
        </button>
      </form>

         {/* Modal de Confirmação */}
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
