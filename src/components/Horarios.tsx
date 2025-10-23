interface HorariosProps {
  dia: string;
  onSelectHour: (hora: string) => void;
  horaSelecionada: string | null; // A hora ativa vinda do componente pai
}

export default function Horarios({ dia, onSelectHour, horaSelecionada }: HorariosProps) {
 const horarios = [
  "", 
  "05:00", "05:30", 
  "06:00", "06:30", 
  "07:00", "07:30", 
  "08:00", "08:30", 
  "09:00", "09:30", 
  "10:00", "10:30", 
  "11:00", "11:30", 
  "12:00", "12:30", 
  "13:00", "13:30", 
  "14:00", "14:30", 
  "15:00", "15:30", 
  "16:00", "16:30", 
  "17:00", "17:30", 
  "18:00", "18:30", 
  "19:00", "19:30", 
  "20:00", "20:30", 
  "21:00", "21:30", 
  "22:00", "22:30", 
  "23:00", "23:30", 
  "00:00"
];
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">
        Horários disponíveis em {new Date(dia).toLocaleDateString("pt-BR")}
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
         {horarios.map((hora) => {
          // Verifica se esta é a hora selecionada
          const isSelected = hora === horaSelecionada;

          return (
            <button
              key={hora}
              // Aplica classes diferentes com base na seleção
              className={`
                p-2 border rounded transition
                ${isSelected 
                  ? 'bg-[#0033A0] text-white' // Estilo SE selecionado
                  : 'hover:bg-[#0033A0] hover:text-white' // Estilo se NÃO selecionado
                }
              `}
              onClick={() => onSelectHour(hora)}
            >
              {hora}
            </button>
          );
        })}
      </div>
    </div>
  );
}
