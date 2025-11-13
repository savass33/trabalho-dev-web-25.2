import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useNavigate } from "react-router-dom";

interface ModalConfirmacaoProps {
  isOpen: boolean;
  onClose: () => void;
  espaco: string;
  dia: string;
  hora: string;
}

export default function ModalConfirmacao({
  isOpen,
  onClose,
  espaco,
  dia,
  hora,
}: ModalConfirmacaoProps) {
  if (!isOpen) return null;
  const parsed = parse(dia, "yyyy-MM-dd",new Date());
  const navigate =useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fadeIn">
        <h2 className="text-xl font-semibold text-[#0033A0] mb-3">
          Reserva Confirmada! 🎉
        </h2>

        <p className="text-gray-700 mb-4">
          Sua reserva foi realizada com sucesso para:
        </p>

        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <p><span className="font-medium text-[#0033A0]">Espaço:</span> {espaco}</p>
          <p><span className="font-medium text-[#0033A0]">Dia:</span> {" "}
            {format(parsed, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
          <p><span className="font-medium text-[#0033A0]">Horário:</span> {hora}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={()=>{
              onClose();
              navigate("/resumo-reservas");
            }}
            className="bg-[#0033A0] text-white px-4 py-2 rounded-lg hover:bg-[#1E4BD1] transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
