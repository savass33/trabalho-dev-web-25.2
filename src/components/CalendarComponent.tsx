import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importa estilo padrão
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Value } from "react-calendar/dist/shared/types.js";

interface CalendarProps {
  onSelectDay: (day: string) => void;
}

export default function CalendarComponent({ onSelectDay }: CalendarProps) {
  const [value, setValue] = useState<Date | null>(null);

  const handleChange = (newValue: Value) => {
    // Verifique se 'newValue' é de fato uma instância de Date antes de usar
    if (newValue instanceof Date) {
      setValue(newValue);
      const formatted = format(newValue, "yyyy-MM-dd");
      onSelectDay(formatted);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-[#0033A0]">Selecione uma data</h3>
      <div className="bg-white rounded-xl shadow p-3">
        <Calendar
          locale="pt-BR"
          onChange={handleChange}
          value={value}
          minDate={new Date()} // impede escolher dias passados
          className="rounded-xl"
        />
      </div>

      {value && (
        <p className="text-sm text-gray-600 mt-3">
          Data selecionada:{" "}
          <span className="font-medium text-[#0033A0]">
            {format(value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </span>
        </p>
      )}
    </div>
  );
}
